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

import edu.infosys.bean.LostItem;
import edu.infosys.dao.LostItemDao;
import edu.infosys.service.LostItemService;
import edu.infosys.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound")

public class LostItemController {

	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private edu.infosys.dao.FoundItemDao foundItemDao;

	@Autowired
	private LostfoundUserService service;

	@Autowired
	private LostItemService lostService;
	
	@PostMapping("/lost")
	public void saveLostItem(@RequestBody LostItem lostItem) {
		lostItemDao.saveLostItem(lostItem);
		
	}

	@GetMapping("/lost")
	public List<LostItem> getAllLostItems() {
		// TODO Auto-generated method stub
		return lostItemDao.getAllLostItems();
	}

	@GetMapping("/lost/{lostItemId}")
	public LostItem getLostItemById(@PathVariable String lostItemId) {
		// TODO Auto-generated method stub
		return lostItemDao.getLostItemById(lostItemId);
	}

	@DeleteMapping("/lost/{lostItemId}")
	public void deleteLostItemById(@PathVariable String lostItemId) {
		// TODO Auto-generated method stub
		lostItemDao.deleteLostItemById(lostItemId);

	}
	
	@GetMapping("/lost-id")
	public String generateLostItemId() {
	 
	return lostService.generateLostItemId();
	}
		
	@GetMapping("/lost-user")
	public List<LostItem> getLostItemsByUsername(){
		String userId = service.getUserId();
		return lostItemDao.getLostItemsByUsername(userId);
	}
	@PutMapping("/lost")
	public void updateLostItem(@RequestBody LostItem lostItem) {
	    lostItemDao.saveLostItem(lostItem);
	}

	@GetMapping("/lost-id/{id}")
	public List<LostItem> getLostItemsByFoundItem(@PathVariable String id) {
	    edu.infosys.bean.FoundItem foundItem = foundItemDao.getFoundItemById(id);
	    return lostService.collectLostItems(foundItem);
	}
	
}
