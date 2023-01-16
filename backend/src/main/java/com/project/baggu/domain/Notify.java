package com.project.baggu.domain;
import static javax.persistence.FetchType.LAZY;
import com.project.baggu.domain.enumType.NotifyType;
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
@Table(name = "notify")
@Getter
@Setter
@NoArgsConstructor
public class Notify extends BaseTimeEntity {

  @Id
  @Column(name = "notify_idx")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long notifyIdx;

  @Column(name = "content")
  private String content;

  @Column(name = "type")
  @Enumerated(EnumType.ORDINAL)
  private NotifyType type;

  @Column(name = "type_idx")
  private int typeIdx;

  @Column(name = "read_state")
  private boolean readState;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_idx")
  private User user;

  public void setUser(User user) {
    this.user = user;
    user.getNotifies().add(this);
  }

}
