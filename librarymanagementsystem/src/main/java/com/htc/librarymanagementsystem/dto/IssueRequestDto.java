package com.htc.librarymanagementsystem.dto;

import jakarta.validation.constraints.NotNull;

public class IssueRequestDto {

    @NotNull
    private Long bookId;

    @NotNull
    private Long memberId;

    public IssueRequestDto() {
    }

    public IssueRequestDto(Long bookId, Long memberId) {
        this.bookId = bookId;
        this.memberId = memberId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
}
