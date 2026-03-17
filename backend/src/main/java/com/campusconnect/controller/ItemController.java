package com.campusconnect.controller;

import com.campusconnect.dto.ItemDtos;
import com.campusconnect.model.Item;
import com.campusconnect.model.ItemCategory;
import com.campusconnect.model.ItemType;
import com.campusconnect.service.ItemService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/lost")
    public ResponseEntity<ItemDtos.ItemResponse> submitLostItem(
            Authentication authentication,
            @RequestParam String title,
            @RequestParam String itemName,
            @RequestParam(required = false) String description,
            @RequestParam ItemCategory category,
            @RequestParam String location,
            @RequestParam("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String tags,
            @RequestPart(required = false) MultipartFile image
    ) throws IOException {
        return createItem(authentication, title, itemName, description, category,
                location, date, tags, image, ItemType.LOST);
    }

    @PostMapping("/found")
    public ResponseEntity<ItemDtos.ItemResponse> submitFoundItem(
            Authentication authentication,
            @RequestParam String title,
            @RequestParam String itemName,
            @RequestParam(required = false) String description,
            @RequestParam ItemCategory category,
            @RequestParam String location,
            @RequestParam("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String tags,
            @RequestPart(required = false) MultipartFile image
    ) throws IOException {
        return createItem(authentication, title, itemName, description, category,
                location, date, tags, image, ItemType.FOUND);
    }

    private ResponseEntity<ItemDtos.ItemResponse> createItem(
            Authentication authentication,
            String title,
            String itemName,
            String description,
            ItemCategory category,
            String location,
            LocalDate date,
            String tagsString,
            MultipartFile image,
            ItemType type
    ) throws IOException {
        String email = authentication.getName();
        List<String> tagList = null;
        if (tagsString != null && !tagsString.isBlank()) {
            tagList = Arrays.stream(tagsString.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }

        Item item = itemService.createItem(
                email,
                title,
                itemName,
                description,
                category,
                location,
                date,
                type,
                tagList,
                image
        );

        return ResponseEntity.ok(ItemDtos.ItemResponse.fromEntity(item));
    }

    @GetMapping("/lost")
    public ResponseEntity<List<ItemDtos.ItemResponse>> getLostItems() {
        List<ItemDtos.ItemResponse> list = itemService.getItemsByType(ItemType.LOST)
                .stream()
                .map(ItemDtos.ItemResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/found")
    public ResponseEntity<List<ItemDtos.ItemResponse>> getFoundItems() {
        List<ItemDtos.ItemResponse> list = itemService.getItemsByType(ItemType.FOUND)
                .stream()
                .map(ItemDtos.ItemResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/lost/{id}")
    public ResponseEntity<ItemDtos.ItemResponse> getLostItem(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item
                .filter(i -> i.getType() == ItemType.LOST)
                .map(i -> ResponseEntity.ok(ItemDtos.ItemResponse.fromEntity(i)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/found/{id}")
    public ResponseEntity<ItemDtos.ItemResponse> getFoundItem(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item
                .filter(i -> i.getType() == ItemType.FOUND)
                .map(i -> ResponseEntity.ok(ItemDtos.ItemResponse.fromEntity(i)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/match/{itemId}")
    public ResponseEntity<List<ItemDtos.ItemResponse>> getMatches(@PathVariable Long itemId) {
        List<ItemDtos.ItemResponse> matches = itemService.findMatches(itemId)
                .stream()
                .map(ItemDtos.ItemResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(matches);
    }
}

