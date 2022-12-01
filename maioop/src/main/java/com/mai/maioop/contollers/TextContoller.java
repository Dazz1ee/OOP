package com.mai.maioop.contollers;

import com.mai.maioop.entity.Posts;
import com.mai.maioop.entity.User;
import com.mai.maioop.model.GenerationModel;
import com.mai.maioop.model.ResponseModel;
import com.mai.maioop.security.UserDetailsImp;
import com.mai.maioop.services.PostService;
import com.mai.maioop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Optional;


@RestController
public class TextContoller {

    @Value("${model_url}")
    private String adress;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @GetMapping("/getLast")
    public ResponseEntity<?> getLast(Authentication authentication){
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        Optional<Posts> optionalPosts = postService.findById(userDetailsImp.getId());
        ArrayList<String> respose = new ArrayList<>();
        if(optionalPosts.isEmpty()){
            return ResponseEntity.ok().body(respose);
        } else {
            Posts posts = optionalPosts.get();
            if (posts.getText1() != null) respose.add(posts.getText1());
            if (posts.getText2() != null) respose.add(posts.getText2());
            if (posts.getText3() != null) respose.add(posts.getText3());
            if (posts.getText4() != null) respose.add(posts.getText4());
            if (posts.getText5() != null) respose.add(posts.getText5());

            return ResponseEntity.ok().body(respose);

        }
    }

    @Transactional
    @PostMapping("/generation")
    public ResponseEntity<?> generate(@RequestBody GenerationModel model, Authentication authentication) throws URISyntaxException {
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        System.out.println(userDetailsImp.getEmail() + " " + model.getText() + model.getAuthor());
        model.setText(model.getText().trim());
        WebClient client = WebClient.create();
        String[] response= client.post()
                .uri(new URI(adress + "/ggg"))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body( Mono.just(model),GenerationModel.class)
                .accept(MediaType.APPLICATION_JSON)
                .acceptCharset(StandardCharsets.UTF_8)
                .retrieve().bodyToMono(String[].class).block();
        HashMap<String, String> ans = new HashMap<>();
//        int i = 1;
//        for(String text : response){
//            ans.put("text" + i, text.replace(model.author() + " : ", ""));
//            ++i;
//        }
        for (int j = 0; j < response.length; j++) {
            response[j] =  response[j].replace(model.getAuthor() + " : ", "");
        }
        Optional<Posts> optionalPosts = postService.findById(userDetailsImp.getId());
        if(optionalPosts.isEmpty()) {
            Posts post = new Posts();
            post.setPosts(response);
            User user = userService.findUserById(userDetailsImp.getId());
            post.setUser(user);
            postService.savePost(post);
        } else {
            optionalPosts.get().setPosts(response);
        }

        return ResponseEntity.ok().body(response);
    }
    /* другой вариант запроса на сервер.
            try {
            URL url = new URL(adress);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setInstanceFollowRedirects(false);
            con.setDoOutput(true);
            String jsonInputString = "{\"text\": \"" + model.text() + "\", \"author\": \"" + model.author() + "\"}";
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                System.out.println(response.toString());
                return ResponseEntity.ok().body(response.toString());
            }
        } catch (IOException e){
            e.printStackTrace();
        }
        return ResponseEntity.internalServerError().build();
      */
}
