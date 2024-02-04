package com.task_tracker.service.impl;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task_tracker.dao.TaskDao;
import com.task_tracker.dto.TaskDTO;
import com.task_tracker.dto.TaskSearch;
import com.task_tracker.entity.Task;
import com.task_tracker.entity.User;
import com.task_tracker.exception.ResourceNotFoundException;
import com.task_tracker.repository.TaskRepository;
import com.task_tracker.repository.UserRepository;
import com.task_tracker.service.TaskService;

import jakarta.servlet.http.HttpSession;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private TaskDao taskDao;
	@Autowired
	private ModelMapper modelMapper;
	
	int from = 0;
	int total = 0;
	public static final int ROWS = 10;
	Long records = 0L;

	@Override
	public TaskDTO createTask(TaskDTO taskDto, Principal principal) {
		User user = userRepo.findByUsername(principal.getName()).get();
		Task task = modelMapper.map(taskDto, Task.class);
		task.setCreatedBy(user);
		Task savedTask = taskRepo.save(task);
		TaskDTO savedTaskDto = modelMapper.map(savedTask, TaskDTO.class);
		return savedTaskDto;
	}

	@Override
	public Map<String, Object> getAllTasks(int page, HttpSession session, Principal principal) {
		TaskSearch search = new TaskSearch();
		session.setAttribute("page", page);
		Map<String, Object> response = pagination(search, page, session, principal);
		return response;
	}
	
	@Override
	public Map<String, Object> getPagTasks(int page, HttpSession session, Principal principal) {
		TaskSearch search= (TaskSearch) session.getAttribute("search");
		session.setAttribute("page", page);
		Map<String, Object> response = pagination(search, page, session, principal);
		return response;
	}
	
	@Override
	public void deleteTask(Long id) {
		taskRepo.deleteById(id);
	}

	@Override
	public TaskDTO getTodo(Long id) {
		Task task = taskRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with given id : " + id));
	    TaskDTO taskDto = new TaskDTO();
	    taskDto.setId(task.getId());
	    taskDto.setTitle(task.getTitle());
	    taskDto.setDescription(task.getDescription());
	    taskDto.setDueDate(task.getDueDate());
	    taskDto.setStatus(task.getStatus());
	    return taskDto;
	}

	@Override
	public TaskDTO updateTask(Long id, TaskDTO taskDto) {
		Task task = taskRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with given id : " + id));
		task.setTitle(taskDto.getTitle());
		task.setDescription(taskDto.getDescription());
		task.setDueDate(taskDto.getDueDate());
	    task.setStatus(taskDto.getStatus());
	    taskRepo.save(task);
		return taskDto;
	}
	
	@Override
	public Map<String, Object> getCount(Principal principal) {
		User user = userRepo.findByUsername(principal.getName()).get();
		List<Task> listTask = taskRepo.findByCreatedBy(user);
		Map<String, Object> response = new HashMap<>();
        response.put("tasksCount", listTask.size());
		return response;
	}

	@Override
	public Map<String, Object> search(TaskSearch search, HttpSession session, Principal principal) {
		int page = 1;
		Map<String, Object> response = pagination(search, page, session, principal);
		return response;
	}

	private Map<String, Object> pagination(TaskSearch search, int page, HttpSession session, Principal principal) {

		User user = userRepo.findByUsername(principal.getName()).get();
		
		List<Task> taskList = taskDao.search(search, user);
		List<TaskDTO> taskDtoList = taskList.stream().map((task) -> modelMapper.map(task, TaskDTO.class)).collect(Collectors.toList());
		
		page = (page > 0) ? page : 1;
		from = ROWS * (page - 1);
		records = (long) taskDtoList.size();
		total = (int) Math.ceil((double) records / (double) ROWS);
		List<TaskDTO> pagTaskList = taskDtoList.stream().skip(from).limit(ROWS).collect(Collectors.toList());
		
		Map<String, Object> response = new HashMap<>();
        response.put("pagTaskList", pagTaskList);
        response.put("currentPage", page);
        response.put("totalPages", total);
        response.put("totalItems", taskDtoList.size());
		session.setAttribute("page", page);
		session.setAttribute("search", search);
		return response;
	}

}
