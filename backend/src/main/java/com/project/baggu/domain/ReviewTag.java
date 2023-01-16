package com.project.baggu.domain;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;
import com.project.baggu.domain.enumType.ReviewTagType;
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
@Table(name = "review_tag")
@Getter
@Setter
@NoArgsConstructor
public class ReviewTag extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "review_tag_idx")
  private Long reviewTagIdx;

  @Column(name = "type")
  @Enumerated(EnumType.ORDINAL)
  private ReviewTagType type;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_idx")
  private User user;

  public void setUser(User user) {
    this.user = user;
    user.getReviewTags().add(this);
  }
}
