package com.example.reto5_final.repository;

import com.example.reto5_final.entities.Gama;
import com.example.reto5_final.repository.crudRepository.GamaCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class GamaRepository {

    @Autowired
    private GamaCrudRepository gamaCrudRepository;

    public List<Gama> getAll(){
        return (List<Gama>) gamaCrudRepository.findAll();
    }

    public Optional<Gama> getGama(int id){
        return gamaCrudRepository.findById(id);
    }

    public Gama save(Gama c){
        return gamaCrudRepository.save(c);
    }

    public void delete(Gama c){
        gamaCrudRepository.delete(c);
    }
}
