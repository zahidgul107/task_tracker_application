package com.task_tracker.payload.request;

import java.util.Set;

import jakarta.validation.constraints.*;
 
public class SignupRequest {
	
	@NotBlank(message = "Name cannot be blank!")
    private String name;
	
    @NotBlank(message = "Username cannot be blank!")
    @Size(min = 3,message = "Username must be 3 characters!")
    private String username;
 
    @NotBlank(message = "Email cannot be blank!")
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> role;
    
    @NotBlank(message = "Password cannot be blank!")
    @Size(min = 8, message = "Password must be 8 characters!")
    private String password;
  
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
      return this.role;
    }
    
    public void setRole(Set<String> role) {
      this.role = role;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
    
}
