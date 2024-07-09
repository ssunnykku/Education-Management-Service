package com.kosta.ems.studentPoint;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.kosta.ems.studentPoint.dto.PointCategoryDTO;
import com.kosta.ems.studentPoint.dto.PointHistoryDTO;
import com.kosta.ems.studentPoint.dto.StudentCourseWithPointDTO;

@SpringBootTest
public class StudentPointServiceTest {
	@Autowired
	StudentPointService service;
	
	@Test
	@Transactional
	public void getStudentListWithPointTest() {
		StudentCourseWithPointDTO dto = service.getStudentListWithPoint(277, "손",1,5, "가산").get(0);
		assertThat(dto.getName()).isEqualTo("손유철");
	}
	
	@Test
	@Transactional
	public void getTotal() {
		assertThat(service.getCountOfStudentWithPoint(277, null, "가산")).isEqualTo(18);
	}
	
	@Test
	@Transactional
	public void getPointHistory() {
		List<PointHistoryDTO> history = service.getPointHistory(1, "가산");
		assertThat(history.size()).isEqualTo(34);
	}
	
	@Test
	@Transactional
	public void getPointCategoryList() {
		List<PointCategoryDTO> category = service.getPointCategoryList();
		assertThat(category.size()).isEqualTo(10);
	}
	@Test
	@Transactional
	public void insertStudentPoint() {
		boolean result = service.insertStudentPoint(2, "d893c29b-2f8f-11ef-b0b2-0206f94be675", 1, "가산");
		assertThat(result).isTrue();
	}
	

}
