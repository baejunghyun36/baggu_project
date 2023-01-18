package com.project.baggu.domain;
import static javax.persistence.FetchType.LAZY;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "review_user")
@Getter
@Setter
@NoArgsConstructor
public class ReviewUser extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "review_user_idx")
  private Long reviewUserIdx;

  @Column(name = "comment")
  private String comment;

  @Column(name = "is_valid")
  private boolean isValid = true;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_idx")
  private User user;

  @OneToOne(fetch = LAZY)
  @JoinColumn(name = "item_idx")
  private Item item;

  public void setUser(User user) {
    this.user = user;
    user.getReviewUsers().add(this);
  }

  public void setItem(Item item) {
    this.item = item;
    user.getReviewUsers().add(this);
  }

}
