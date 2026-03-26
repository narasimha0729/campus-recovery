package edu.infosys.bean;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
@Embeddable
public class MatchItemId implements Serializable {
	
	
    @Column(name = "lost_item_id", nullable = false)
    private String lostItemId;

    @Column(name = "found_item_id", nullable = false)
    private String foundItemId;

	public MatchItemId() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MatchItemId(String lostItemId, String foundItemId) {
		super();
		this.lostItemId = lostItemId;
		this.foundItemId = foundItemId;
	}

	public String getLostItemId() {
		return lostItemId;
	}

	public void setLostItemId(String lostItemId) {
		this.lostItemId = lostItemId;
	}

	public String getFoundItemId() {
		return foundItemId;
	}

	public void setFoundItemId(String foundItemId) {
		this.foundItemId = foundItemId;
	}

	@Override
	public int hashCode() {
	    return Objects.hash(foundItemId, lostItemId);
	}

	@Override
	public boolean equals(Object obj) {
	    MatchItemId other = (MatchItemId) obj;
	    return Objects.equals(foundItemId, other.foundItemId) 
	        && Objects.equals(lostItemId, other.lostItemId);
	}	

}
