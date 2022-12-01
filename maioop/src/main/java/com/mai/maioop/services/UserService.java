package com.mai.maioop.services;

import com.mai.maioop.entity.User;
import com.mai.maioop.repositories.RoleRepository;
import com.mai.maioop.repositories.UserRepository;
import com.mai.maioop.security.UserDetailsImp;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Data
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;


    public boolean isUserExists(String email){
        return userRepository.findByEmailIgnoreCase(email).isPresent();
    }
    @Transactional
    public void saveUser(User user){
        userRepository.save(user);
    }

    @Transactional
    public User findUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userFound = userRepository.findByEmailIgnoreCase(email);
        if(userFound.isEmpty()){
            throw new UsernameNotFoundException(email + " not found");
        }
        return UserDetailsImp.build(userFound.get());
    }
}
