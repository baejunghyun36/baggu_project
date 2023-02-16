package com.project.baggu.repository;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.enumType.CategoryType;
import java.util.List;
import javax.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  @Query(value = "select i from Item i left outer join fetch i.reviewText where i.dong = ?1 and i.isValid = true")
  Slice<Item> getItemListByNeighbor(String dong, Pageable pageable);

  @Query(value = "select i from Item i left outer join fetch i.reviewText where i.user.userIdx = ?1 ")
  Slice<Item> getUserItemList(Long userIdx, Pageable pageable);


  /**
   * 리스트에 담긴 itemIdx를 이용해 Item 엔티티가 담긴 List를 반환
   * @param itemIdxList
   * @return List<Item>
   * @author Jung Hyun Bae
   * @author An Chae Lee (modifier)
   */
  @Query("SELECT i FROM Item i left outer join fetch i.reviewText WHERE i.itemIdx IN (?1) AND i.isValid = true AND i.createdAt IS NOT NULL ORDER BY i.createdAt DESC\n"
      + "\n"
      + "\n")
  Slice<Item> findItemsByItemIdxList(@Param("itemIdxList") List<Long> itemIdxList, Pageable pageable);

  //fetch join
  @Query("select i from Item i left outer join i.reviewText where i.title like %:itemName% order by i.createdAt desc")
  Slice<Item> getItemListByItemName(@Param("itemName") String itemName, Pageable pageable);

  @Modifying
  @Query("update Item i set i.isValid = false where i.itemIdx = :itemIdx")
  void deleteItem(@Param("itemIdx") Long itemIdx);



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
