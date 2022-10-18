package com.example.reto5_final.repository.crudRepository;

import com.example.reto5_final.entities.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {

    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT (c.client) DESC ")
    public List<Object[]> countTotalReservationsByClient();

    // SELECT * FROM Reservations WHERE startDate AFTER dateone AND devolutionDate BEFORE datetwo;
    public  List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);

    // SELECT * FROM Reservation WHERE status=cadena;
    public List<Reservation> findAllByStatus(String status);

}
