package com.htc.librarymanagementsystem.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.htc.librarymanagementsystem.entity.Book;
import com.htc.librarymanagementsystem.entity.IssueRecord;
import com.htc.librarymanagementsystem.entity.Member;
import com.htc.librarymanagementsystem.exception.ResourceNotFoundException;
import com.htc.librarymanagementsystem.repository.BookRepository;
import com.htc.librarymanagementsystem.repository.IssueRecordRepository;
import com.htc.librarymanagementsystem.repository.MemberRepository;
import com.htc.librarymanagementsystem.service.IIssueService;

@Service
@Transactional
public class IssueServiceImpl implements IIssueService {

    private final IssueRecordRepository issueRecordRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    public IssueServiceImpl(IssueRecordRepository issueRecordRepository,
                           BookRepository bookRepository,
                           MemberRepository memberRepository) {
        this.issueRecordRepository = issueRecordRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public IssueRecord issueBook(Long bookId, Long memberId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));

        if (book.getAvailableCopies() <= 0) {
            throw new IllegalArgumentException("No available copies for book id: " + bookId);
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + memberId));

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        IssueRecord record = new IssueRecord();
        record.setBook(book);
        record.setMember(member);
        record.setIssueDate(LocalDate.now());
        record.setStatus("ISSUED");

        return issueRecordRepository.save(record);
    }

    @Override
    public IssueRecord returnBook(Long issueRecordId) {
        IssueRecord record = issueRecordRepository.findById(issueRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue record not found with id: " + issueRecordId));

        if (!"ISSUED".equalsIgnoreCase(record.getStatus())) {
            throw new IllegalArgumentException("Book is not currently issued or already returned");
        }

        Book book = record.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        record.setReturnDate(LocalDate.now());
        record.setStatus("RETURNED");

        return issueRecordRepository.save(record);
    }

    @Override
    public List<IssueRecord> getAllIssues() {
        return issueRecordRepository.findAll();
    }
}
