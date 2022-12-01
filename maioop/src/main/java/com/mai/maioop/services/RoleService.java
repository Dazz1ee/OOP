package com.mai.maioop.services;

import com.mai.maioop.entity.Role;
import com.mai.maioop.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role getRoleByName(String role) throws RoleNotFoundException {
        Optional<Role> optionalRole = roleRepository.findRoleByRole(role);
        if (optionalRole.isEmpty()) {
            throw new RoleNotFoundException();
        }
        return optionalRole.get();
    }
}
