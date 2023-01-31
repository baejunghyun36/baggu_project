package com.project.baggu.repository;

import com.project.baggu.domain.ReviewTag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewTagRepository extends JpaRepository<ReviewTag, Long>{

  @Query("select rt from ReviewTag rt where rt.user.userIdx = :userIdx")
  List<ReviewTag> findReviewTagByUserIdx(@Param("userIdx") Long userIdx);
}
