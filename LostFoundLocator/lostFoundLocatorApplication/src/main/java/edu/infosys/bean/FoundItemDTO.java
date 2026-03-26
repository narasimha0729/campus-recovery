package edu.infosys.bean;


import jakarta.persistence.Id;

public class FoundItemDTO implements Comparable<FoundItemDTO>{
	@Id
	private String foundItemId;
	private String foundItemName;
	private String color;
	private String brand;
	private String category;
	private String location;
	private String username;
	private String foundDate;
	private Boolean status;
	public FoundItemDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public FoundItemDTO(String foundItemId, String foundItemName, String color, String brand, String category,
			String location, String username, String foundDate, Boolean status) {
		super();
		this.foundItemId = foundItemId;
		this.foundItemName = foundItemName;
		this.color = color;
		this.brand = brand;
		this.category = category;
		this.location = location;
		this.username = username;
		this.foundDate = foundDate;
		this.status = status;
	}
				
	public FoundItemDTO(FoundItem foundItem){
	    super();
	    this.foundItemId = foundItem.getFoundItemId();
	    this.foundItemName = foundItem.getFoundItemName();
	    this.color = foundItem.getColor();
	    this.brand = foundItem.getBrand();
	    this.category = foundItem.getCategory();
	    this.location = foundItem.getLocation();
	    this.username = foundItem.getUsername();
	    this.foundDate = foundItem.getFoundDate();
	    this.status = foundItem.getStatus();
	}
	
	public String getFoundItemId() {
		return foundItemId;
	}
	public void setFoundItemId(String foundItemId) {
		this.foundItemId = foundItemId;
	}
	public String getFoundItemName() {
		return foundItemName;
	}
	public void setFoundItemName(String foundItemName) {
		this.foundItemName = foundItemName;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFoundDate() {
		return foundDate;
	}
	public void setFoundDate(String foundDate) {
		this.foundDate = foundDate;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	
	
	@Override
	public int compareTo(FoundItemDTO second) {
		if (this.foundItemId == null || second.foundItemId == null) {
			return 0;
		}
		return this.foundItemId.compareTo(second.foundItemId);
	}
	
	
	

}
