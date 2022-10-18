package com.example.reto5_final.repository;

import com.example.reto5_final.entities.Client;
import com.example.reto5_final.entities.DTOs.CountClient;
import com.example.reto5_final.entities.Reservation;
import com.example.reto5_final.repository.crudRepository.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation c){ return reservationCrudRepository.save(c); }

    public void delete(Reservation c){
        reservationCrudRepository.delete(c);
    }

    public List<CountClient> getClientesCaletos(){
        List<CountClient> respuesta = new ArrayList<>();
        List<Object[]> reporte = reservationCrudRepository.countTotalReservationsByClient();
        for (int i=0;i< reporte.size();i++){
            respuesta.add(new CountClient((long) reporte.get(i)[1],(Client) reporte.get(i)[0]));
        }
        return respuesta;
    }

    public List<Reservation> getReservationsBetweenDates(Date a, Date b){
        return reservationCrudRepository.findAllByStartDateAfterAndDevolutionDateBefore(a,b);
    }

    public List<Reservation> getReservationByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }

}
