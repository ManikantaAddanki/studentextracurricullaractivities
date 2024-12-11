package com.atlas.circular.repository;

import com.atlas.circular.service.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface userdb  extends JpaRepository<user,String> {
    user findByUsernameAndPassword(String username, String password);
    Collection<? extends user> findByEmail(String email);
}
