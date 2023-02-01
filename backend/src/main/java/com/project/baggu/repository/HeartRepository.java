package com.project.baggu.repository;

import com.project.baggu.domain.Heart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

public interface HeartRepository extends JpaRepository<Heart, Long> {

  @Modifying
  @Query("delete from Heart h where h.tradeFin.tradeFinIdx = :tradeFinIdx and h.user.userIdx= :userIdx")
  public void deleteHeart(@Param("tradeFinIdx") Long tradeFinIdx,
      @Param("userIdx")Long userIdx);

  @Query("select count(h.heartIdx) from Heart h where h.tradeFin.tradeFinIdx = :tradeFinIdx and h.user.userIdx= :userIdx")
  public int findByTradeFinIdxAndUserIdx(@Param("tradeFinIdx") Long tradeFinIdx,
                                          @Param("userIdx")Long userIdx);

}
