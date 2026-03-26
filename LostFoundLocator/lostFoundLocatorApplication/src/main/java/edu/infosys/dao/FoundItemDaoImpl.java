package edu.infosys.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.bean.FoundItem;
@Service
@Repository
public class FoundItemDaoImpl implements FoundItemDao {

	@Autowired
	private FoundItemRepository repository;
	@Override
	public void savefoundItem(FoundItem foundItem) {
		// TODO Auto-generated method stub
		repository.save(foundItem);
		
	}

	@Override
	public List<FoundItem> getAllFoundItems() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public FoundItem getFoundItemById(String foundItemId) {
		// TODO Auto-generated method stub
		return repository.findById(foundItemId).orElse(null);
	}

	@Override
	public void deleteFoundItemById(String foundItemId) {
		// TODO Auto-generated method stub
		repository.deleteById(foundItemId);
		
	}

	@Override
	public String getLastId() {
		// TODO Auto-generated method stub
		return repository.getLastId();
	}

	@Override
	public List<FoundItem> getFoundItemsByUsername(String username) {
		// TODO Auto-generated method stub
		return repository.getFoundItemsByUsername(username);
	}
	
	@Override
	public List<FoundItem> searchByKeyword(String keyword) {
	    return repository.searchByKeyword(keyword);
	}

	@Override
	public List<FoundItem> fuzzySearchBySoundex(String keyword) {
	    return repository.fuzzySearchBySoundex(keyword);
	}
	
		
}
