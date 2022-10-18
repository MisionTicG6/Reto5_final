package com.example.reto5_final.repository;

import com.example.reto5_final.entities.Car;
import com.example.reto5_final.repository.crudRepository.CarCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CarRepository {

    @Autowired
    private CarCrudRepository carCrudRepository;

    public List<Car> getAll(){
        return (List<Car>) carCrudRepository.findAll();
    }

    public Optional<Car> getCar(int id){
        return carCrudRepository.findById(id);
    }

    public Car save(Car c){
        return carCrudRepository.save(c);
    }

    public void delete(Car c){
        carCrudRepository.delete(c);
    }
}
