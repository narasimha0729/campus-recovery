package edu.infosys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.bean.LostfoundUser;
import edu.infosys.config.EncoderConfig;
import edu.infosys.service.LostfoundUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lostfound")
public class LoginController {
	@Autowired
	private LostfoundUserService service;
	
	@Autowired
	private EncoderConfig econfig;
	
	@Autowired
    private AuthenticationManager authenticationManager;

    private final org.springframework.security.web.context.HttpSessionSecurityContextRepository securityContextRepository = new org.springframework.security.web.context.HttpSessionSecurityContextRepository();
 
	@PostMapping("/register")
	public void registerNewUser(@RequestBody LostfoundUser user) {
		PasswordEncoder bCrypt=econfig.passwordEncoding();
		String encodedPassword=bCrypt.encode(user.getPassword());
		user.setPassword(encodedPassword);
		service.saveUser(user);
	}

	public static class LoginRequest {
		private String username;
		private String password;

		public String getUsername() { return username; }
		public void setUsername(String username) { this.username = username; }
		public String getPassword() { return password; }
		public void setPassword(String password) { this.password = password; }
	}

	@PostMapping("/login")
	public ResponseEntity<String> validateUser(@RequestBody LoginRequest body, HttpServletRequest request, HttpServletResponse response) {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Explicitly save the context for Spring Boot 3 session management
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);

			LostfoundUser u = service.getUserByUsername(body.getUsername());
			if (u != null) {
				return ResponseEntity.ok(u.getRole());
			}
			return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND).body("false");
		} catch (Exception ex) {
			return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).body("false");
		}
	}
	
	@GetMapping("/login/{userId}/{password}")
	public String validateUserLegacy(@PathVariable String userId,@PathVariable String password, HttpServletRequest request, HttpServletResponse response) {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userId, password));
			SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Explicitly save the context for Spring Boot 3 session management
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);

			LostfoundUser u = service.getUserByUsername(userId);
			return (u != null)? u.getRole() : "false";
		} catch (Exception ex) {
			return "false";
		}
	}

	@GetMapping("/login")
	public edu.infosys.bean.UserDTO getUserDetails() {
		LostfoundUser u = service.getUser();
		if (u == null) return null;
		return new edu.infosys.bean.UserDTO(u.getUsername(), u.getPersonlName(), u.getEmail(), u.getRole());
	}
	
	@DeleteMapping("/login/{username}")
	public void deleteUser(@PathVariable String username) {
		service.deleteUser(username);
	}
	
	@GetMapping("/user")
	public String getUserId() {
		return service.getUserId();
	}
	@GetMapping("/role")
	public String getRole() {
		return service.getRole();
	}
	
	@GetMapping("/me")
	public edu.infosys.bean.UserDTO getUser() {
		LostfoundUser u = service.getUser();
		if (u == null) return null;
		return new edu.infosys.bean.UserDTO(u.getUsername(), u.getPersonlName(), u.getEmail(), u.getRole());
	}
	
	@PostMapping("/logout")
	 public ResponseEntity<String> logout(HttpServletRequest request,
	                                         HttpServletResponse response) {

	        // Clear Spring Security Context
	        SecurityContextHolder.clearContext();

	        // Invalidate session
	        HttpSession session = request.getSession(false);
	        if (session != null) {
	            session.invalidate();
	        }

	        // Delete cookie
	        Cookie cookie = new Cookie("JSESSIONID", null);
	        cookie.setPath("/");
	        cookie.setMaxAge(0);
	        response.addCookie(cookie);
	        return ResponseEntity.ok("Logout successful");
	    }
	
	@GetMapping("/all-users")
	public java.util.List<edu.infosys.bean.UserDTO> getAllUsers() {
		return service.getAllUsers();
	}
	
    @GetMapping("/student")
    public java.util.List<edu.infosys.bean.UserDTO> getAllStudents() {
        return service.getAllStudents();
    }
}
