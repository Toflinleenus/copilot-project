package com.htc.librarymanagementsystem;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.htc.librarymanagementsystem.entity.Book;
import com.htc.librarymanagementsystem.entity.IssueRecord;
import com.htc.librarymanagementsystem.entity.Member;
import com.htc.librarymanagementsystem.exception.ResourceNotFoundException;
import com.htc.librarymanagementsystem.repository.BookRepository;
import com.htc.librarymanagementsystem.repository.IssueRecordRepository;
import com.htc.librarymanagementsystem.repository.MemberRepository;
import com.htc.librarymanagementsystem.serviceimpl.IssueServiceImpl;

@ExtendWith(MockitoExtension.class)
public class IssueServiceTest {

    @Mock
    private IssueRecordRepository issueRecordRepository;

    @Mock
    private BookRepository bookRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private IssueServiceImpl issueService;

    @Test
    void testIssueBookSuccess() {
        Book book = new Book("Title", "Author", 2);
        Member member = new Member("Name", "email@example.com");

        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(memberRepository.findById(1L)).thenReturn(Optional.of(member));
        when(issueRecordRepository.save(any(IssueRecord.class))).thenAnswer(inv -> inv.getArgument(0));

        IssueRecord record = issueService.issueBook(1L, 1L);

        assertEquals("ISSUED", record.getStatus());
        assertEquals(1, book.getAvailableCopies());
    }

    @Test
    void testIssueBookNoCopies() {
        Book book = new Book("Title", "Author", 0);
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        assertThrows(IllegalArgumentException.class, () -> issueService.issueBook(1L, 1L));
    }

    @Test
    void testReturnBookNotFound() {
        when(issueRecordRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> issueService.returnBook(1L));
    }
}
