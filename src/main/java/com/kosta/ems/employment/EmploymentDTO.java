package com.kosta.ems.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Setter
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="employments")
public class EmploymentDTO{
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "employment_seq", updatable = false)
    private int seq;
    
    @Column(name="employment_company", nullable = false)
    private String company;
    
    @Column(name="student_course_seq", nullable = false)
    private int sCSeq;
    
    @ColumnDefault("false")
    @Column(name="is_active", nullable = false)
    private boolean isActive;
    
    @Column(name="manager_id", nullable = false)
    private String managerId;
    
    
    
    
    
}
