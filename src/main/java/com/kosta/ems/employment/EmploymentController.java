package com.kosta.ems.employment;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosta.ems.course.CourseService;
import com.kosta.ems.employment.dto.EditEmployeedStatusRequest;
import com.kosta.ems.manager.ManagerDTO;
import com.kosta.ems.manager.ManagerService;
import com.kosta.ems.studentCourse.StudentCourseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.lang.ProcessHandle.Info;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/employments")
@RequiredArgsConstructor
@Slf4j
public class EmploymentController {
    private final EmploymentService service;
    private final StudentCourseService studentCourseService;
    private final ManagerService managerService;
    @Value("${security.level}")
    private String SECURITY_LEVEL;
    
    @GetMapping("/info-list")
    public Map getMethodName(@RequestParam(value = "page",    defaultValue = "1"   ) int page,
            @RequestParam(value = "pageSize",       defaultValue = "10"  ) int pageSize,
            @RequestParam int courseSeq) {
    	log.info(service.getEmploymentInfoByCourseSeq(courseSeq, page, pageSize).toString());
        return Map.of("result", service.getEmploymentInfoByCourseSeq(courseSeq, page, pageSize), "total", studentCourseService.countByCourseSeq(courseSeq));
    }
    
    @GetMapping("/avg-rate")
    public Map getCourseAvgRate(@RequestParam int courseSeq) {
        return Map.of("result", service.getEmployeedRatePct(courseSeq));
    }
    
    @PutMapping("/student")
    public Map editEmployeedStatus(@RequestBody EditEmployeedStatusRequest request) {
        
        return Map.of("result", service.editEmployeedStatus(request, null));
    }
    
    @PostMapping("/student")
    public Map addEmployeedStatus(@RequestBody EditEmployeedStatusRequest request) {
        
        return Map.of("result", false);
    }
    
    @DeleteMapping("/student/{employmentSeq}")
    public Map deleteEmployeedStatus() {
        
        return Map.of("result", false);
    }
    
    private ManagerDTO getLoginUser() {
        ManagerDTO loginUser;
        if(SECURITY_LEVEL.equals("OFF")) {
            loginUser = managerService.findByEmployeeNumber("EMP0001");
        }else {
            loginUser = (ManagerDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        return loginUser;
    }
}
