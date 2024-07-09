package com.kosta.ems.studentPoint;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.kosta.ems.student.StudentService;
import com.kosta.ems.studentPoint.dto.PointCategoryDTO;
import com.kosta.ems.studentPoint.dto.PointHistoryDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/points")
@RequiredArgsConstructor
@Slf4j
public class StudentPointController {
    private final StudentPointService studentPointService;

    @GetMapping("/category-list")
    public Map<String, List<PointCategoryDTO>> pointCategoryList() {
        return Map.of("data", studentPointService.getPointCategoryList());
    }

    @GetMapping("student-list")
    public Map studentListWithPoints(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "courseNumber", defaultValue = "0") int courseNumber,
            String studentName,
            @RequestParam(value = "excludeExpired", defaultValue = "true") boolean excludeExpired,
            HttpServletRequest request) {
        return Map.of("result", studentPointService.getStudentListWithPoint(courseNumber, studentName, page, pageSize, studentName));
    }

    @GetMapping("/student")
    public Map<String, List<PointHistoryDTO>> getPointHistoryByStudent(int studentCourseSeq, HttpServletRequest request) {
        List<PointHistoryDTO> histories = studentPointService.getPointHistory(studentCourseSeq, getAcademyOfLoginUser(request));
        return Map.of("data", histories);
    }

    //일단 포인트를 하나씩 등록하도록 하고 차후 등록할 포인트들을 한번에 받기로 바꾸자.
    @PostMapping("/student")
    public Map<String, Boolean> addPointToStudent(@RequestBody Map<String, Integer> dto, HttpServletRequest request) {
        boolean result = studentPointService.insertStudentPoint(dto.get("pointSeq"), getManagerIdOfLoginUser(request), dto.get("studentCourseSeq"), getAcademyOfLoginUser(request));
        return Map.of("data", result);
    }

    private String getAcademyOfLoginUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return "가산";
    }

    private String getManagerIdOfLoginUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return "d893bf71-2f8f-11ef-b0b2-0206f94be675";
    }
}
