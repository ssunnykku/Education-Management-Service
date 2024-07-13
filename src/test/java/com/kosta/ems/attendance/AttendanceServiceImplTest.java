package com.kosta.ems.attendance;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class AttendanceServiceImplTest {

    @Autowired
    AttendanceService attendanceService;

    // [출결] - 수강생 출결 조회 목록 데이터 개수 (for 페이지네이션)
    // 경우1: 기수+수강생명 입력
    // @Test // 확인 완료
    void getAttendanceIntegratedListFilterAllAmount() {
        log.info(Integer.toString(attendanceService.getAttendanceIntegratedListFilterAllAmount("유", 277)));
    }
    // 경우2: 기수+수강생명 미입력 (전체 데이터)
    // @Test  // 확인 완료
    void getAttendanceIntegratedListNoFilterAmount() {
        log.info(Integer.toString(attendanceService.getAttendanceIntegratedListNoFilterAmount("none", -1)));
    }
    // 경우3: 기수 또는 수강생명 입력
    // @Test  // 확인 완료
    void getAttendanceIntegratedListFilterAmount() {
        log.info(Integer.toString(attendanceService.getAttendanceIntegratedListFilterAmount("김", -1)));
        log.info(Integer.toString(attendanceService.getAttendanceIntegratedListFilterAmount("none", 278)));
    }
    
    // [출결] - 수강생 출석 조회 목록 조회
    // 경우1: 기수+수강생명 입력
    // @Test
    void getAttendanceIntegratedListFilterAll() {
        log.info(attendanceService.getAttendanceIntegratedListFilterAll("선", 277,1,2).toString());
    }
    // 경우2: 기수+수강생명 미입력 (전체 데이터)
    // @Test
    void getAttendanceIntegratedListNoFilter() {
        log.info(attendanceService.getAttendanceIntegratedListNoFilter("none", -1, 2, 2).toString());
    }
    // 경우3: 기수 또는 수강생명 입력
    // @Test
    void getAttendanceIntegratedListFilter() {
        log.info(attendanceService.getAttendanceIntegratedListFilter("유", -1, 2, 2).toString());
    }

    
    // [출결] - 특정일의 수강생 출석 상태 목록 조회 (for 출결 입력/수정)
    // 경우1 _ 기수+수강생명 입력
    // 검색 결과 개수 가져오기 (for 페이지네이션)
    // @Test
    void selectCourseNumberAndStudentNameListAmount() {
        log.info(Integer.toString(attendanceService.getCourseNumberAndStudentNameListAmount("2024.06.21", "가산", "유", 277)));
    }
    // 검색 결과 데이터 목록 가져오기
    // @Test
    void selectCourseNumberAndStudentNameList() {
    	log.info(attendanceService.getCourseNumberAndStudentNameList("2024-06-21", "가산", "유", 277, 0, 2).toString());
    }
    
    // 경우2 _ 기수 또는 수강생명 입력
    // 검색 결과 개수 가져오기 (for 페이지네이션)
    // @Test
    void selectCourseNumberOrStudentNameListAmount() {
    	log.info(Integer.toString(attendanceService.getCourseNumberOrStudentNameListAmount("2024-06-21", "가산", "none", 277)));
    }
    // 검색 결과 데이터 목록 가져오기
    // @Test
    void selectCourseNumberOrStudentNameList() {
        log.info(attendanceService.getCourseNumberOrStudentNameList("2024-06-21", "가산", "none", 277, 1, 10).toString());
    }
    
    // 경우3 _ 기수+수강생명 미입력
    // 검색 결과 개수 가져오기 (for 페이지네이션)
    // @Test
    void selectDateAndLocationListAmount() {
    	log.info(Integer.toString(attendanceService.getDateAndLocationListAmount("2024-06-21", "가산", "none", -1)));
    }
    // 검색 결과 데이터 목록 가져오기
    // @Test
    void selectDateAndLocationList() {
    	log.info(attendanceService.getDateAndLocationList("2024-06-21", "가산", "none", -1, 0, 10).toString());
    }

    @Test
    void getAttendanceIntegratedList2() {
        log.info(attendanceService.getAttendanceIntegratedList("", 0, "가산", 1, 10).toString());
    }

    
    // [출결] - 선택한 수강생의 출석 상태 수정
 	@Test
     void updateStudentAttendance() {
        List<RequestStudentAttendanceDTO> list = new ArrayList<>();
        RequestStudentAttendanceDTO dto = RequestStudentAttendanceDTO.builder().attendanceDate("2024-06-23").studentId("3").name("양용용").attendanceStatus("외출").courseNumber(123).academyLocation("가산").studentCourseSeq(23).build();
        list.add(dto);
        attendanceService.updateStudentAttendance(list);
     }

    // [출결 입력]
    // 1. 특정일의 출결 상태가 등록되지 않은 수강생 목록 가져오기
    // @Test  // 확인 완료
    void getNoAttendanceStatusStudentList() {
        log.info(attendanceService.getNoAttendanceStatusStudentList("2024-06-21", "가산").toString());
        log.info(Integer.toString(attendanceService.getNoAttendanceStatusStudentList("2024-06-21", "가산").size()));
    }
    // 2. 목록의 학생 중 선택한 학생의 출결 상태 등록하기
    // @Test  // 확인 완료
    void setAttendanceStatus() {
        attendanceService.setAttendanceStatus("지각", "2024-06-21", 60);
    }
}