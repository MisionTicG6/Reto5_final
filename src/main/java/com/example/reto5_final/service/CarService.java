package com.example.reto5_final.service;


import com.example.reto5_final.entities.Car;
import com.example.reto5_final.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAll(){
        return carRepository.getAll();
    }

    public Optional<Car> getCar(int id) {return carRepository.getCar(id); }

    public Car save(Car c){
        if(c.getIdCar()==null){
            return carRepository.save(c);
        }else{
            Optional<Car> e=carRepository.getCar(c.getIdCar());
            if (e.isPresent()){
                return c;
            }else{
                return carRepository.save(c);
            }
        }
    }

    public Car update(Car c){
        if(c.getIdCar()!=null){
            Optional<Car> q=carRepository.getCar(c.getIdCar());
            if (q.isPresent()){
                if(c.getName()!=null){
                    q.get().setName(c.getName());
                }
                if(c.getBrand()!=null){
                    q.get().setBrand(c.getBrand());
                }
                if(c.getYear()!=null){
                    q.get().setYear(c.getYear());
                }
                if(c.getDescription()!=null){
                    q.get().setDescription(c.getDescription());
                }
                if(c.getGama()!=null){
                    q.get().setGama(c.getGama());
                }
                carRepository.save(q.get());
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
        Optional<Car> c=carRepository.getCar(id);
        if(c.isPresent()){
            carRepository.delete(c.get());
            flag=true;
        }
        return flag;
    }
}
