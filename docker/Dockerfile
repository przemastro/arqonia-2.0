FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=/jar/arqonia-2.0-*.jar
ARG ENCRYPT_KEY_FILE=/spring-encrypt-key/encrypt_key.txt
COPY ${JAR_FILE} app.jar
COPY ${ENCRYPT_KEY_FILE} key.txt
ENTRYPOINT ENCRYPT_KEY=`cat key.txt` java -Dspring.profiles.active=dev -Djava.security.egd=file:/dev/./urandom -jar /app.jar
