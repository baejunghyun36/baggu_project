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

import lombok.*;

@Entity
@Table(name = "review_text")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor @Builder
public class ReviewText extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "review_text_idx")
  private Long reviewTextIdx;

  @Column(name = "comment")
  private String comment;

  @Column(name = "is_valid")
  @Builder.Default
  private boolean isValid = true;

  @Column(name = "receive_user_idx")
  private Long receiveUserIdx;

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
    item.setReviewText(this);
  }
}
