package com.project.baggu.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "item")
@Setting(settingPath = "elastic/item-setting.json")
@Mapping(mappingPath = "elastic/item-mapping.json")
@ToString
public class ItemDocument {

  @Id
  private Long itemIdx;;
  private String title;









}