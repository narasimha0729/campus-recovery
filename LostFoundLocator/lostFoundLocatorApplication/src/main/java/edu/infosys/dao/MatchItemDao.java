package edu.infosys.dao;

import java.util.List;

import edu.infosys.bean.MatchItem;
import edu.infosys.bean.MatchItemId;

public interface MatchItemDao {
	
	 public MatchItem saveMatchItem(MatchItem matchItem);
	// public MatchItem getMatchItemById(MatchItemId matchItemId);
	 public List<MatchItem> getAllMatchItems();
	// public void deleteMatchItem(MatchItemId matchItemId);
	
	
}
