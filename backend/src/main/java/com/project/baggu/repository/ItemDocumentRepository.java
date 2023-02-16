package com.project.baggu.repository;

import com.project.baggu.domain.ItemDocument;
import java.util.List;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemDocumentRepository extends ElasticsearchRepository<ItemDocument, String> {

//  @Query("{\"match\": {\"title\": {\"query\": \"*?0*\"}}}")
@Query("{\n" +
    "    \"bool\": {\n" +
    "        \"should\": [\n" +
    "            {\n" +
    "                \"query_string\": {\n" +
    "                    \"query\": \"*?0*\",\n" +
    "                    \"fields\": [\"title\"],\n" +
    "                    \"analyze_wildcard\": true\n" +
    "                }\n" +
    "            },\n" +
    "            {\n" +
    "                \"match\": {\n" +
    "                    \"title\": {\n" +
    "                        \"query\": \"?0\",\n" +
    "                        \"operator\": \"and\"\n" +
    "                    }\n" +
    "                }\n" +
    "            }\n" +
    "        ]\n" +
    "    }\n" +
    "}")
  List<ItemDocument> findByTitleContaining(String title);

}