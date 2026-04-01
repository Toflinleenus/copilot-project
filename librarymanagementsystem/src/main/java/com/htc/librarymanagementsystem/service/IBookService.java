package com.htc.librarymanagementsystem.service;

import java.util.List;
import com.htc.librarymanagementsystem.entity.Book;

public interface IBookService {

    Book addBook(Book book);

    List<Book> getAllBooks();

    Book updateBook(Long id, Book updatedBook);

    void deleteBook(Long id);
}
