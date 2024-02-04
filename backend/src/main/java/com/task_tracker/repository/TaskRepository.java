package com.task_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task_tracker.entity.Task;
import com.task_tracker.entity.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

	List<Task> findByCreatedBy(User user);

}
