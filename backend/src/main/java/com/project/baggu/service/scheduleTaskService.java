package com.project.baggu.service;


import com.project.baggu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
public class scheduleTaskService {

  private final UserRepository userRepository;

  @Scheduled(cron = "0 0 0 * * *")
  @Transactional
  public void initUserTradeCount(){
    userRepository.initUserTradeCount();
  }
}
