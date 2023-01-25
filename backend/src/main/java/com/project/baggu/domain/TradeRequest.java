package com.project.baggu.domain;
import static javax.persistence.FetchType.LAZY;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "trade_request")
@NoArgsConstructor
@Setter
@Getter
public class TradeRequest extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "trade_request_idx")
  private Long tradeRequestIdx;

  @Column(name = "trade_request_state")
  private int tradeRequestState;

  @Column(name = "is_valid")
  private boolean isValid = true;

  @Column(name = "comment")
  private String comment;

  @LastModifiedDate
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "modified_at")
  private LocalDateTime modifiedAt;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_idx")
  private User requestUser;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "item_idx")
  private Item receiveItemIdx;

  @JsonIgnore
  @OneToMany(mappedBy = "tradeRequest")
  private List<TradeDetail> tradeDetails = new ArrayList<>();


}
