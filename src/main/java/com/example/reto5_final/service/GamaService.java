package com.example.reto5_final.service;

import com.example.reto5_final.entities.Gama;
import com.example.reto5_final.repository.GamaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamaService {

    @Autowired
    private GamaRepository gamaRepository;

    public List<Gama> getAll(){
        return gamaRepository.getAll();
    }

    public Optional<Gama> getCar(int id) {return gamaRepository.getGama(id); }

    public Gama save(Gama c){
        if(c.getIdGama()==null){
            return gamaRepository.save(c);
        }else{
            Optional<Gama> e=gamaRepository.getGama(c.getIdGama());
            if (e.isPresent()){
                return c;
            }else{
                return gamaRepository.save(c);
            }
        }
    }

    public Gama update(Gama c){
        if(c.getIdGama()!=null){
            Optional<Gama> q=gamaRepository.getGama(c.getIdGama());
            if (q.isPresent()){
                if(c.getName()!=null){
                    q.get().setName(c.getName());
                }
                if(c.getDescription()!=null){
                    q.get().setDescription(c.getDescription());
                }
                gamaRepository.save(q.get());
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
        Optional<Gama> c=gamaRepository.getGama(id);
        if(c.isPresent()){
            gamaRepository.delete(c.get());
            flag=true;
        }
        return flag;
    }
}
