package com.espe.msvc.usuarios.clients;

import com.espe.msvc.usuarios.models.Curso;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@FeignClient(name = "msvc-cursos", url = "localhost:8002", configuration = FeignClientConfig.class)
public interface CursoClientRest {

    @GetMapping("/getCursos")
    List<Curso> getCursos();
}