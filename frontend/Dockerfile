# node 18 버전을 사용한다.
FROM node:18

# 작업 디렉토리를 app으로 설정.
WORKDIR /frontend

# package.json, package-lock.json을 복사한다.
COPY package*.json ./

# 의존성 인스톨.
RUN npm install

# 나머지 파일을 복사한다.
COPY . .

# 3000번 포트를 사용한다.
EXPOSE 3000

# 프론트 어플리케이션을 시작한다.
CMD ["npm", "start"]