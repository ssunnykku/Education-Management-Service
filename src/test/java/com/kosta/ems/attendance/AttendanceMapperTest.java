package com.kosta.ems.attendance;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@SpringBootTest
class AttendanceMapperTest {

    @Autowired
    private AttendanceMapper attendanceMapper;

    /*
    // [출결] - 수강생 출석 조회 목록 데이터 개수 (for 페이지네이션)
    // @Test
    public void selectStudentAttendanceListAmount() {
    	log.info(attendanceMapper.selectAttendanceIntegratedListFilterAllAmount("유", 277).toString());
    }
    // 경우3_ 기수, 수강생명 미입력 (전체 데이터)
    // @Test
    public void selectAttendanceIntegratedListNoFilterAmount() {
        log.info(Integer.toString(attendanceMapper.selectAttendanceIntegratedListNoFilterAmount("none", -1).size()));
    }
    
    // [출결] - 수강생 출석 조회 목록 조회
    // 경우1_ 기수+수강생명 입력
    // @Test
    public void selectAttendanceIntegratedListFilterAll() {
    	log.info(attendanceMapper.selectAttendanceIntegratedListFilterAll("유", 277, 0, 10).toString());
    }
    // 경우2_ 기수 또는 수강생명 입력
    // @Test
    public void selectAttendanceIntegratedListFilter() {
        log.info(Integer.toString(attendanceMapper.selectAttendanceIntegratedListFilter("none", 277, 0, 10).size()));
        log.info(attendanceMapper.selectAttendanceIntegratedListFilter("none", 277, 0, 10).toString());
    }
    // 경우3_ 기수, 수강생명 미입력 (전체 데이터)
    // @Test
    public void selectAttendanceIntegratedListNoFilter() {
        log.info(attendanceMapper.selectAttendanceIntegratedListNoFilter("none", -1, 0, 10).toString());
    }

    
    // [출결] - 특정일의 수강생 출석 상태 목록 조회 (for 출결 입력/수정)
    // 경우1 _ 기수+수강생명 입력
    // 검색 결과 개수 가져오기 (for 페이지네이션)
    // @Test  // 패스
    public void selectCourseNumberAndStudentNameListAmount() {
    	log.info(Integer.toString(attendanceMapper.selectCourseNumberAndStudentNameListAmount(LocalDate.parse("2024-06-21"), "가산", "유", 277)));
    }
    // 검색 결과 데이터 목록 가져오기
    // @Test
    public void selectCourseNumberAndStudentNameList() {
    	log.info(attendanceMapper.selectCourseNumberAndStudentNameList(LocalDate.of(2024, 6, 21), "가산", "유", 277, 0, 2).toString());
    }
    
    // 경우2 _ 기수 또는 수강생명 입력
    // 검색 결과 개수 가져오기 (for 페이지네이션)
    // @Test
    public void selectCourseNumberOrStudentNameListAmount() {
    	log.info(Integer.toString(attendanceMapper.selectCourseNumberOrStudentNameListAmount(LocalDate.parse("2024-06-21"), "가산", "철", -1)));
    }
    // 검색 결과 데이터 목록 가져오기
    // @Test
    public void selectCourseNumberOrStudentNameList() {
    	log.info(attendanceMapper.selectCourseNumberOrStudentNameList(LocalDate.of(2024, 6, 21), "가산", "철", -1, 0, 2).toString());
    }
    
    // 경우3 _ 기수+수강생명 미입력
    // 검색 결과 개수 가져오기 (for 페이지네이션)
    // @Test
    public void selectDateAndLocationListAmount() {
    	log.info(Integer.toString(attendanceMapper.selectDateAndLocationListAmount(LocalDate.of(2024, 6, 21), "가산", "none", -1)));
    }
    // 검색 결과 데이터 목록 가져오기
    // @Test
    public void selectDateAndLocationList() {
    	log.info(attendanceMapper.selectDateAndLocationList(LocalDate.of(2024, 6, 21), "가산", "none", -1, 2, 2).toString());
    }
    */

    @Test
    @DisplayName("출결 조회 - 검색결과 cnt 테스트")
    public void selectAttendanceIntegratedListAmount() {
        log.info(Integer.toString(attendanceMapper.selectAttendanceIntegratedListAmount("", 0, "가산").size()));
    }
    @Test
    @DisplayName("출결 조회 - 검색결과 목록 테스트")
    public void selectAttendanceIntegeratedList() {
        log.info(attendanceMapper.selectAttendanceIntegratedList("", 0, "가산", 0, 10).toString());
        log.info(attendanceMapper.selectAttendanceIntegratedList("", 0, "가산", 10, 10).toString());
    }

    @Test
    @DisplayName("출결 입력 - 날짜별 입력된 출결 검색결과 cnt 테스트")
    public void selectAttendanceStatusListAmount() {
        log.info(Integer.toString(attendanceMapper.selectAttendanceStatusListAmount(LocalDate.of(2024,7,15), "가산", "", 0)));
    }

    @Test
    @DisplayName("출결 입력 - 날짜별 입력된 출결 검색결과 목록 테스트")
    public void selectAttendanceStatusList() {
        log.info("날짜+특정 강의장의 전체 출결 상태: " + attendanceMapper.selectAttendanceStatusList(LocalDate.of(2024,7,15), "가산", "", 0, 0, 10).toString());
        log.info("날짜+특정 학생의 출결 상태: " + attendanceMapper.selectAttendanceStatusList(LocalDate.of(2024,7,15), "가산", "선재", 0, 0, 10).toString());
    }
    
    
    // [출결] - 선택한 수강생의 출석 상태 수정
    @Test
    @DisplayName("출결 수정 - 선택한 수강생의 출석 상태 수정")
    @Transactional
    void updateStudentAttendance() {
        UpdateStudentAttendanceStatusDTO dto = UpdateStudentAttendanceStatusDTO.builder().attendanceStatus("조퇴").attendanceDate(LocalDate.of(2024,6,20)).studentCourseSeq(34).build();
    	attendanceMapper.updateStudentAttendance(dto);
    }

    // [출결 등록]
    // 1. 특정일의 출결 상태가 등록되지 않은 수강생 목록 가져오기
    @Test  // 확인 완료
    @DisplayName("출결 등록 - 특정일의 출결 상태가 등록되지 않은 수강생 목록 가져오기")
    void selectNoAttendanceStatusStudentList() {
        log.info(attendanceMapper.selectNoAttendanceStatusStudentList(LocalDate.of(2024,6,21), "가산").toString());
        log.info(Integer.toString(attendanceMapper.selectNoAttendanceStatusStudentList(LocalDate.of(2024,6,21), "가산").size()));
    }
    // 2. 목록의 학생 중 선택한 학생의 출결 상태 등록하기
    @Test  // 확인 완료  *0715
    @DisplayName("출결 등록 - 선택 학생의 출결 상태 등록")
    @Transactional
    void insertAttendanceStatus() {
        UpdateStudentAttendanceStatusDTO dto = UpdateStudentAttendanceStatusDTO.builder().attendanceStatus("출석").attendanceDate(LocalDate.of(2024,6,20)).studentCourseSeq(34).managerId("3ddf8577-3eaf-11ef-bd30-0206f94be675").build();
        attendanceMapper.insertAttendanceStatus(dto);
    }
}



