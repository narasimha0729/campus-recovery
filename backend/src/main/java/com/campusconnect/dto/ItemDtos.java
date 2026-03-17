package com.campusconnect.dto;

import com.campusconnect.model.Item;
import com.campusconnect.model.ItemCategory;
import com.campusconnect.model.ItemType;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class ItemDtos {

    public static class ItemResponse {
        private Long id;
        private String title;
        private String itemName;
        private String description;
        private ItemCategory category;
        private String location;
        private LocalDate date;
        private ItemType type;
        private List<String> imageUrls;
        private List<String> tags;

        public static ItemResponse fromEntity(Item item) {
            ItemResponse dto = new ItemResponse();
            dto.setId(item.getId());
            dto.setTitle(item.getTitle());
            dto.setItemName(item.getItemName());
            dto.setDescription(item.getDescription());
            dto.setCategory(item.getCategory());
            dto.setLocation(item.getLocation());
            dto.setDate(item.getDate());
            dto.setType(item.getType());
            dto.setImageUrls(item.getImages().stream()
                    .map(img -> img.getImageUrl())
                    .collect(Collectors.toList()));
            dto.setTags(item.getTags().stream()
                    .map(tag -> tag.getTagName())
                    .collect(Collectors.toList()));
            return dto;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public ItemCategory getCategory() {
            return category;
        }

        public void setCategory(ItemCategory category) {
            this.category = category;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public ItemType getType() {
            return type;
        }

        public void setType(ItemType type) {
            this.type = type;
        }

        public List<String> getImageUrls() {
            return imageUrls;
        }

        public void setImageUrls(List<String> imageUrls) {
            this.imageUrls = imageUrls;
        }

        public List<String> getTags() {
            return tags;
        }

        public void setTags(List<String> tags) {
            this.tags = tags;
        }
    }
}

