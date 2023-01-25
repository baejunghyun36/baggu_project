package com.project.baggu.repository;

import com.project.baggu.domain.Notify;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
public interface NotifyRepository extends JpaRepository<Notify, Long> {
  @Query("select n from Notify n where n.user.userIdx = :userIdx")
  List<Notify> notifyListByUserIdx(@Param("userIdx") Long userIdx);
}
