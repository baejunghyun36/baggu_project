package com.project.baggu.repository;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.enumType.CategoryType;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  @Query(value = "select i from Item i where i.dong = ?1 and i.isValid = true")
  List<Item> itemListOrderByNeighbor(String dong, Pageable pageable);

  @Query(value = "select i from Item i where i.user.userIdx = ?1 ")
  List<Item> getUserItemList(Long userIdx, Pageable pageable);

  @Modifying
  @Query("update Item i set i.isValid = false where i.itemIdx = :itemIdx")
  void deleteItem(@Param("itemIdx") Long itemIdx);


  @Query("select i from Item i where i.title like %:itemName% order by i.createdAt desc")
  List<Item> itemListByItemName(@Param("itemName") String itemName);

  @Query("select i from Item i, ItemKeep ik where ik.user.userIdx = :userIdx and ik.item = i")
  List<Item> userKeepItemList(@Param("userIdx") Long userIdx);

}
