package com.mai.maioop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;

@Data
@AllArgsConstructor
public class GenerationModel{
    private String author;
    private String text;
    private String count;
}
