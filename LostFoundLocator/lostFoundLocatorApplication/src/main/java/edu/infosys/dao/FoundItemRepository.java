package edu.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.bean.FoundItem;



public interface FoundItemRepository extends JpaRepository<FoundItem, String> {

	@Query("SELECT max(foundItemId) from FoundItem")
	public String getLastId();
	
	@Query("SELECT a from FoundItem a where a.username=?1")
	public List<FoundItem> getFoundItemsByUsername(String username);
	
	
	
	
	// Keyword search (LIKE for partial match)
	@Query("SELECT a from FoundItem a where a.foundItemName LIKE %:keyword% OR a.brand LIKE %:keyword% OR a.category LIKE %:keyword% OR a.location LIKE %:keyword%")
     List<FoundItem> searchByKeyword(@org.springframework.data.repository.query.Param("keyword") String keyword);
    
 // Fuzzy matching using SOUNDEX
    @Query(value = "SELECT * FROM found_item WHERE (status=false OR status IS NULL) and (" +
            "SOUNDEX(found_item_name) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(color) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(brand) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(location) = SOUNDEX(:keyword) OR " +
            "SOUNDEX(category) = SOUNDEX(:keyword))", nativeQuery = true)
    List<FoundItem> fuzzySearchBySoundex(@org.springframework.data.repository.query.Param("keyword") String keyword);
    
	
	
	
	
	
	
	
	
	/*@Query("SELECT max(foundItemId) from FoundItem")
	public String getLastId();
	
	@Query("SELECT a from FoundItem a where a.username=?1")
	public List<FoundItem> getFoundItemsByUsername(String username);
	 */
	
}
