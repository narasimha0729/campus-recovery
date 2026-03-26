package edu.infosys.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.bean.LostItem;
import edu.infosys.dao.LostItemDao;

@Service
public class LostItemService {
	@Autowired
	  private LostItemDao lostItemDao;
	
	public String generateLostItemId() {
	    String newId="";
	    String id=lostItemDao.getLastId();
	    if(id==null) {
	        newId="L100001";
	    }
	    else {
	        int num=Integer.parseInt(id.substring(1))+1;
	        newId="L"+num;
	    }
	    return newId;
	}

	// Combined smart search (LIKE + SOUNDEX)
	private List<LostItem> smartSearch(String keyword) {
		List<LostItem> keywordResults = lostItemDao.searchByKeyword(keyword);
	    List<LostItem> soundexResults = lostItemDao.fuzzySearchBySoundex(keyword);

	    // Merge both lists without duplicates (using LostItem ID as a proxy or just unique items)
	    java.util.Map<String, LostItem> merged = new java.util.LinkedHashMap<>();

	    keywordResults.forEach(l -> merged.put(l.getLostItemId(), l));
	    soundexResults.forEach(l -> merged.put(l.getLostItemId(), l));

	    return new java.util.ArrayList<>(merged.values());
	}

	public List<LostItem> collectLostItems(edu.infosys.bean.FoundItem foundItem) {
		java.util.TreeSet<LostItem> itemSet = new java.util.TreeSet<>((a, b) -> a.getLostItemId().compareTo(b.getLostItemId()));
	    
		if (foundItem == null) return new java.util.ArrayList<>();

		// Safe concatenation of fields
		String combined = (foundItem.getFoundItemName() != null ? foundItem.getFoundItemName() : "") + " " +
		                  (foundItem.getCategory() != null ? foundItem.getCategory() : "") + " " +
		                  (foundItem.getColor() != null ? foundItem.getColor() : "");
		
		String[] keywords = combined.trim().split("\\s+");
		
		for(String word : keywords) {
			if(word != null && word.length() > 2) { 
				itemSet.addAll(smartSearch(word));
			}
		}
	    return new java.util.ArrayList<>(itemSet);
	}
}
