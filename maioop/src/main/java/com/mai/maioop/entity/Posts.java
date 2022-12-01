package com.mai.maioop.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
public class Posts {
    @Id
    private Long id;
    @Column(name="text1")
    private String text1;

    @Column(name="text2")
    private String text2;

    @Column(name="text3")
    private String text3;

    @Column(name="text4")
    private String text4;

    @Column(name="text5")
    private String text5;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id")
    @MapsId
    private User user;

    public void setPosts(String[] texts){
        text1 = null;
        text2 = null;
        text3 = null;
        text4 = null;
        text5 = null;

        for (int i = 0; i < texts.length; i++) {
            if(i == 0){
                text1 = texts[i];
            }
            if(i == 1){
                text2 = texts[i];
            }
            if(i == 2){
                text3 = texts[i];
            }
            if(i == 3){
                text4 = texts[i];
            }
            if(i == 4){
                text5 = texts[i];
            }
        }
    }
}
