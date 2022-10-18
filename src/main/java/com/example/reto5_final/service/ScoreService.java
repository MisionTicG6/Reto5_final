package com.example.reto5_final.service;

import com.example.reto5_final.entities.Score;
import com.example.reto5_final.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getBooking(int id) {return scoreRepository.getScore(id); }

    public Score save(Score c){
        if(c.getIdScore()==null){
            return scoreRepository.save(c);
        }else{
            Optional<Score> e= scoreRepository.getScore(c.getIdScore());
            if (e.isPresent()){
                return c;
            }else{
                return scoreRepository.save(c);
            }
        }
    }

    public Score update(Score c){
        if(c.getIdScore()!=null){
            Optional<Score> q= scoreRepository.getScore(c.getIdScore());
            if (q.isPresent()){
                if(c.getDescription()!=null){
                    q.get().setDescription(c.getDescription());
                }
                if(c.getPuntaje()!=null){
                    q.get().setPuntaje(c.getPuntaje());
                }
                scoreRepository.save(q.get());
                return q.get();
            }else{
                return c;
            }
        }else{
            return c;
        }
    }

    public boolean delete(int id){
        boolean flag=false;
        Optional<Score> c= scoreRepository.getScore(id);
        if(c.isPresent()){
            scoreRepository.delete(c.get());
            flag=true;
        }
        return flag;
    }
}
