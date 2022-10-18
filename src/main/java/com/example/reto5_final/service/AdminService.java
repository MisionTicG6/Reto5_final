package com.example.reto5_final.service;

import com.example.reto5_final.entities.Admin;
import com.example.reto5_final.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }

    public Optional<Admin> getCar(int id) {return adminRepository.getAdmin(id); }

    public Admin save(Admin c){
        if(c.getIdAdmin()==null){
            return adminRepository.save(c);
        }else{
            Optional<Admin> e=adminRepository.getAdmin(c.getIdAdmin());
            if (e.isPresent()){
                return c;
            }else{
                return adminRepository.save(c);
            }
        }
    }

    public Admin update(Admin c){
        if(c.getIdAdmin()!=null){
            Optional<Admin> q=adminRepository.getAdmin(c.getIdAdmin());
            if (q.isPresent()){
                if(c.getName()!=null){
                    q.get().setName(c.getName());
                }
                if(c.getEmail()!=null){
                    q.get().setEmail(c.getEmail());
                }
                if(c.getPassword()!=null){
                    q.get().setPassword(c.getPassword());
                }
                adminRepository.save(q.get());
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
        Optional<Admin> c=adminRepository.getAdmin(id);
        if(c.isPresent()){
            adminRepository.delete(c.get());
            flag=true;
        }
        return flag;
    }
}
