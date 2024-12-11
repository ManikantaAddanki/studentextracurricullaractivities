package com.atlas.circular.repository;


import com.atlas.circular.service.clubs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface clubdb extends JpaRepository<clubs, String> {

}
