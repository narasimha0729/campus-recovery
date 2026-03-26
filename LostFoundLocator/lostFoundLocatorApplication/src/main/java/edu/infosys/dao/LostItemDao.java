package edu.infosys.dao;

import java.util.List;

import edu.infosys.bean.LostItem;

public interface LostItemDao {
	public void saveLostItem(LostItem lostItem);
	public List<LostItem> getAllLostItems();
	public LostItem getLostItemById(String lostItemId);
	public void deleteLostItemById(String lostItemId);
	public String getLastId();
	public List<LostItem> getLostItemsByUsername(String username);
	public List<LostItem> searchByKeyword(String keyword);
	public List<LostItem> fuzzySearchBySoundex(String keyword);
}
