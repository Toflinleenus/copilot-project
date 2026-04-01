package com.htc.librarymanagementsystem;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.htc.librarymanagementsystem.controller.MemberController;
import com.htc.librarymanagementsystem.entity.Member;
import com.htc.librarymanagementsystem.service.IMemberService;

@WebMvcTest(controllers = MemberController.class)
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IMemberService memberService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllMembers() throws Exception {
        when(memberService.getAllMembers()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/members"))
                .andExpect(status().isOk());
    }

    @Test
    void testRegisterMember() throws Exception {
        Member member = new Member("Name", "email@example.com");
        when(memberService.registerMember(any(Member.class))).thenReturn(member);

        mockMvc.perform(post("/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(member)))
                .andExpect(status().isCreated());
    }
}
