package com.example.reto5_final.service;

import com.example.reto5_final.entities.DTOs.CountClient;
import com.example.reto5_final.entities.DTOs.CountStatus;
import com.example.reto5_final.entities.Reservation;
import com.example.reto5_final.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getCar(int id) {return reservationRepository.getReservation(id); }

    public Reservation save(Reservation c){
        if(c.getIdReservation()==null){
            return reservationRepository.save(c);
        }else{
            Optional<Reservation> e= reservationRepository.getReservation(c.getIdReservation());
            if (e.isPresent()){
                return c;
            }else{
                return reservationRepository.save(c);
            }
        }
    }

    public Reservation update(Reservation c){
        if(c.getIdReservation()!=null){
            Optional<Reservation> q= reservationRepository.getReservation(c.getIdReservation());
            if (q.isPresent()){
                if(c.getStartDate()!=null){
                    q.get().setStartDate(c.getStartDate());
                }
                if(c.getDevolutionDate()!=null){
                    q.get().setDevolutionDate(c.getDevolutionDate());
                }
                if(c.getStatus()!=null){
                    q.get().setStatus(c.getStatus());
                }
                if(c.getClient()!=null){
                    q.get().setClient(c.getClient());
                }
                if(c.getCar()!=null){
                    q.get().setCar(c.getCar());
                }
                if(c.getScore()!=null){
                    q.get().setScore(c.getScore());
                }
                reservationRepository.save(q.get());
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
        Optional<Reservation> c= reservationRepository.getReservation(id);
        if(c.isPresent()){
            reservationRepository.delete(c.get());
            flag=true;
        }
        return flag;
    }

    public List<CountClient> getClientesCaletos(){
        return reservationRepository.getClientesCaletos();
    }

    public List<Reservation> getReservationsBetweenDates(String dateA, String dateB){
        SimpleDateFormat parser= new SimpleDateFormat( "yyy-MM-dd");
        Date a = new Date();
        Date b = new Date();
        try{
            a= parser.parse(dateA);
            b= parser.parse(dateB);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (a.before(b)){
            return reservationRepository.getReservationsBetweenDates(a, b);
        }else{
            return new ArrayList<>();
        }
    }

    public CountStatus getReservationsStatus(){
        List<Reservation> reservasCompletadas = reservationRepository.getReservationByStatus("completed");
        List<Reservation> reservasCanceladas = reservationRepository.getReservationByStatus("cancelled");

        return new CountStatus((long) reservasCompletadas.size(), (long) reservasCanceladas.size());
    }
}
