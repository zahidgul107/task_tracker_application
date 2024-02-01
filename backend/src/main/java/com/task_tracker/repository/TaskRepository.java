package com.task_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task_tracker.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
