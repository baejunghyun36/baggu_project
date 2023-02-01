package com.project.baggu.repository;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.TradeRequest;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TradeRequestRepository extends JpaRepository<TradeRequest, Long> {


  @Query("select t.tradeRequestIdx from TradeRequest t where t.requestUser.userIdx = :requestUserIdx and t.receiveItemIdx.itemIdx = :itemIdx")
  Optional<TradeRequest> findIdxByUserIdxAndItemIdx(@Param("requestUserIdx") Long requestUserIdx, @Param("itemIdx") Long itemIdx);

  @Modifying
  @Query("update TradeRequest t set t.isValid = false where t.tradeRequestIdx = :tradeRequestIdx")
  void deleteTradeRequest(@Param("tradeRequestIdx") Long tradeRequestIdx);

  @Query("select t from TradeRequest t where t.requestUser.userIdx= :userIdx order by t.createdAt desc")
  List<TradeRequest> findItemByUserIdx(@Param("userIdx") Long userIdx);

  @Modifying
  @Query("update TradeRequest t set t.tradeRequestState = 1 where t.tradeRequestIdx = :tradeRequestIdx")
  void updateTypeOne(@Param("tradeRequestIdx") Long tradeRequestIdx);

  @Query("select tr from TradeRequest tr where tr.receiveItemIdx.itemIdx = :itemIdx and tr.isValid = true")
  List<TradeRequest> findByItemIdx(@Param("itemIdx") Long itemIdx);

  @Query("update TradeRequest tr set tr.isValid = false where tr.receiveItemIdx.itemIdx = :itemIdx")
  void deleteItem(@Param("itemIdx") Long itemIdx);

  @Query("select tr from TradeRequest tr where tr.receiveItemIdx.itemIdx = :itemIdx")
  List<TradeRequest> findAllReceiveItem(@Param("itemIdx") Long itemIdx);

  @Query("select t from TradeRequest t where t.requestUser.userIdx = :requestUserIdx and t.receiveItemIdx.itemIdx = :itemIdx")
  Optional<TradeRequest> findByUserIdxAndItemIdx(@Param("requestUserIdx") Long requestUserIdx, @Param("itemIdx") Long itemIdx);

}
