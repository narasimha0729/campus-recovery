package edu.infosys.bean;

public class UserDTO {
    private String username;
    private String personlName;
    private String email;
    private String role;

    public UserDTO() {}

    public UserDTO(String username, String personlName, String email, String role) {
        this.username = username;
        this.personlName = personlName;
        this.email = email;
        this.role = role;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPersonlName() { return personlName; }
    public void setPersonlName(String personlName) { this.personlName = personlName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
