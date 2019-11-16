FROM java:8-jdk-alpine

COPY ./build/libs/api-0.1.jar /usr/app/
WORKDIR /usr/app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "api-0.1.jar"]