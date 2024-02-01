package com.task_tracker.service.impl;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.task_tracker.dto.TaskDTO;
import com.task_tracker.entity.Task;
import com.task_tracker.entity.User;
import com.task_tracker.repository.TaskRepository;
import com.task_tracker.repository.UserRepository;
import com.task_tracker.service.TaskService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService{
	
	private TaskRepository taskRepo;
	private UserRepository userRepo;
	private ModelMapper modelMapper;

	@Override
	public TaskDTO createTask(TaskDTO taskDto, Principal principal) {
		User user = userRepo.findByUsername(principal.getName()).get();
		Task task = modelMapper.map(taskDto, Task.class);
		task.setCreatedBy(user);
		Task savedTask = taskRepo.save(task);
		TaskDTO savedTaskDto = modelMapper.map(savedTask, TaskDTO.class); 
		return savedTaskDto;
	}

}
