package edu.infosys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.bean.FoundItem;
import edu.infosys.bean.FoundItemDTO;
import edu.infosys.bean.LostItem;
import edu.infosys.dao.FoundItemDao;
import edu.infosys.dao.LostItemDao;
import edu.infosys.service.FoundItemService;
import edu.infosys.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound")
public class FoundItemController {


	@Autowired
	private FoundItemDao foundItemDao;

	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private FoundItemService foundService;
	
	
	@PostMapping("/found")
	public void saveFoundItem(@RequestBody FoundItem foundItem) {
		foundItemDao.savefoundItem(foundItem);
		
	}

	@GetMapping("/found")
	public List<FoundItem> getAllFoundItems() {
		// TODO Auto-generated method stub
		return foundItemDao.getAllFoundItems();
	}

	@GetMapping("/found/{foundItemId}")
	public FoundItem getFoundItemById(@PathVariable String foundItemId) {
		// TODO Auto-generated method stub
		return foundItemDao.getFoundItemById(foundItemId);
	}

	@DeleteMapping("/found/{foundItemId}")
	public void deleteFoundItemById(@PathVariable String foundItemId) {
		// TODO Auto-generated method stub
		foundItemDao.deleteFoundItemById(foundItemId);

	}
	
	@GetMapping("/found-id")
	public String generateFoundItemId() {
	 
	return foundService.generateFoundItemId();
	}
		
	@GetMapping("/found-user")
	public List<FoundItem> getFoundItemsByUsername(){
		String userId = service.getUserId();
		return foundItemDao.getFoundItemsByUsername(userId);
	}
	@PutMapping("/found")
	public void updateFoundItem(@RequestBody FoundItem foundItem) {
	    foundItemDao.savefoundItem(foundItem);
	}
	
	@GetMapping("/found-id/{id}")
	public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id) {
	    LostItem lostItem = lostItemDao.getLostItemById(id);
	    return foundService.collectFoundItems(lostItem);
	}
	
	
	
	
}
