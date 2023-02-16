package com.project.baggu.repository;

import com.project.baggu.domain.ReviewText;
import com.project.baggu.domain.TradeFin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface TradeFinRepository extends JpaRepository<TradeFin, Long> {

  @Query("select t from TradeFin t where t.receiveUserIdx= ?1 or t.requestUserIdx= ?1 order by t.createdAt desc")
  Slice<TradeFin> getTradeFinListByUser(Long userIdx, Pageable pageable);

  @Query("select count(t) from TradeFin t where t.receiveItemIdx = :receiveItemIdx or t.requestItemIdx = :receiveItemIdx")
  int findTradeFinByItemIdx(@Param("receiveItemIdx") Long receiveItemIdx);


  @Query("select t from TradeFin t order by t.createdAt desc")
  List<TradeFin> recentTradeFinList(@Param("userIdx") Long userIdx);

////  @Query("select distinct t, count(h) as heartCount from TradeFin t join fetch Heart h group by h.tradeFin order by t.createdAt desc")
//  List<TradeFin> getRecentTradeFin(@Param("userIdx") Long userIdx)

  @Query("update TradeFin t set t.heartCount=t.heartCount+1 where t.tradeFinIdx = :tradeFinIdx")
  void likeTradeFin(@Param("tradeFinIdx") Long tradeFinIdx);

  @Query("update TradeFin t set t.heartCount=t.heartCount-1 where t.tradeFinIdx = :tradeFinIdx")
  void dislikeTradeFin(@Param("tradeFinIdx") Long tradeFinIdx);


}
