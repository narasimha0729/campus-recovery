package edu.infosys.dao;

import java.util.List;

import edu.infosys.bean.FoundItem;

public interface FoundItemDao {
	public void savefoundItem(FoundItem foundItem);
	public List<FoundItem> getAllFoundItems();
	public FoundItem getFoundItemById(String foundItemId);
	public void deleteFoundItemById(String foundItemId);
	public String getLastId();
	public List<FoundItem> getFoundItemsByUsername(String username);
	public List<FoundItem> searchByKeyword(String keyword);

	public List<FoundItem> fuzzySearchBySoundex(String keyword);
}
