# openjdk:11-jdk-slim 을 이미지로 사용한다.
FROM openjdk:11-jdk-slim AS builder

# 작업 디렉토리를 /app으로 설정한다.
WORKDIR /app

# 모든 소스코드 (현재 폴더에 있는 소스코드) 를 작업 디렉토리에 복사한다.
COPY . .

# gradlew을 사용하여 build한다.
RUN chmod +x gradlew
RUN ./gradlew clean build

# 빌드가 완료된 jar파일을 작업 디렉토리의 root로 가져온다.
FROM openjdk:11-jdk-slim

COPY --from=builder /app/build/libs/*.jar app.jar

# 9999 포트를 사용
EXPOSE 9998

# java -jar app.jar을 이용해서 빌드한 파일을 실행한다.
CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]
