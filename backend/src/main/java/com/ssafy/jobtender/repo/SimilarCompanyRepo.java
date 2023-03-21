package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.SimilarCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SimilarCompanyRepo extends JpaRepository<SimilarCompany, Long> {
    Optional<List<SimilarCompany>> findAllByCompanyId(long company_id);
}