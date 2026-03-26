package edu.infosys.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.bean.FoundItem;
import edu.infosys.bean.FoundItemDTO;
import edu.infosys.bean.LostItem;
import edu.infosys.dao.FoundItemDao;

@Service
public class FoundItemService {

	@Autowired
	private FoundItemDao dao;

	public String generateFoundItemId() {
		String newId = "";
		String id = dao.getLastId();
		if (id == null) {
			newId = "F100001";
		} else {
			int num = Integer.parseInt(id.substring(1)) + 1;
			newId = "F" + num;
		}
		return newId;
	}

	// Combined smart search (LIKE + SOUNDEX)
	private List<FoundItemDTO> smartSearch(String keyword) {

		List<FoundItem> keywordResults = dao.searchByKeyword(keyword);
		// List<FoundItem> soundexResults = dao.fuzzySearchBySoundex(keyword);

		// Merge both lists without duplicates (using FoundItem ID)
		Map<String, FoundItemDTO> merged = new LinkedHashMap<String, FoundItemDTO>();

		keywordResults.forEach(f -> merged.put(f.getFoundItemId(), new FoundItemDTO(f)));
		// soundexResults.forEach(f -> merged.put(f.getFoundItemId(), new FoundItemDTO(f)));

		return new ArrayList<FoundItemDTO>(merged.values());
	}

	public List<FoundItemDTO> collectFoundItems(LostItem lostItem) {
		TreeSet<FoundItemDTO> itemSet = new TreeSet<FoundItemDTO>();

		if (lostItem == null)
			return new ArrayList<>();

		String combined = (lostItem.getLostItemName() != null ? lostItem.getLostItemName() : "") + " " +
				(lostItem.getCategory() != null ? lostItem.getCategory() : "") + " " +
				(lostItem.getColor() != null ? lostItem.getColor() : "");

		String[] keywords = combined.trim().split("\\s+");

		for (String word : keywords) {
			if (word != null && word.length() > 2) {
				itemSet.addAll(smartSearch(word));
			}
		}

		return new ArrayList<FoundItemDTO>(itemSet);
	}

}
