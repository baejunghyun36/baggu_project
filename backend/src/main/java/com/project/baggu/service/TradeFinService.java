package com.project.baggu.service;

import com.project.baggu.domain.Item;
import com.project.baggu.domain.ReviewTag;
import com.project.baggu.domain.ReviewText;
import com.project.baggu.domain.TradeFin;
import com.project.baggu.domain.User;
import com.project.baggu.dto.ReviewDto;
import com.project.baggu.dto.ReviewTagDto;
import com.project.baggu.dto.ReviewTextDto;
import com.project.baggu.dto.TradeFinDto;
import com.project.baggu.repository.ItemRepository;
import com.project.baggu.repository.ReviewTagRepository;
import com.project.baggu.repository.ReviewTextRepository;
import com.project.baggu.repository.TradeFinRepository;
import com.project.baggu.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TradeFinService {

  private final UserRepository userRepository;
  private final TradeFinRepository tradeFinRepository;
  private final ReviewTagRepository reviewTagRepository;
  private final ItemRepository itemRepository;
  private final ReviewTextRepository reviewTextRepository;

  public List<TradeFinDto> tradeFinList() {

    List<TradeFin> tradeFinList = tradeFinRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    List<TradeFinDto> tradeFinDtos = new ArrayList<>();
    for(TradeFin tf : tradeFinList){
      TradeFinDto tradeFinDto = new TradeFinDto();
      tradeFinDto.setHeartCount(tf.getHeartCount());
      tradeFinDto.setCreatedAt(tf.getCreatedAt());
      tradeFinDto.setReceiveItemIdx(tf.getReceiveItemIdx());
      tradeFinDto.setRequestItemIdx(tf.getRequestItemIdx());
      tradeFinDto.setReceiveNickname(tf.getReceiveNickname());
      tradeFinDto.setRequestNickname(tf.getRequestNickname());
      tradeFinDtos.add(tradeFinDto);
    }
    return tradeFinDtos;
  }

  public List<TradeFinDto> userTradeFinList(Long userIdx) {

    List<TradeFin> tradeFinList = tradeFinRepository.userTradeFinList(userIdx);
    List<TradeFinDto> tradeFinDtos = new ArrayList<>();
    for(TradeFin tf : tradeFinList){
      TradeFinDto tradeFinDto = new TradeFinDto();
      tradeFinDto.setHeartCount(tf.getHeartCount());
      tradeFinDto.setCreatedAt(tf.getCreatedAt());
      tradeFinDto.setReceiveItemIdx(tf.getReceiveItemIdx());
      tradeFinDto.setRequestItemIdx(tf.getRequestItemIdx());
      tradeFinDto.setReceiveNickname(tf.getReceiveNickname());
      tradeFinDto.setRequestNickname(tf.getRequestNickname());
      tradeFinDtos.add(tradeFinDto);
    }
    return tradeFinDtos;
  }

  public void reviewTag(ReviewTagDto reviewTagDto) {

    ReviewTag reviewTag = new ReviewTag();
    reviewTag.setType(reviewTagDto.getReviewTagType());
    reviewTag.setUser(userRepository.findById(reviewTagDto.getUserIdx()).get());
    reviewTagRepository.save(reviewTag);
  }

  public void reviewText(ReviewTextDto reviewTextDto) {

    ReviewText reviewText = new ReviewText();
    User requestUser = userRepository.findById(reviewTextDto.getRequestUserIdx()).get();
    Item receiveitem = itemRepository.findById(reviewTextDto.getReceiveItemIdx()).get();
    reviewText.setUser(requestUser);
    reviewText.setItem(receiveitem);
    reviewText.setComment(reviewTextDto.getReviewText());
    reviewText.setReceiveUserIdx(receiveitem.getUser().getUserIdx());
    reviewTextRepository.save(reviewText);
  }

}
