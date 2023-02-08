insert into baggu.user (created_at, dong, email, gu, info, is_valid, kakao_id, lat, lng, modified_at, name, nickname, phone, profile_img, role, si, trade_count, visited_at)
values  ('2023-02-01 15:11:54.268038', '논현동', 'test1@test.com', '강남구', 'hello I''m test1', false, 'kakao1', '37.5128064', '127.0284288', '2023-02-06 13:03:39.000251', 'test1', 'nickname1', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울', 0, '2023-02-06 13:03:39.000251'),
        ('2023-02-01 15:11:54.341040', '역삼동', 'test2@test.com', '강남구', 'hello I''m test2', false, 'kakao2', '126.9784', '37.5666', '2023-02-01 15:11:54.341040', 'test2', 'nickname2', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.341040'),
        ('2023-02-01 15:11:54.343039', '역삼동', 'test3@test.com', '강남구', 'hello I''m test3', false, 'kakao3', '126.9784', '37.5666', '2023-02-01 15:11:54.343039', 'test3', 'nickname3', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.343039'),
        ('2023-02-01 15:11:54.347041', '역삼동', 'test4@test.com', '강남구', 'hello I''m test4', false, 'kakao4', '126.9784', '37.5666', '2023-02-01 15:11:54.347041', 'test4', 'nickname4', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.347041'),
        ('2023-02-01 15:11:54.349079', '역삼동', 'test5@test.com', '강남구', 'hello I''m test5', false, 'kakao5', '126.9784', '37.5666', '2023-02-01 15:11:54.349079', 'test5', 'nickname5', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.349079'),
        ('2023-02-01 15:11:54.351041', '역삼동', 'test6@test.com', '강남구', 'hello I''m test6', false, 'kakao6', '126.9784', '37.5666', '2023-02-01 15:11:54.351041', 'test6', 'nickname6', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.351041'),
        ('2023-02-01 15:11:54.354041', '역삼동', 'test7@test.com', '강남구', 'hello I''m test7', false, 'kakao7', '126.9784', '37.5666', '2023-02-01 15:11:54.354041', 'test7', 'nickname7', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.354041'),
        ('2023-02-01 15:11:54.357073', '역삼동', 'test8@test.com', '강남구', 'hello I''m test8', false, 'kakao8', '126.9784', '37.5666', '2023-02-01 15:11:54.357073', 'test8', 'nickname8', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.357073'),
        ('2023-02-01 15:11:54.359041', '역삼동', 'test9@test.com', '강남구', 'hello I''m test9', false, 'kakao9', '126.9784', '37.5666', '2023-02-01 15:11:54.359041', 'test9', 'nickname9', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.359041'),
        ('2023-02-01 15:11:54.361041', '역삼동', 'test10@test.com', '강남구', 'hello I''m test10', false, 'kakao10', '126.9784', '37.5666', '2023-02-01 15:11:54.361041', 'test10', 'nickname10', null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 1, '서울시', 0, '2023-02-01 15:11:54.361041');

insert into baggu.item (created_at, category, content, dong, first_img, gu, is_valid, modified_at, si, state, title, trade_item_idx, user_request_count, view_count, user, version)
values  ('2023-02-01 15:12:17.717928', 10, '물건11', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.717928', '서울시', 1, '2번 교환구해요', null, 0, 0, 1, null),
        ('2023-02-01 15:12:17.774295', 13, '물건12', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.774295', '서울시', 2, '3번 교환구해요', null, 0, 0, 1, null),
        ('2023-02-01 15:12:17.776545', 1, '물건13', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.776545', '서울시', 0, '4번 교환구해요', null, 0, 0, 1, null),
        ('2023-02-01 15:12:17.780925', 12, '물건21', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.780925', '서울시', 0, '3번 교환구해요', null, 0, 0, 2, null),
        ('2023-02-01 15:12:17.783925', 9, '물건22', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.783925', '서울시', 0, '4번 교환구해요', null, 0, 0, 2, null),
        ('2023-02-01 15:12:17.785925', 2, '물건23', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.785925', '서울시', 0, '5번 교환구해요', null, 0, 0, 2, null),
        ('2023-02-01 15:12:17.789924', 13, '물건31', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.789924', '서울시', 0, '4번 교환구해요', null, 0, 0, 3, null),
        ('2023-02-01 15:12:17.791924', 4, '물건32', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.791924', '서울시', 0, '5번 교환구해요', null, 0, 0, 3, null),
        ('2023-02-01 15:12:17.794928', 10, '물건33', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.794928', '서울시', 0, '6번 교환구해요', null, 0, 0, 3, null),
        ('2023-02-01 15:12:17.800927', 5, '물건41', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.800927', '서울시', 0, '5번 교환구해요', null, 0, 0, 4, null),
        ('2023-02-01 15:12:17.803925', 7, '물건42', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.803925', '서울시', 0, '6번 교환구해요', null, 0, 0, 4, null),
        ('2023-02-01 15:12:17.806927', 12, '물건43', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.806927', '서울시', 0, '7번 교환구해요', null, 0, 0, 4, null),
        ('2023-02-01 15:12:17.811924', 2, '물건51', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.811924', '서울시', 0, '6번 교환구해요', null, 0, 0, 5, null),
        ('2023-02-01 15:12:17.813925', 6, '물건52', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.813925', '서울시', 0, '7번 교환구해요', null, 0, 0, 5, null),
        ('2023-02-01 15:12:17.816925', 13, '물건53', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.816925', '서울시', 0, '8번 교환구해요', null, 0, 0, 5, null),
        ('2023-02-01 15:12:17.821924', 8, '물건61', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.821924', '서울시', 0, '7번 교환구해요', null, 0, 0, 6, null),
        ('2023-02-01 15:12:17.824110', 13, '물건62', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.824110', '서울시', 0, '8번 교환구해요', null, 0, 0, 6, null),
        ('2023-02-01 15:12:17.825926', 2, '물건63', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.825926', '서울시', 0, '9번 교환구해요', null, 0, 0, 6, null),
        ('2023-02-01 15:12:17.829926', 13, '물건71', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.829926', '서울시', 0, '8번 교환구해요', null, 0, 0, 7, null),
        ('2023-02-01 15:12:17.831924', 1, '물건72', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.831924', '서울시', 0, '9번 교환구해요', null, 0, 0, 7, null),
        ('2023-02-01 15:12:17.833924', 12, '물건73', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.833924', '서울시', 0, '10번 교환구해요', null, 0, 0, 7, null),
        ('2023-02-01 15:12:17.837924', 7, '물건81', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.837924', '서울시', 0, '9번 교환구해요', null, 0, 0, 8, null),
        ('2023-02-01 15:12:17.840926', 4, '물건82', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.840926', '서울시', 0, '10번 교환구해요', null, 0, 0, 8, null),
        ('2023-02-01 15:12:17.842927', 4, '물건83', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.842927', '서울시', 0, '11번 교환구해요', null, 0, 0, 8, null),
        ('2023-02-01 15:12:17.847926', 10, '물건91', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.847926', '서울시', 0, '10번 교환구해요', null, 0, 0, 9, null),
        ('2023-02-01 15:12:17.849924', 6, '물건92', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.849924', '서울시', 0, '11번 교환구해요', null, 0, 0, 9, null),
        ('2023-02-01 15:12:17.851926', 13, '물건93', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.851926', '서울시', 0, '12번 교환구해요', null, 0, 0, 9, null),
        ('2023-02-01 15:12:17.856924', 7, '물건101', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.856924', '서울시', 0, '11번 교환구해요', null, 0, 0, 10, null),
        ('2023-02-01 15:12:17.858923', 3, '물건102', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.858923', '서울시', 0, '12번 교환구해요', null, 0, 0, 10, null),
        ('2023-02-01 15:12:17.860593', 4, '물건103', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-01 15:12:17.860593', '서울시', 0, '13번 교환구해요', null, 0, 0, 10, null),
        ('2023-02-02 13:13:33.389418', null, null, '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-02 13:13:37.688493', '서울시', 0, null, null, 0, 0, 1, null),
        ('2023-02-02 13:19:29.167941', null, null, '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-02 13:19:29.373451', '서울시', 0, null, null, 0, 0, 1, null),
        ('2023-02-02 16:09:52.594967', 1, 'content!
', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-02 16:10:26.654980', '서울시', 0, 'title!', null, 0, 0, 1, null),
        ('2023-02-02 16:17:34.842650', 1, 'content!
', '역삼동', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', '강남구', true, '2023-02-02 16:17:35.639539', '서울시', 0, 'title!', null, 0, 0, 1, null),
        (null, null, null, null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', null, null, null, null, null, null, null, null, null, null, null),
        (null, null, null, null, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', null, null, null, null, null, null, null, null, null, null, null),
        ('2023-02-07 11:14:08.460090', null, null, '논현동', 'https://d9f4zibn3mxwq.cloudfront.net/item/717a2203-0cb9-442d-8904-664af6d8dd16.png', '강남구', true, '2023-02-07 11:14:35.999606', '서울', 0, 'title11', null, 0, 0, 1, null);

insert into baggu.trade_request (created_at, comment, is_valid, modified_at, trade_request_state, item_idx, user_idx)
values  ('2023-02-01 15:11:54.354041', 'gogo', true, '2023-02-01 15:11:54.354041', 0, 1, 10);

insert into baggu.trade_detail ( created_at, is_valid, modified_at, request_item_idx, trade_state, trade_request_idx)
values  ('2023-02-01 15:11:54.354041', true, '2023-02-01 15:11:54.354041', 29, 0, 1);

insert into baggu.review_text ( created_at, comment, is_valid, receive_user_idx, item_idx, user_idx)
values  ('2023-02-01 15:11:54.354041', 'good', true, 1, 1, 10);

insert into baggu.trade_fin ( created_at, heart_count, is_valid, receive_item_idx, receive_nickname, receive_user_idx, request_item_idx, request_nickname, request_user_idx, receive_profile_img_url, request_profile_img_url)
values  ('2023-02-01 15:11:54.354041', 0, true, 1, 'test1', 1, 10, 'test10', 10, 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg', 'https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg');

