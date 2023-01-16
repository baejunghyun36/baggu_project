package com.project.baggu.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trade_fn")
@Getter
@Setter
@NoArgsConstructor
public class TradeFin extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "trade_fin_idx")
  private Long tradeFinIdx;

  @Column(name = "heart_count")
  private int heartCount;

  @Column(name = "receive_item_idx")
  private Long receiveItemIdx;

  @Column(name = "receive_comment")
  private String requestComment;

  @Column(name = "is_valid")
  private boolean isValid = true;

  @JsonIgnore
  @OneToMany(mappedBy = "tradeFin")
  private List<Heart> hearts = new ArrayList<>();
}
