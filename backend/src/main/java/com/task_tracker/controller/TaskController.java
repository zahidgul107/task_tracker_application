package com.task_tracker.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task_tracker.dto.TaskDTO;
import com.task_tracker.dto.TaskSearch;
import com.task_tracker.service.TaskService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@RequestMapping("/api/task")
public class TaskController {

	private TaskService taskSer;

	@PreAuthorize("hasRole('USER')")
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> addTodo(@RequestBody TaskDTO taskDto, Principal principal) {
		try {
	        TaskDTO savedTaskDto = taskSer.createTask(taskDto, principal);
	        Map<String, Object> response = new HashMap<>();
	        response.put("task", savedTaskDto);
	        response.put("message", "Task created successfully!");
	        return new ResponseEntity<>(response, HttpStatus.CREATED);
	    } catch (Exception e) {
	        Map<String, Object> errorResponse = new HashMap<>();
	        errorResponse.put("error", "Failed to create task");
	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PreAuthorize("hasRole('USER')")
	@PutMapping("updateTask/{id}")
	public ResponseEntity<Map<String, Object>> updateTask(@PathVariable Long id, @RequestBody TaskDTO TaskDto) {
		try {
			TaskDTO updatedTask = taskSer.updateTask(id, TaskDto);
	        Map<String, Object> response = new HashMap<>();
	        response.put("updatedTask", updatedTask);
	        response.put("message", "Task updated successfully!");
	        return new ResponseEntity<>(response, HttpStatus.CREATED);
	    } catch (Exception e) {
	        Map<String, Object> errorResponse = new HashMap<>();
	        errorResponse.put("error", "Failed to update task");
	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/getTask/{id}")
	public ResponseEntity<TaskDTO> getTodo(@PathVariable("id") Long id) {
		TaskDTO taskDto = taskSer.getTodo(id);
		return new ResponseEntity<>(taskDto, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/getAllTasks")
	public ResponseEntity<Map<String, Object>> getAllTask(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, HttpSession session, Principal principal) {
		Map<String, Object> response = taskSer.getAllTasks(page,session, principal);
		return ResponseEntity.ok(response);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/getPagTasks")
	public ResponseEntity<Map<String, Object>> getPaginationTasks(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, HttpSession session, Principal principal) {
		Map<String, Object> response = taskSer.getPagTasks(page,session, principal);
		return ResponseEntity.ok(response);
	}
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/search")
	public ResponseEntity<Map<String, Object>> search(@RequestBody TaskSearch search, HttpSession session, Principal principal) {
		Map<String, Object> response = taskSer.search(search,session, principal);
		return ResponseEntity.ok(response);
	}
	
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("deleteTask/{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
		taskSer.deleteTask(id);
		return ResponseEntity.ok("Task Deleted successfully!.");
	}

}
