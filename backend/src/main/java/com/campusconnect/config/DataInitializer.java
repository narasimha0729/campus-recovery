package com.campusconnect.config;

import com.campusconnect.model.*;
import com.campusconnect.repository.ItemRepository;
import com.campusconnect.repository.TagRepository;
import com.campusconnect.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDatabase(
            UserRepository userRepository,
            ItemRepository itemRepository,
            TagRepository tagRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            // Ensure the system has some initial users, tags, and items.
            // This will not create duplicates if data already exists.

            User student1 = new User();
            student1.setName("Ethan Carter");
            student1.setEmail("ethan.carter@college.edu");
            student1.setRollNumber("CS2023001");
            student1.setPassword(passwordEncoder.encode("password123"));
            student1.setRole(Role.STUDENT);
            student1.setStatus(UserStatus.ACTIVE);

            User student2 = new User();
            student2.setName("Sophia Bennett");
            student2.setEmail("sophia.bennett@college.edu");
            student2.setRollNumber("CS2023002");
            student2.setPassword(passwordEncoder.encode("password123"));
            student2.setRole(Role.STUDENT);
            student2.setStatus(UserStatus.ACTIVE);

            User admin = new User();
            admin.setName("Campus Admin");
            admin.setEmail("admin@college.edu");
            admin.setRollNumber("ADMIN001");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setStatus(UserStatus.ACTIVE);

            student1 = createUserIfNotExists(userRepository, student1);
            student2 = createUserIfNotExists(userRepository, student2);
            createUserIfNotExists(userRepository, admin);

            Tag backpackTag = createTagIfNotExists(tagRepository, "Backpack");
            Tag walletTag = createTagIfNotExists(tagRepository, "Wallet");
            Tag textbookTag = createTagIfNotExists(tagRepository, "Textbook");
            Tag electronicsTag = createTagIfNotExists(tagRepository, "Electronics");
            Tag keysTag = createTagIfNotExists(tagRepository, "Keys");

            Item lostBackpack = new Item();
            lostBackpack.setTitle("Lost Backpack");
            lostBackpack.setItemName("Green backpack");
            lostBackpack.setDescription("Found near the library, black backpack with books");
            lostBackpack.setCategory(ItemCategory.CLOTHING);
            lostBackpack.setLocation("Library");
            lostBackpack.setDate(LocalDate.now().minusDays(1));
            lostBackpack.setType(ItemType.LOST);
            lostBackpack.setUser(student1);
            lostBackpack.setTags(Set.of(backpackTag));

            Item foundWallet = new Item();
            foundWallet.setTitle("Found Wallet");
            foundWallet.setItemName("Brown leather wallet");
            foundWallet.setDescription("Wallet found near the cafeteria, contains ID");
            foundWallet.setCategory(ItemCategory.ACCESSORIES);
            foundWallet.setLocation("Cafeteria");
            foundWallet.setDate(LocalDate.now().minusDays(2));
            foundWallet.setType(ItemType.FOUND);
            foundWallet.setUser(student2);
            foundWallet.setTags(Set.of(walletTag));

            Item lostTextbook = new Item();
            lostTextbook.setTitle("Lost Textbook");
            lostTextbook.setItemName("Data Structures textbook");
            lostTextbook.setDescription("Lost near main building study room");
            lostTextbook.setCategory(ItemCategory.DOCUMENTS);
            lostTextbook.setLocation("Main building");
            lostTextbook.setDate(LocalDate.now().minusDays(3));
            lostTextbook.setType(ItemType.LOST);
            lostTextbook.setUser(student1);
            lostTextbook.setTags(Set.of(textbookTag));

            Item foundKeys = new Item();
            foundKeys.setTitle("Found Keys");
            foundKeys.setItemName("Set of keys with a blue keychain");
            foundKeys.setDescription("Found in the student parking lot next to Gate A");
            foundKeys.setCategory(ItemCategory.ACCESSORIES);
            foundKeys.setLocation("Parking Lot");
            foundKeys.setDate(LocalDate.now().minusDays(1));
            foundKeys.setType(ItemType.FOUND);
            foundKeys.setUser(student2);
            foundKeys.setTags(Set.of(keysTag));

            createItemIfNotExists(itemRepository, lostBackpack);
            createItemIfNotExists(itemRepository, foundWallet);
            createItemIfNotExists(itemRepository, lostTextbook);
            createItemIfNotExists(itemRepository, foundKeys);
        };
    }

    private User createUserIfNotExists(UserRepository userRepository, User user) {
        return userRepository.findByEmail(user.getEmail()).orElseGet(() -> userRepository.save(user));
    }

    private Item createItemIfNotExists(ItemRepository itemRepository, Item item) {
        return itemRepository.findAll().stream()
                .filter(existing -> existing.getTitle().equals(item.getTitle()) && existing.getType() == item.getType())
                .findFirst()
                .orElseGet(() -> itemRepository.save(item));
    }

    private Tag createTagIfNotExists(TagRepository tagRepository, String name) {
        return tagRepository.findByTagName(name)
                .orElseGet(() -> {
                    Tag tag = new Tag();
                    tag.setTagName(name);
                    return tagRepository.save(tag);
                });
    }
}

