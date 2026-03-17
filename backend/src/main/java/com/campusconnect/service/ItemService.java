package com.campusconnect.service;

import com.campusconnect.model.*;
import com.campusconnect.repository.ItemRepository;
import com.campusconnect.repository.TagRepository;
import com.campusconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.*;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final Path uploadPath;

    public ItemService(ItemRepository itemRepository,
                       UserRepository userRepository,
                       TagRepository tagRepository,
                       Path uploadPath) throws IOException {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.uploadPath = uploadPath;
        Files.createDirectories(uploadPath);
    }

    @Transactional
    public Item createItem(String email,
                           String title,
                           String itemName,
                           String description,
                           ItemCategory category,
                           String location,
                           LocalDate date,
                           ItemType type,
                           List<String> tagNames,
                           MultipartFile image) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Item item = new Item();
        item.setTitle(title);
        item.setItemName(itemName);
        item.setDescription(description);
        item.setCategory(category);
        item.setLocation(location);
        item.setDate(date);
        item.setType(type);
        item.setUser(user);

        if (tagNames != null) {
            Set<Tag> tags = new HashSet<>();
            for (String tagName : tagNames) {
                if (tagName == null || tagName.isBlank()) {
                    continue;
                }
                Tag tag = tagRepository.findByTagName(tagName.trim().toLowerCase())
                        .orElseGet(() -> {
                            Tag t = new Tag();
                            t.setTagName(tagName.trim().toLowerCase());
                            return tagRepository.save(t);
                        });
                tags.add(tag);
            }
            item.setTags(tags);
        }

        if (image != null && !image.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + Objects.requireNonNull(image.getOriginalFilename()).replaceAll("\\s+", "_");
            Path targetLocation = uploadPath.resolve(filename);
            Files.copy(image.getInputStream(), targetLocation);

            ItemImage itemImage = new ItemImage();
            itemImage.setItem(item);
            itemImage.setImageUrl("/uploads/" + filename);
            item.getImages().add(itemImage);
        }

        return itemRepository.save(item);
    }

    public List<Item> getItemsByType(ItemType type) {
        return itemRepository.findByType(type);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<Item> findMatches(Long itemId) {
        Item baseItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));

        ItemType oppositeType = baseItem.getType() == ItemType.LOST ? ItemType.FOUND : ItemType.LOST;

        return itemRepository.findMatchingItems(
                baseItem.getItemName(),
                baseItem.getCategory(),
                baseItem.getLocation(),
                oppositeType
        );
    }
}

