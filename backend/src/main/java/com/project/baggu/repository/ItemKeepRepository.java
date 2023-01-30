package com.project.baggu.repository;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.ItemKeep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemKeepRepository extends JpaRepository<ItemKeep, Long> {

  @Modifying
  @Query("update ItemKeep i set i.isValid = false where i.item.itemIdx = :itemIdx")
  void deleteItem(@Param("itemIdx") Long itemIdx);

}
