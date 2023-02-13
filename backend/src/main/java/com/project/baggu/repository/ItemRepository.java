package com.project.baggu.repository;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.enumType.CategoryType;
import java.util.List;
import javax.persistence.LockModeType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  @Query(value = "select i from Item i join fetch i.reviewText where i.dong = ?1 and i.isValid = true")
  List<Item> itemListOrderByNeighbor(String dong, Pageable pageable);

  @Query(value = "select i from Item i join fetch i.reviewText where i.user.userIdx = ?1 ")
  List<Item> getUserItemList(Long userIdx, Pageable pageable);

  @Modifying
  @Query("update Item i set i.isValid = false where i.itemIdx = :itemIdx")
  void deleteItem(@Param("itemIdx") Long itemIdx);

  //fetch join
  @Query("select i from Item i join fetch i.reviewText where i.title like %:itemName% order by i.createdAt desc")
  List<Item> itemListByItemName(@Param("itemName") String itemName);

  @Query("select i from Item i, ItemKeep ik where ik.user.userIdx = :userIdx and ik.item = i")
  List<Item> userKeepItemList(@Param("userIdx") Long userIdx);

  @Modifying
  @Query("update Item i set i.userRequestCount = :cnt where i.itemIdx = :itemIdx" )
  void updateUserRequsetCount(@Param("itemIdx") Long itemIdx, @Param("cnt") int cnt);

  @Lock(LockModeType.OPTIMISTIC)
  @Query("select i from Item i where i.itemIdx = :itemIdx" )
  Item findByIdLock(@Param("itemIdx") Long itemIdx);


  @Query("SELECT i FROM Item i JOIN FETCH i.reviewText where i.itemIdx = :idx")
  Item findByIdFetch(@Param("idx") Long idx);

  @Query("SELECT i FROM Item i JOIN FETCH i.reviewText")
  List<Item> findAllFetch();

//  @Query("SELECT i FROM Item i JOIN FETCH i.reviewText")
//  List<Item> findAllItemsWithReviewText();
}
