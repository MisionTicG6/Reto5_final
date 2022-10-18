package com.example.reto5_final.repository.crudRepository;


import com.example.reto5_final.entities.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarCrudRepository extends CrudRepository<Car, Integer> {
}
