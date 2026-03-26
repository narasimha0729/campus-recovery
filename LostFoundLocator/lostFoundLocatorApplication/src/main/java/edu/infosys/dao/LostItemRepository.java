package edu.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.bean.LostItem;

public interface LostItemRepository extends JpaRepository<LostItem, String> {

	@Query("SELECT max(lostItemId) from LostItem")
	public String getLastId();
	
	@Query("SELECT a from LostItem a where (a.status=false OR a.status IS NULL) and a.username=?1")
	public List<LostItem> getLostItemsByUsername(String username);

	// Keyword search (LIKE for partial match)
	@Query("SELECT a from LostItem a where a.lostItemName LIKE %:keyword% OR a.brand LIKE %:keyword% OR a.category LIKE %:keyword% OR a.location LIKE %:keyword%")
     List<LostItem> searchByKeyword(@org.springframework.data.repository.query.Param("keyword") String keyword);
    
    // Fuzzy matching using SOUNDEX
    @Query(value = "SELECT * FROM lost_item WHERE (status=false OR status IS NULL) and (" +
            "SOUNDEX(lost_item_name) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(color) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(brand) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(location) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(category) = SOUNDEX(:keyword))", nativeQuery = true)
    List<LostItem> fuzzySearchBySoundex(@org.springframework.data.repository.query.Param("keyword") String keyword);
}
