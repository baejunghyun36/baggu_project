package com.project.baggu.domain;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

@DynamicInsert
@Entity
@Table(name = "user")
@NoArgsConstructor
@Getter @Setter
public class User extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_idx")
  private Long userIdx;

  @Column(name = "email")
  private String email;

  @Column(name = "name")
  private String name;

  @Column(name = "phone")
  private String phone;

  @Column(name = "nickname")
  private String nickname;

  @Column(name = "is_valid")
  private boolean isValid = true;

  @Column(name = "trade_count")
  private int tradeCount;

  @LastModifiedDate
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "visited_at")
  private LocalDateTime visitedAt;

  @LastModifiedDate
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "modified_at")
  private LocalDateTime modifiedAt;

  @Column(name = "info")
  private String info;

  @Column(name = "si")
  private String si;

  @Column(name = "gu")
  private String gu;

  @Column(name = "dong")
  private String dong;

  @Column(name = "lat")
  private String lat;

  @Column(name = "lng")
  private String lng;

  @JsonIgnore
  @OneToMany(mappedBy = "user" )
  private List<Category> categories = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "user" )
  private List<ReviewTag> reviewTags = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<Notify> notifies = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<ReviewUser> reviewUsers = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<ItemKeep> itemKeeps = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<Heart> hearts = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "requestUserIdx")
  private List<TradeRequest> tradeRequests = new ArrayList<>();

  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<Item> items = new ArrayList<>();

}
