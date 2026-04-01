package com.htc.librarymanagementsystem;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.htc.librarymanagementsystem.controller.IssueController;
import com.htc.librarymanagementsystem.dto.IssueRequestDto;
import com.htc.librarymanagementsystem.entity.IssueRecord;
import com.htc.librarymanagementsystem.service.IIssueService;

@WebMvcTest(controllers = IssueController.class)
public class IssueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IIssueService issueService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testIssueBook() throws Exception {
        IssueRequestDto dto = new IssueRequestDto(1L, 1L);
        when(issueService.issueBook(1L, 1L)).thenReturn(new IssueRecord());

        mockMvc.perform(post("/issue")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }

    @Test
    void testReturnBook() throws Exception {
        when(issueService.returnBook(1L)).thenReturn(new IssueRecord());

        mockMvc.perform(put("/return/1"))
                .andExpect(status().isOk());
    }
}
