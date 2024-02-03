package com.task_tracker.dao;

import java.util.List;

import com.task_tracker.dto.TaskSearch;
import com.task_tracker.entity.Task;
import com.task_tracker.entity.User;

public interface TaskDao {

	List<Task> search(TaskSearch search, User user);

}
