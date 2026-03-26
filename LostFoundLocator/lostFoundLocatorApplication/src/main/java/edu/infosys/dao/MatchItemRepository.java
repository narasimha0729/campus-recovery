package edu.infosys.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.infosys.bean.MatchItem;
import edu.infosys.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem, MatchItemId>{

 
	
}
