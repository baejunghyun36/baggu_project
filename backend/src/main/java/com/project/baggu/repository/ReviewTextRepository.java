package com.project.baggu.repository;

import com.project.baggu.domain.ReviewText;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewTextRepository extends JpaRepository<ReviewText, Long> {

  @Query("select rt.comment from ReviewText rt where rt.receiveUserIdx = :userIdx")
  List<String> findReviewReceiveTextList(@Param("userIdx") Long userIdx);

  @Query("select rt from ReviewText rt where rt.user.userIdx = :userIdx")
  List<ReviewText> findReviewRequestTextList(@Param("userIdx") Long userIdx);

  @Query("select rt from ReviewText rt where rt.item.itemIdx = :itemIdx")
  Optional<ReviewText> findByTradeItemIdx(@Param("itemIdx") Long itemIdx);
}
