package com.kosta.ems.attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AttendanceTimeRepo extends JpaRepository<AttendanceTimeDTO, AttendanceTimeId>{
}
