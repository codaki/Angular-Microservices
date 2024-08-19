FROM openjdk:22-jdk
VOLUME /tmp
COPY target/msvc-usuarios-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]