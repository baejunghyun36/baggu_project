package com.project.baggu.domain;

import static javax.persistence.FetchType.LAZY;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "heart")
@NoArgsConstructor
@Setter @Getter
public class Heart extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "heart_idx")
  private Long heartIdx;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_idx")
  private User user;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "trade_fin_idx")
  private TradeFin tradeFin;

  public void setUser(User user) {
    this.user = user;
    user.getHearts().add(this);
  }

  public void setTradeFin(TradeFin tradeFin) {
    this.tradeFin = tradeFin;
    user.getHearts().add(this);
  }

}
