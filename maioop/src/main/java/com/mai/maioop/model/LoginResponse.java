package com.mai.maioop.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResponse {
    private String email;
    private String name;
    private String avatar;
}
