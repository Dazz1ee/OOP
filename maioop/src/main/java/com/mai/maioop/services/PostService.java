package com.mai.maioop.services;

import com.mai.maioop.entity.Posts;
import com.mai.maioop.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public void savePost(Posts posts){
        postRepository.save(posts);
    }
    public Optional<Posts> findById(Long id) {
        return postRepository.findById(id);
    }
}
