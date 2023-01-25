package com.project.baggu.repository;

import com.project.baggu.domain.TradeFin;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface TradeFinRepository extends JpaRepository<TradeFin, Long> {
  @Query("select t from TradeFin t where t.requestUserIdx = :userIdx or t.receiveUserIdx = :userIdx order by t.createdAt desc")
  List<TradeFin> userTradeFinList(@Param("userIdx") Long userIdx);
}
