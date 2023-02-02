package com.cos.chatapp.controller;

import com.cos.chatapp.domain.ChatRoom;
import com.cos.chatapp.dto.ChatRoomDto;
import com.cos.chatapp.dto.RoomFocusStateDto;
import com.cos.chatapp.repository.ChatRoomRepository;
import com.cos.chatapp.repository.ChatRepository;
import com.cos.chatapp.domain.Chat;
import java.time.LocalDateTime;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RequiredArgsConstructor
@RestController
@RequestMapping("/baggu")
@Slf4j
public class ChatController {

  private final ChatRepository chatRepository;
  private final ChatRoomRepository chatRoomRepository;

  //채팅방 최초 생성 로직 :: 메인 서버에서 바꾸 승낙을 하게 되면 프론트에서 userIdxA,userIdxB를 보내준다.
  @CrossOrigin
  @PostMapping("/chatRoom")
  public Mono<ChatRoom> createChatRoom(@RequestBody ChatRoomDto chatRoomDto){
    ChatRoom chatRoom = new ChatRoom();
    chatRoom.setUserIdx(chatRoomDto.getUserIdx());
    chatRoom.setNickname(chatRoomDto.getNickname());
    chatRoom.setUserImg(chatRoomDto.getUserImg());
    chatRoom.setItemImg(chatRoomDto.getItemImg());
    chatRoom.setItemIdx(chatRoomDto.getItemIdx());
    chatRoom.setCreatedAt(LocalDateTime.now());
    chatRoom.setLastContent("채팅방이 개설되었습니다.");
    return chatRoomRepository.save(chatRoom);
  }

  //최초 채팅방 리스트 불러오기 :: 유저가 채팅방 리스트 페이지로 오면 해당 유저의 채팅방 리스트 받아온다.
  @CrossOrigin
  @GetMapping(value = "/{userIdx}/chatRoomList", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<ChatRoom> findByChatRoomList(@PathVariable Long userIdx){

    return  chatRoomRepository.findByUserIdx(userIdx);
  }

  //위에서 최초 채팅방을 불러온 후 해당 url로 flux 한다. 어떠한 채팅 정보가 해당 유저와 관련되어있다면 채팅방 리스트 페이지에서 감지한다.
  @CrossOrigin
  @GetMapping(value = "/{userIdx}/chatRoom", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<Chat> findByRecentChatList(@PathVariable("userIdx") Long userIdx){
    return chatRepository.mFindByReceiver(userIdx, LocalDateTime.now())
        .subscribeOn(Schedulers.boundedElastic());
  }

  // 채팅방 리스트 새로 받아오기 :: 프론트 측에서 갱신된 내용을 api 요청을 통해 다시 받아온다.(채팅방 리스트 변경 감지될 때마다)
  @CrossOrigin
  @GetMapping("/chatRoomUpdate/{roomId}")
  public Mono<ChatRoom> getChatRoomInfo(@PathVariable("roomId") String roomId){

    return chatRoomRepository.findByRoomNumber(roomId);
  }

  //채팅 보내기 :: 채팅을 하게 되면 각 유저의 채팅방 리스트를 업데이트하고 채팅 DB에 저장한다.
  @CrossOrigin
  @PostMapping("/chat")
  public Mono<Chat> setMsg(@RequestBody Chat chat){

    chat.setCreatedAt(LocalDateTime.now());
    return chatRoomListUpdate(chat)
        .then(chatRepository.save(chat));
  }

  //채팅방 업데이트 :: 채팅이 날라가면 수신자가 채팅방 out 상태면 readNotCnt 증가. in 상태면 상태 변화 없음. 채팅방 미리보기 메세지 수정.
  @CrossOrigin
  @PostMapping("/chatList")
  public Mono<ChatRoom> chatRoomListUpdate(Chat chat){

    return chatRoomRepository.findByRoomNumber(chat.getRoomId())
        .switchIfEmpty(Mono.error(new NotFoundException()))
        .map(b -> {
          b.setLastContent(chat.getMsg());
          Long [] arr = b.getReadNotCnt();
          if(chat.getReceiverIdx()==b.getUserIdx()[0]){
            if(b.getUserActive()[0]==false) arr[0]++;
          }
          else{
            if(b.getUserActive()[1]==false) arr[1]++;
          }
          b.setReadNotCnt(arr);
          return b;
        })
        .flatMap(chatRoomRepository::save);
  }

  //채팅방 안으로 들어가기 :: 채팅방에서 채팅했던 내역들을 모두 불러오고 실시간 채팅을 flux한다.
  @CrossOrigin
  @GetMapping(value = "/chatRoom/{roomId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public Flux<Chat> findByRoomNum (@PathVariable String roomId) {

    return chatRepository.findByRoomId(roomId)
        .subscribeOn(Schedulers.boundedElastic());
  }


  //현재 포커스에 따른 읽기 변경 :: 브라우저의 FocusOn이 바뀔 때마다 api 요청을 하게된다. 해당 요청을 받아서 방에 입장한 사용자 in/out 갱신.
  @CrossOrigin
  @PostMapping("/focusState")
  private Mono<ChatRoom> updateUserActive(@RequestBody RoomFocusStateDto roomFocusStateDto){
    String roomId = roomFocusStateDto.getRoomId();
    Long userIdx = roomFocusStateDto.getUserIdx();
    Boolean focusOn = roomFocusStateDto.getFocusOn();
    return chatRoomRepository.findByRoomNumber(roomId)
        .map(b->{
          Boolean [] userActive = b.getUserActive();
          Long[] readNotCnt = b.getReadNotCnt();

          if(userIdx==b.getUserIdx()[0]){
            if(focusOn==true){
              userActive[0] = true;
              readNotCnt[0] = 0L;
            }
            else userActive[0] = false;
          }
          else{
            if(focusOn==true){
              userActive[1] = true;
              readNotCnt[1] = 0L;
            }
            else userActive[1] = false;
          }
          System.out.println(Arrays.toString(userActive));
          b.setUserActive(userActive);
          b.setReadNotCnt(readNotCnt);
          return b;
        })
        .flatMap(chatRoomRepository::save);
  }

}
