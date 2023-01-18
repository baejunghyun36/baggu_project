package com.project.baggu.sample.user;

import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class SampleUserService {

  private final SampleUserRepository sampleUserRepository;

  @Transactional
  public void save(User user) {
    sampleUserRepository.save(user);
  }

  public User find(Long userIdx) {
    return sampleUserRepository.findOne(userIdx);
  }

  @Transactional
  public void saveCategory(Category category) {
    sampleUserRepository.saveCategory(category);
  }

  public Category findCategory(Long categoryIdx) {
    return sampleUserRepository.findCategory(categoryIdx);
  }

  public List<Category> getListCategoryWithJoin() {
    return sampleUserRepository.getListCategoryWithJoin();
  }

  public List<Category> getCategoryList() {
    return sampleUserRepository.getCategoryList();
  }

  public User findNamedUser(String userName) {
    return sampleUserRepository.findNamedUser(userName);
  }

  public List<Item> findNamedUserItemList(String userName) {
    return sampleUserRepository.findNamedUserItemList(userName);
  }

  @Transactional
  public void requestTradeRequest(User user, Item item) {
    validateRequestCountOnDay(user); //하루 물건 교환 신청 횟수

    log.info("교환 신청 완료");

  }

  private void validateRequestCountOnDay(User user) {
    if(user.getTradeCount()>=10){
      throw new IllegalStateException("하루 물건 신청 횟수를 초과하였습니다.");
    }
  }

  @Transactional
  public void updateUser(Long idx, String changeName) {
    User user = sampleUserRepository.findOne(idx);
    user.setName(changeName);
  }
}
