package com.htc.librarymanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htc.librarymanagementsystem.entity.IssueRecord;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
}
