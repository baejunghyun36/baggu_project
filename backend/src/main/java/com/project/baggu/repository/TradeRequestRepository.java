package com.project.baggu.repository;

import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TradeRequestRepository {

  private final EntityManager em;

}
