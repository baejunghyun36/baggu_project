package com.project.baggu.domain;
import static javax.persistence.FetchType.LAZY;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "trade_detail")
@Getter @Setter
@NoArgsConstructor
public class TradeDetail extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "trade_detail_idx")
  private Long tradeDetailIdx;

  @Column(name = "trade_state")
  private int tradeState;

  @Column(name = "is_valid")
  @Builder.Default
  private boolean isValid = true;

  @Column(name = "request_item_idx")
  private Long requestItemIdx;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "trade_request_idx")
  private TradeRequest tradeRequest;

  @LastModifiedDate
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "modified_at")
  private LocalDateTime modifiedAt;

  public void setTradeRequest(TradeRequest tradeRequest) {
    this.tradeRequest = tradeRequest;
    tradeRequest.getTradeDetails().add(this);
  }
}
