package com.task_tracker.service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import com.task_tracker.dto.TaskDTO;
import com.task_tracker.dto.TaskSearch;

import jakarta.servlet.http.HttpSession;

public interface TaskService {

	TaskDTO createTask(TaskDTO taskDto, Principal principal);

	Map<String, Object> getAllTasks(int page, HttpSession session, Principal principal);

	void deleteTask(Long id);

	TaskDTO getTodo(Long id);

	TaskDTO updateTask(Long id, TaskDTO taskDto);

	Map<String, Object> search(TaskSearch search, HttpSession session, Principal principal);

	Map<String, Object> getPagTasks(int page, HttpSession session, Principal principal);

}
