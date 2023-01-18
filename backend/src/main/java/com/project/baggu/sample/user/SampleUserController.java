package com.project.baggu.sample.user;

import com.project.baggu.domain.Category;
import com.project.baggu.domain.Item;
import com.project.baggu.domain.User;
import com.project.baggu.sample.item.SampleItemService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sampleUser")
@RequiredArgsConstructor
@Slf4j
public class SampleUserController {

  private final SampleUserService sampleUserService;
  private final SampleItemService sampleItemService;

  //1. if -> jsonignore skip -> infinite loop explain

  @GetMapping("/findCategoryOne")
  public Category category() {

    return sampleUserService.findCategory(1L);

  }


  //2. fetch lazy explain
  @GetMapping("/fetchLazyCategory")
  public String category2() {
    Category category = sampleUserService.findCategory(1L);
    return category.getType().toString();
  }

  //3. dto explain
  @GetMapping("/findUserDtoGetName")
  public UserDto userTest1(){
    User user = sampleUserService.find(1L);
    UserDto userDto = new UserDto(user.getName());
    log.info("userDto.getName : ", userDto.getName());
    return userDto;
  }

  @AllArgsConstructor
  @NoArgsConstructor
  @Data
  static class UserDto{
    String name;
  }

  //4.1 fetchJoin wrong version1
  @GetMapping("/findUserWriteItemV1")
  public List<Item> listV1(){

    String userName = "웅렬";
    User findUser = sampleUserService.findNamedUser(userName);
    List<Item> findItemList = sampleItemService.findItemList(findUser.getUserIdx());
    return findItemList;
  }

  //4.2 fetchJoin wrong version2
  @GetMapping("/findUserWriteItemV2")
  public List<Item> listV2(){
    String userName = "웅렬";
    List <Item> findItem = sampleUserService.findNamedUserItemList(userName);
    return findItem;
  }
}
