package com.project.baggu.repository;

import com.project.baggu.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
  @Modifying
  @Query("update User u set u.nickname = :nickname, u.info = :info where u.userIdx = :userIdx")
  void userUpdateProfile(
      @Param("userIdx") Long userIdx,
      @Param("nickname") String nickname,
      @Param("info") String info);

  @Modifying
  @Query("update Item i set i.title = :title, i.category = :category, i.content = :content where i.itemIdx = :itemIdx")
  void updateItem(
      @Param("itemIdx")Long itemIdx,
      @Param("title") String title,
      @Param("category") int category,
      @Param("content") String content);
  @Query("select u from User u where u.email = :email")
  Optional<User> findUserByEmail(@Param("email") String email);
}
