package com.htc.librarymanagementsystem;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.htc.librarymanagementsystem.entity.Book;
import com.htc.librarymanagementsystem.exception.ResourceNotFoundException;
import com.htc.librarymanagementsystem.repository.BookRepository;
import com.htc.librarymanagementsystem.serviceimpl.BookServiceImpl;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @Test
    void testAddBook() {
        Book book = new Book("Title", "Author", 3);
        when(bookRepository.save(any(Book.class))).thenReturn(book);

        Book saved = bookService.addBook(book);

        assertNotNull(saved);
        assertEquals("Title", saved.getTitle());
        verify(bookRepository, times(1)).save(book);
    }

    @Test
    void testGetAllBooks() {
        List<Book> books = Arrays.asList(new Book("T1", "A1", 1));
        when(bookRepository.findAll()).thenReturn(books);

        List<Book> result = bookService.getAllBooks();

        assertEquals(1, result.size());
        verify(bookRepository, times(1)).findAll();
    }

    @Test
    void testUpdateBookNotFound() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> bookService.updateBook(1L, new Book("T", "A", 1)));
    }
}
