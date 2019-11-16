FROM java:8-jdk-alpine

COPY ./out/ /usr/app/
WORKDIR /usr/app
EXPOSE 80
ENTRYPOINT ["java", "-jar", "api-0.1.jar"]