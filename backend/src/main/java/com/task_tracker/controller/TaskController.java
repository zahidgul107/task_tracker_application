package com.task_tracker.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task_tracker.dto.TaskDTO;
import com.task_tracker.service.TaskService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@RequestMapping("/api/task")
public class TaskController {

	private TaskService taskSer;

	@PreAuthorize("hasRole('USER')")
	@PostMapping("/add")
	public ResponseEntity<TaskDTO> addTodo(@RequestBody TaskDTO taskDto, Principal principal) {
		TaskDTO savedTaskDto = taskSer.createTask(taskDto, principal);
		return new ResponseEntity<>(savedTaskDto, HttpStatus.CREATED);
	}

/*	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@GetMapping("getTodo/{id}")
	public ResponseEntity<TaskDTO> getTodo(@PathVariable("id") Long todoId) {
		TaskDTO TaskDTO = taskSer.getTodo(todoId);
		return new ResponseEntity<>(TaskDTO, HttpStatus.OK);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@GetMapping("getAllTodos")
	public ResponseEntity<List<TaskDTO>> getAllTodo() {
		List<TaskDTO> todoList = taskSer.getAllTodos();
		return ResponseEntity.ok(todoList);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("updateTodo/{id}")
	public ResponseEntity<TaskDTO> updateTodo(@PathVariable Long id, @RequestBody TaskDTO TaskDTO) {
		TaskDTO updatedTodo = taskSer.updateTodo(id, TaskDTO);
		return ResponseEntity.ok(updatedTodo);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("deleteTodo/{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
		taskSer.deleteTodo(id);
		return ResponseEntity.ok("Todo Deleted successfully!.");
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@PatchMapping("completeTodo/{id}")
	public ResponseEntity<TaskDTO> completeTodo(@PathVariable Long id) {
		TaskDTO updatedTodo = taskSer.completeTodo(id);
		return ResponseEntity.ok(updatedTodo);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@PatchMapping("inCompleteTodo/{id}")
	public ResponseEntity<TaskDTO> inCompleteTodo(@PathVariable Long id) {
		TaskDTO updatedTodo = taskSer.inCompleteTodo(id);
		return ResponseEntity.ok(updatedTodo);
	}  */

}
