package com.project.baggu.domain;

import static javax.persistence.FetchType.LAZY;
import com.project.baggu.domain.enumType.CategoryType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
public class Category extends BaseTimeEntity {

  @Id
  @Column(name = "category_idx")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long categoryIdx;

  @Column(name = "type")
  @Enumerated(EnumType.ORDINAL)
  private CategoryType type;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_idx")
  private User user;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
    user.getCategories().add(this);
  }
}
