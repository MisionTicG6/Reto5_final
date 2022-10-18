package com.example.reto5_final.repository.crudRepository;

import com.example.reto5_final.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
