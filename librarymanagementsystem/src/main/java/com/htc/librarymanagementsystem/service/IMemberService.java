package com.htc.librarymanagementsystem.service;

import java.util.List;
import com.htc.librarymanagementsystem.entity.Member;

public interface IMemberService {

    Member registerMember(Member member);

    List<Member> getAllMembers();

    Member getMemberById(Long id);

    Member updateMember(Long id, Member member);

    void deleteMember(Long id);
}
