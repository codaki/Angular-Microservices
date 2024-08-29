package com.espe.msvc.cursos.clients;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AuthService {

    private static final String AUTH_URL = "http://keycloak_web:8080/realms/estudiantes-cursos/protocol/openid-connect/token";
    private static final String CLIENT_ID = "backend";
    private static final String USERNAME = "admin2";
    private static final String PASSWORD = "admin2";
    private static final String GRANT_TYPE = "password";

    public String getAccessToken() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", CLIENT_ID);
        body.add("username", USERNAME);
        body.add("password", PASSWORD);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(AUTH_URL, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                return (String) responseBody.get("access_token");
            }
        }
        throw new RuntimeException("Failed to get access token");
    }
}

