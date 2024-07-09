package com.kosta.ems.scholarship;

import com.kosta.ems.scholarship.dto.ScholarshipSettlementResultDTO;
import com.kosta.ems.scholarship.dto.ScholarshipTargetDTO;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.Collection;

@Mapper
public interface ScholarshipMapper {
    Collection<ScholarshipTargetDTO> selectScholarshipTargetList(String academyLocation, String name, String courseNumber, int limit, int offset);

    void insertScholarshipSettlementDate(int studentCourseSeq);

    Collection<ScholarshipSettlementResultDTO> selectScholarshipResultList(String courseNumber, String academyLocation, String name, LocalDate scholarshipDate, int limit, int offset);

    int countScholarshipTarget(String academyLocation, String name, String courseNumber);

    int countScholarshipResult(String courseNumber, String academyLocation, String name, LocalDate scholarshipDate);
}
