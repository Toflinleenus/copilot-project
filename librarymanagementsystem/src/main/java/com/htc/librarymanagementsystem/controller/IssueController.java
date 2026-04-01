package com.htc.librarymanagementsystem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.htc.librarymanagementsystem.dto.IssueRequestDto;
import com.htc.librarymanagementsystem.entity.IssueRecord;
import com.htc.librarymanagementsystem.service.IIssueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class IssueController {

    private final IIssueService issueService;

    public IssueController(IIssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/issues")
    public ResponseEntity<List<IssueRecord>> getAllIssues() {
        List<IssueRecord> issues = issueService.getAllIssues();
        return ResponseEntity.ok(issues);
    }

    @PostMapping("/issue")
    public ResponseEntity<?> issueBook(@Valid @RequestBody IssueRequestDto request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        IssueRecord record = issueService.issueBook(request.getBookId(), request.getMemberId());
        return new ResponseEntity<>(record, HttpStatus.CREATED);
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<IssueRecord> returnBook(@PathVariable("id") Long issueRecordId) {
        IssueRecord record = issueService.returnBook(issueRecordId);
        return ResponseEntity.ok(record);
    }
}
