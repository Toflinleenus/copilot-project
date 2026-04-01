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

import com.htc.librarymanagementsystem.entity.Member;
import com.htc.librarymanagementsystem.repository.MemberRepository;
import com.htc.librarymanagementsystem.serviceimpl.MemberServiceImpl;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberServiceImpl memberService;

    @Test
    void testRegisterMember() {
        Member member = new Member("Name", "email@example.com");
        when(memberRepository.save(any(Member.class))).thenReturn(member);

        Member saved = memberService.registerMember(member);

        assertNotNull(saved);
        assertEquals("email@example.com", saved.getEmail());
        verify(memberRepository, times(1)).save(member);
    }

    @Test
    void testRegisterMemberDuplicateEmail() {
        Member member = new Member("Name", "email@example.com");
        when(memberRepository.findByEmail("email@example.com")).thenReturn(Optional.of(member));

        assertThrows(IllegalArgumentException.class,
                () -> memberService.registerMember(member));
    }

    @Test
    void testGetAllMembers() {
        List<Member> members = Arrays.asList(new Member("N1", "e1@example.com"));
        when(memberRepository.findAll()).thenReturn(members);

        List<Member> result = memberService.getAllMembers();

        assertEquals(1, result.size());
        verify(memberRepository, times(1)).findAll();
    }
}
