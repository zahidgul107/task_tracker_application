package com.task_tracker.entity;

import java.time.LocalDate;

import com.task_tracker.constants.TaskStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "tasks")
public class Task {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotBlank
	@Size(max = 120)
    private String title;
	
	@NotBlank
	@Size(max = 255)
    private String description;
	
	@NotNull
	private LocalDate dueDate;
	
//	@Column(columnDefinition = "BOOLEAN")
//    private boolean completed;
	
	@Enumerated(EnumType.STRING)
    private TaskStatus status;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
	@NotNull(message = "User must be specified")
    private User createdBy;

}
