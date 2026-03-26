package edu.infosys.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LostItem {
	@Id
	private String lostItemId;
	private String lostItemName;
	private String color;
	private String brand;
	private String category;
	private String location;
	private String username;
	private String lostDate;
	private Boolean status;
	public LostItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LostItem(String lostItemId, String lostItemName, String color, String brand, String category,
			String location, String username, String lostDate, Boolean status) {
		super();
		this.lostItemId = lostItemId;
		this.lostItemName = lostItemName;
		this.color = color;
		this.brand = brand;
		this.category = category;
		this.location = location;
		this.username = username;
		this.lostDate = lostDate;
		this.status = status;
	}
	public String getLostItemId() {
		return lostItemId;
	}
	public void setLostItemId(String lostItemId) {
		this.lostItemId = lostItemId;
	}
	public String getLostItemName() {
		return lostItemName;
	}
	public void setLostItemName(String lostItemName) {
		this.lostItemName = lostItemName;
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
	public String getLostDate() {
		return lostDate;
	}
	public void setLostDate(String lostDate) {
		this.lostDate = lostDate;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	

}
