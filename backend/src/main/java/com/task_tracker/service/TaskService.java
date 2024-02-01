package com.task_tracker.service;

import java.security.Principal;

import com.task_tracker.dto.TaskDTO;

public interface TaskService {

	TaskDTO createTask(TaskDTO taskDto, Principal principal);

}
