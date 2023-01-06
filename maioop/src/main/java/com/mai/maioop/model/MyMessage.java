package com.mai.maioop.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MyMessage implements Serializable {
    @JsonProperty
    private Long userId;
    @JsonProperty
    private String count;
    @JsonProperty
    private List<String> texts;

    @Override
    public String toString() {
        return "MyMessage{" +
                "userId=" + userId +
                ", count=" + count +
                ", texts=" + texts +
                ", author='" + author + '\'' +
                '}';
    }

    @JsonProperty
    private String author;

}
