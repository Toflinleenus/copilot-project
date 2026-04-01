package com.htc.librarymanagementsystem.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.htc.librarymanagementsystem.entity.Member;
import com.htc.librarymanagementsystem.exception.ResourceNotFoundException;
import com.htc.librarymanagementsystem.repository.MemberRepository;
import com.htc.librarymanagementsystem.service.IMemberService;

@Service
@Transactional
public class MemberServiceImpl implements IMemberService {

    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public Member registerMember(Member member) {
        memberRepository.findByEmail(member.getEmail()).ifPresent(existing -> {
            throw new IllegalArgumentException("Email already registered: " + member.getEmail());
        });
        return memberRepository.save(member);
    }

    @Override
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + id));
    }

    @Override
    public Member updateMember(Long id, Member memberDetails) {
        Member existingMember = getMemberById(id);
        
        if (memberDetails.getName() != null && !memberDetails.getName().isBlank()) {
            existingMember.setName(memberDetails.getName());
        }
        
        if (memberDetails.getEmail() != null && !memberDetails.getEmail().isBlank()) {
            // Check if email is already in use by another member
            memberRepository.findByEmail(memberDetails.getEmail()).ifPresent(existing -> {
                if (!existing.getId().equals(id)) {
                    throw new IllegalArgumentException("Email already in use: " + memberDetails.getEmail());
                }
            });
            existingMember.setEmail(memberDetails.getEmail());
        }
        
        return memberRepository.save(existingMember);
    }

    @Override
    public void deleteMember(Long id) {
        Member member = getMemberById(id);
        memberRepository.delete(member);
    }
}
