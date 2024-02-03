package com.task_tracker.dto;

import java.time.LocalDate;

import com.task_tracker.constants.TaskStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskSearch {
	
    private String title;

    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

}
