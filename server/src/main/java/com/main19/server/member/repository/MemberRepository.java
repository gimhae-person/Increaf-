package com.main19.server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main19.server.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
}