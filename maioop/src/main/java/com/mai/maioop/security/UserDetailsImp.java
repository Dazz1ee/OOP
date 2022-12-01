package com.mai.maioop.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mai.maioop.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
public class UserDetailsImp implements UserDetails {
    private Long id;
    private String username;
    private String email;
    private String avatar;
    private Collection<? extends GrantedAuthority> authorities;
    @JsonIgnore
    private String password;

    public static UserDetailsImp build(User user){
        return new UserDetailsImp(user.getId(), user.getUsername(), user.getEmail(),
                user.getAvatar(), user.getRoles().stream().map(role->new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList()),
                user.getPassword());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserDetailsImp that = (UserDetailsImp) o;

        if (!Objects.equals(id, that.id)) return false;
        if (!Objects.equals(username, that.username)) return false;
        if (!Objects.equals(email, that.email)) return false;
        if (!Objects.equals(avatar, that.avatar)) return false;
        if (!Objects.equals(authorities, that.authorities)) return false;
        return Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (avatar != null ? avatar.hashCode() : 0);
        result = 31 * result + (authorities != null ? authorities.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "UserDetailsImp{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", authorities=" + authorities +
                ", avatar='" + (avatar != null ? avatar.hashCode() : "") + '\'' +
                '}';
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail(){
        return email;
    }

    public Long getId(){
        return id;
    }

    public String getAvatar(){
        return avatar;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
