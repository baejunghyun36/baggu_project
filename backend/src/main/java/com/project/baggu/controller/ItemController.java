package com.project.baggu.controller;

import com.project.baggu.domain.User;
import com.project.baggu.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ItemController {

  private final ItemService itemService;


}
