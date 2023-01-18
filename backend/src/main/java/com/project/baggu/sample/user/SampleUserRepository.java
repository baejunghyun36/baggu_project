package com.project.baggu.sample.user;

import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.User;
import java.util.List;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SampleUserRepository {

  private final EntityManager em;

  public void save(User user) {
    em.persist(user);
  }

  public User findOne(Long userIdx) {
    return em.find(User.class, userIdx);
  }

  public void saveCategory(Category category) {
    em.persist(category);
  }

  public Category findCategory(Long categoryIdx) {

    return em.find(Category.class, categoryIdx);
  }


  public List<Category> getListCategoryWithJoin() {
    return em.createQuery(
        "select c from Category c"
            + " join fetch c.user u", Category.class
    ).getResultList();
  }

  public List<Category> getCategoryList() {
    return em.createQuery(
        "select c from Category c", Category.class)
        .getResultList();
  }

  public User findNamedUser(String userName) {
    //userName = "배정현"
    return em.createQuery("select u from User u where u.name = :userName", User.class)
        .setParameter("userName", userName)
        .getSingleResult();
  }

  public List<Item> findNamedUserItemList(String userName) {
    return em.createQuery(
        "select i from Item i"
            + " join fetch i.user u"
            + " where u.name = :userName", Item.class)
        .setParameter("userName", userName)
        .getResultList();
  }


}
