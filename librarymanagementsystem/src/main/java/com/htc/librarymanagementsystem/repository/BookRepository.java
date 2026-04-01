package com.htc.librarymanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htc.librarymanagementsystem.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
