package edu.infosys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.bean.MatchItem;
import edu.infosys.bean.MatchItemDTO;
import edu.infosys.dao.MatchItemDao;
import edu.infosys.service.MatchItemService;

@RestController
@RequestMapping("/lostfound")
public class MatchItemController {

	@Autowired
    private MatchItemDao matchItemDao;

    @Autowired
    private MatchItemService service;

    @PostMapping("/match")
    public void saveMatchItem(@RequestBody MatchItemDTO matchItemDTO) {
        service.updateLostFoundItems(matchItemDTO);
        MatchItem matchItem = new MatchItem(matchItemDTO);
        matchItemDao.saveMatchItem(matchItem);
    }

    @GetMapping("/match")
    public List<MatchItem> getAllMatchItems() {
        return matchItemDao.getAllMatchItems();
    }

    @GetMapping("/potential-matches")
    public List<MatchItemDTO> getPotentialMatches() {
        return service.getPotentialMatches();
    }
	
}
