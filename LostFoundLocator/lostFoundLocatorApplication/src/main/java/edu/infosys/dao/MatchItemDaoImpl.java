package edu.infosys.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.bean.MatchItem;
import edu.infosys.bean.MatchItemId;

@Service
@Repository
public class MatchItemDaoImpl implements MatchItemDao{
	
	@Autowired
	private MatchItemRepository matchRepository;
	
	@Override
	public MatchItem saveMatchItem(MatchItem matchItem) {
		// TODO Auto-generated method stub
		return matchRepository.save(matchItem);
	}
	@Override
	public List<MatchItem> getAllMatchItems() {
		// TODO Auto-generated method stub
		return matchRepository.findAll();
	}

/*	@Override
	 public MatchItem getMatchItemById(MatchItemId matchItemId) {
        Optional<MatchItem> optional = matchRepository.findById(matchItemId);
        return optional.orElse(null); // or throw custom exception
    }*/

	

/*	@Override
	public void deleteMatchItem(MatchItemId matchItemId) {
		// TODO Auto-generated method stub
		matchRepository.deleteById(matchItemId);
		
	}*/

	

}
