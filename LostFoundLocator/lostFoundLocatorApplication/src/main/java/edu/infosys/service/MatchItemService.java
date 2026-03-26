package edu.infosys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.infosys.bean.FoundItem;
import edu.infosys.bean.LostItem;
import edu.infosys.bean.MatchItemDTO;
import edu.infosys.dao.FoundItemDao;
import edu.infosys.dao.LostItemDao;

@Service
public class MatchItemService {
	
	@Autowired
	private LostItemDao lostItemDao;

	@Autowired
	private FoundItemDao foundItemDao;

	@Autowired
	private FoundItemService foundItemService;

	public void updateLostFoundItems(MatchItemDTO matchItemDTO) {
	    String lostItemId = matchItemDTO.getLostItemId();
	    String foundItemId = matchItemDTO.getFoundItemId();

	    LostItem lostItem = lostItemDao.getLostItemById(lostItemId);
	    FoundItem foundItem = foundItemDao.getFoundItemById(foundItemId);

	    lostItem.setStatus(true);
	    foundItem.setStatus(true);

	    lostItemDao.saveLostItem(lostItem);
	    foundItemDao.savefoundItem(foundItem);
	}

	public java.util.List<MatchItemDTO> getPotentialMatches() {
	    java.util.List<MatchItemDTO> potentialMatches = new java.util.ArrayList<>();
	    java.util.List<LostItem> allLost = lostItemDao.getAllLostItems();
	    
	    for (LostItem lost : allLost) {
	        if (lost.getStatus() == null || !lost.getStatus()) {
	            java.util.List<edu.infosys.bean.FoundItemDTO> matches = foundItemService.collectFoundItems(lost);
	            for (edu.infosys.bean.FoundItemDTO foundDTO : matches) {
	                MatchItemDTO dto = new MatchItemDTO();
	                dto.setLostItemId(lost.getLostItemId());
	                dto.setFoundItemId(foundDTO.getFoundItemId());
	                dto.setItemName(lost.getLostItemName());
	                dto.setCategory(lost.getCategory());
	                dto.setLostUsername(lost.getUsername());
	                dto.setFoundUsername(foundDTO.getUsername());
	                dto.setFoundItemName(foundDTO.getFoundItemName());
	                potentialMatches.add(dto);
	            }
	        }
	    }
	    return potentialMatches;
	}
}
