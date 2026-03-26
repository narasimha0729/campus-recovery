package edu.infosys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import edu.infosys.bean.LostfoundUser;
import edu.infosys.dao.LostfoundUserRepository;

@Service
public class LostfoundUserService implements UserDetailsService {

    @Autowired
    private LostfoundUserRepository repository;

    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LostfoundUser user = repository.findById(username).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return user;
    }

    public String getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof LostfoundUser) {
            return ((LostfoundUser) authentication.getPrincipal()).getUsername();
        }
        return null;
    }

    public String getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof LostfoundUser) {
            return ((LostfoundUser) authentication.getPrincipal()).getRole();
        }
        return null;
    }

    public LostfoundUser getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof LostfoundUser) {
            return (LostfoundUser) authentication.getPrincipal();
        }
        return null;
    }

    public void saveUser(LostfoundUser user1) {
        repository.save(user1);
    }

    public void deleteUser(String id) {
        repository.deleteById(id);
    }

    public LostfoundUser getUserByUsername(String username) {
        return repository.findById(username).orElse(null);
    }

    public java.util.List<edu.infosys.bean.UserDTO> getAllUsers() {
        String sql = "SELECT username, personl_name as personlName, email, role FROM lostfound_user";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new edu.infosys.bean.UserDTO(
                rs.getString("username"),
                rs.getString("personlName"),
                rs.getString("email"),
                rs.getString("role")
        ));
    }
    public java.util.List<edu.infosys.bean.UserDTO> getAllStudents() {
        return repository.getAllStudents().stream()
                .map(user -> new edu.infosys.bean.UserDTO(user.getUsername(), user.getPersonlName(), user.getEmail(), user.getRole()))
                .collect(java.util.stream.Collectors.toList());
    }
}

