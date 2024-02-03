package com.task_tracker.service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import com.task_tracker.dto.TaskDTO;

import jakarta.servlet.http.HttpSession;

public interface TaskService {

	TaskDTO createTask(TaskDTO taskDto, Principal principal);

	Map<String, Object> getAllTasks(int page, HttpSession session, Principal principal);

}
