package com.mai.maioop.contollers;

import com.mai.maioop.entity.Role;
import com.mai.maioop.entity.User;
import com.mai.maioop.model.LoginModel;
import com.mai.maioop.model.LoginResponse;
import com.mai.maioop.model.SignUpModel;
import com.mai.maioop.security.JWTUtils;
import com.mai.maioop.security.UserDetailsImp;
import com.mai.maioop.services.RoleService;
import com.mai.maioop.services.UserService;
import lombok.AllArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

@RestController
@AllArgsConstructor
public class AuthController {
    private UserService userService;
    private JWTUtils jwtUtils;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;

    private RoleService roleService;


    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginModel loginModel){
        System.out.println(loginModel.email()+ " " + loginModel.password());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginModel.email(), loginModel.password());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        ResponseCookie jwt = jwtUtils.generateJWTCookie(userDetailsImp);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, String.valueOf(jwt))
                .body(new LoginResponse(userDetailsImp.getEmail(), userDetailsImp.getUsername(),
                        userDetailsImp.getAvatar()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpModel sign) throws RoleNotFoundException {
        if(userService.isUserExists(sign.email())){
            return ResponseEntity.status(409).build();
        }
        String passwordEncode = passwordEncoder.encode(sign.password());
        User user = new User();
        user.setEmail(sign.email());
        user.setPassword(passwordEncode);
        user.setUsername(sign.name());
        Role role = roleService.getRoleByName("ROLE_USER");
        user.setRoles(List.of(role));
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/signout")
    public ResponseEntity<?> signout() {
        ResponseCookie jwt = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwt.toString()).build();
    }

}
