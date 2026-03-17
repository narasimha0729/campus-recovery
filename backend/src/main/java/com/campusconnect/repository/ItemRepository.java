package com.campusconnect.repository;

import com.campusconnect.model.Item;
import com.campusconnect.model.ItemCategory;
import com.campusconnect.model.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByType(ItemType type);

    @Query("SELECT i FROM Item i WHERE " +
            "LOWER(i.itemName) LIKE LOWER(CONCAT('%', :itemName, '%')) AND " +
            "i.category = :category AND " +
            "LOWER(i.location) = LOWER(:location) AND " +
            "i.type = :type")
    List<Item> findMatchingItems(
            @Param("itemName") String itemName,
            @Param("category") ItemCategory category,
            @Param("location") String location,
            @Param("type") ItemType type
    );
}

