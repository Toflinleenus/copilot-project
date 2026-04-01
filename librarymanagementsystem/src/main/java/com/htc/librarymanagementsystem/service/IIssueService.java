package com.htc.librarymanagementsystem.service;

import java.util.List;

import com.htc.librarymanagementsystem.entity.IssueRecord;

public interface IIssueService {

    IssueRecord issueBook(Long bookId, Long memberId);

    IssueRecord returnBook(Long issueRecordId);

    List<IssueRecord> getAllIssues();
}
