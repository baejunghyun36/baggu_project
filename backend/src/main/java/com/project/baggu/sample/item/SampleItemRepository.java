package com.project.baggu.sample.item;
import com.project.baggu.domain.Item;
import java.util.List;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SampleItemRepository {

  private final EntityManager em;

  public void save(Item item) {
    em.persist(item);
  }

  public Item findOne(Long id) {
    return em.find(Item.class, id);
  }

  public List<Item> findAll() {
    return em.createQuery("select i from Item i", Item.class)
        .getResultList();
  }

  public List<Item> findItemList(Long userIdx) {
    return em.createQuery(
            "select i from Item i where i.user.userIdx = :userIdx", Item.class)
        .setParameter("userIdx", userIdx)
        .getResultList();
  }

  public void regist(Item item) {
    em.persist(item);
  }
}
