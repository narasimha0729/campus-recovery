package edu.infosys.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.bean.LostItem;
@Service
@Repository
public class LostItemDaoImpl implements LostItemDao {

	@Autowired
	private LostItemRepository repository;
	@Override
	public void saveLostItem(LostItem lostItem) {
		// TODO Auto-generated method stub
		repository.save(lostItem);

	}

	@Override
	public List<LostItem> getAllLostItems() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public LostItem getLostItemById(String lostItemId) {
		// TODO Auto-generated method stub
		return repository.findById(lostItemId).orElse(null);
	}

	@Override
	public void deleteLostItemById(String lostItemId) {
		// TODO Auto-generated method stub
		repository.deleteById(lostItemId);

	}

	@Override
	public String getLastId() {
		// TODO Auto-generated method stub
		return repository.getLastId();
	}
	
	@Override
	public List<LostItem> getLostItemsByUsername(String username){
		return repository.getLostItemsByUsername(username);
	}

	@Override
	public List<LostItem> searchByKeyword(String keyword) {
		return repository.searchByKeyword(keyword);
	}

	@Override
	public List<LostItem> fuzzySearchBySoundex(String keyword) {
		return repository.fuzzySearchBySoundex(keyword);
	}

}
