package com.task_tracker.dto;

import java.time.LocalDate;

import com.task_tracker.constants.TaskStatus;
import com.task_tracker.entity.User;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
	
	@NotBlank
    @Size(max = 120)
    private String title;

    @NotBlank
    @Size(max = 255)
    private String description;

    @NotNull
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @NotNull(message = "User must be specified")
    private User createdBy;

}
