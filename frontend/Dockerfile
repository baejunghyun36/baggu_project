# node 18 버전을 사용한다.
FROM node:18 as builder

# 작업 디렉토리를 /usr/src/app으로 설정.
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# 환경 변수 PATH를 설정한다.
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# package.json, package-lock.json을 복사한다.
COPY package*.json ./

# 의존성 인스톨.
RUN npm install --silent

# 나머지 파일을 복사한다.
COPY . .

RUN sed -i 's/http:\/\/70.12.247.158:9999/https:\/\/baggu.shop\/api/g' /usr/src/app/src/api/config.js

# npm Build
RUN npm run build

# nginx를 서버로 설정
FROM nginx:stable-alpine

# 컨테이너의 작업 디렉토리를 /app으로 변경
WORKDIR /app

# 컨테이너에 build 폴더 복사
RUN mkdir build
COPY --from=builder /usr/src/app/build ./build

# nginx의 설정을 개인 설정으로 변경
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

# 포트 번호 명시
EXPOSE 3000

# 서버 가동
CMD ["nginx", "-g", "daemon off;"]