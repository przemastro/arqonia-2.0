FROM openjdk:8-jdk-alpine
VOLUME /tmp

ARG JAR_FILE=/jar/arqonia-2.0-*.jar
ARG ENCRYPT_KEY_FILE=/spring-encrypt-key/encrypt_key.txt
ARG ENVIRONMENT=/environment/environment_name.txt

COPY ${JAR_FILE} app.jar
COPY ${ENCRYPT_KEY_FILE} key.txt
COPY ${ENVIRONMENT} environment.txt

ENTRYPOINT ENCRYPT_KEY=`cat key.txt` java -Dspring.profiles.active=`cat environment.txt` -Djava.security.egd=file:/dev/./urandom -jar /app.jar
