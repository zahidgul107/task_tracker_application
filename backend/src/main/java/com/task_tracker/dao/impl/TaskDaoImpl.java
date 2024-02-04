package com.task_tracker.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.task_tracker.dao.TaskDao;
import com.task_tracker.dto.TaskSearch;
import com.task_tracker.entity.Task;
import com.task_tracker.entity.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Repository
public class TaskDaoImpl implements TaskDao {

	@PersistenceContext
	EntityManager em;

	@Override
	public List<Task> search(TaskSearch search, User user) {

		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Task> cq = cb.createQuery(Task.class);
		Root<Task> root = cq.from(Task.class);

		List<Predicate> predicates = getReportPredicates(root, cb, search, user);
		cq.select(root).where(cb.and(predicates.toArray(new Predicate[0]))).distinct(true);

		Query query = em.createQuery(cq);

		return query.getResultList();
	}

	private List<Predicate> getReportPredicates(Root<Task> root, CriteriaBuilder cb, TaskSearch search, User user) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd ");
		List<Predicate> predicates = new ArrayList<>();

		if (search.getTitle() != null) {
			if (!search.getTitle().isEmpty()) {
				predicates.add(cb.equal(root.get("title"), search.getTitle()));
			}
		}

		if (search.getStatus() != null) {
			predicates.add(cb.equal(root.get("status"), search.getStatus()));
		}

		if (search.getDueDate() != null) {
			predicates.add(cb.equal(root.get("dueDate"), search.getDueDate()));
		}

		predicates.add(cb.equal(root.get("createdBy"), user));

		return predicates;
	}

}
