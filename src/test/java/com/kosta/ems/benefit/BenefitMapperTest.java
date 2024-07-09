package com.kosta.ems.benefit;

import com.kosta.ems.benefit.dto.*;
import com.kosta.ems.student.StudentCourseInfoDTO;
import com.kosta.ems.student.StudentMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class BenefitMapperTest {
    @Autowired
    private BenefitMapper benefitMapper;
    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private BenefitServiceImpl benefitServiceImpl;

    @Test
    public void selectBenefitTargetTest() {
        log.info("몇개? {} ", benefitMapper.selectBenefitTarget("가산", LocalDate.parse("2024-03-03"), LocalDate.parse("2024-04-04"), "277", "", 20, 0).size());
        assertThat(benefitMapper.selectBenefitTarget("가산", LocalDate.parse("2024-03-03"), LocalDate.parse("2024-04-04"), "277", "", 10, 0).size()).isEqualTo(10);
    }

    @Test
    @Transactional
    public void insertBenefitSettlementDurationTest() {
        SettlementDurationDTO build = SettlementDurationDTO.builder().settlementDurationEndDate(LocalDate.parse("2024-07-30")).settlementDurationStartDate(LocalDate.parse("2024-07-02")).courseSeq(19).managerId("d893bf71-2f8f-11ef-b0b2-0206f94be675").build();
        log.info(build.toString());
        benefitMapper.insertBenefitSettlementDuration(build);
        log.info(String.valueOf(build.getSettlementDurationSeq()));
    }

    //@Test
    //@Transactional
    public void insertBenefitSettlementAmountTest() {
        BenefitDTO build = BenefitDTO.builder().trainingAidAmount(200000).mealAidAmount(9500).settlementAidAmount(200000).studentId("efa1441a-2fa7-11ef-b0b2-0206f94be675").settlementDurationSeq(4).build();
        benefitMapper.insertBenefitSettlementAmount(build);
    }

    //@Test
    void selectBenefitSettlementResultPageTest() {
        List<BenefitTargetInfoDTO> dto = (ArrayList<BenefitTargetInfoDTO>) benefitMapper.selectBenefitSettlementResult("가산", "", "", null, 5, 0);
        for (BenefitTargetInfoDTO d : dto) {
            log.info(d.getBenefitSettlementDate().toString());
        }

        assertThat(dto.size()).isEqualTo(5);
    }

    @Test
    void selectBenefitSettlementResultTest() {
        List<BenefitTargetInfoDTO> dto = (ArrayList<BenefitTargetInfoDTO>) benefitMapper.selectBenefitSettlementResult("가산", "", "227", LocalDate.parse("2024-03-21"), 5, 0);
        log.info("크기 {}", dto.size());
        for (BenefitTargetInfoDTO d : dto) {
            log.info("이거 뭔데 {} ", d);
            assertThat(d.getBenefitSettlementDate()).isEqualTo(LocalDate.parse("2024-03-21"));
        }
    }

    @Test
    void selectBenefitSettlementResultTest2() {
        List<BenefitTargetInfoDTO> dto = (ArrayList<BenefitTargetInfoDTO>) benefitMapper.selectBenefitSettlementResult("가산", "", "227", LocalDate.parse("2024-03-21"), 5, 0);
        for (BenefitTargetInfoDTO d : dto) {
            assertThat(d.getCourseNumber()).isEqualTo(277);
        }
    }

    //@Test
    void countSettlementTargetTest() {
        assertThat(benefitMapper.countSettlementTarget("가산", LocalDate.parse("2024-03-03"), LocalDate.parse("2024-04-04"), "277", "")).isEqualTo(19);
    }

    @Test
    void countSettlementResultTest() {
        log.info(String.valueOf(benefitMapper.countSettlementResult("가산", "", "", LocalDate.parse("2024-05-21"))));
    }

    //@Test
    void selectLastSettlementDateTest() {
        assertThat(benefitMapper.selectLastSettlementDate("277")).isEqualTo("2024-07-30");
    }

    //@Test
    @Transactional
    void settlementAllCourseStudent() {
        Date today = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        log.info("시적 전 크기는? {} ", benefitMapper.selectBenefitSettlementResult("가산", "", "277", LocalDate.parse(dateFormat.format(today)), 30, 0).size());

        // seq로 해당 기수의 학생 정보 가져오기
        List<StudentCourseInfoDTO> studentList = studentMapper.selectStudentListBycourseSeq(19);
        log.info("학생 수 {}", studentList.size());

        // 정산 정보 받아서 정산하기
        SettlementDurationDTO dto = SettlementDurationDTO.builder()
                .settlementDurationStartDate(LocalDate.parse("2024-04-03"))
                .settlementDurationEndDate(LocalDate.parse("2024-05-02"))
                .courseSeq(19)
                .managerId("d893bf71-2f8f-11ef-b0b2-0206f94be675").build();

        benefitMapper.insertBenefitSettlementDuration(dto);

        // 지원금 정산 대상 가져오기
        List<BenefitTargetInfoDTO> targetList = (ArrayList<BenefitTargetInfoDTO>) benefitMapper.selectBenefitTarget("가산", LocalDate.parse("2024-03-03"), LocalDate.parse("2024-04-02"), "277", "", null, null);

        log.info("정산 대상  {} ", targetList.size());

        for (BenefitTargetInfoDTO targetInfo : targetList) {
            log.info("seq {} ", dto.getSettlementDurationSeq());
            benefitMapper.insertBenefitSettlementAmount(BenefitDTO.builder()
                    .settlementAidAmount(benefitServiceImpl.settlementAid(LocalDate.parse("2024-04-03"), LocalDate.parse("2024-05-02"), targetInfo.getStudentId(), 20))
                    .mealAidAmount(benefitServiceImpl.mealAid(LocalDate.parse("2024-04-03"), LocalDate.parse("2024-05-02"), targetInfo.getStudentId(), 20))
                    .trainingAidAmount(benefitServiceImpl.trainingAid(LocalDate.parse("2024-04-03"), LocalDate.parse("2024-05-02"), targetInfo.getStudentId(), 20))
                    .studentId(targetInfo.getStudentId())
                    .settlementDurationSeq(dto.getSettlementDurationSeq())
                    .build());

        }
        List<BenefitTargetInfoDTO> data = (ArrayList<BenefitTargetInfoDTO>) benefitMapper.selectBenefitSettlementResult("가산", "", "277", LocalDate.parse(dateFormat.format(today)), 30, 0);
        for (BenefitTargetInfoDTO d : data) {
            log.info("이름 출력 {} ", d);
        }

        // 정산 결과 내용과 과정의 학생 수 맞는지 비교하기
        assertThat(benefitMapper.countSettlementResult("가산", "", "277", LocalDate.parse(dateFormat.format(today)))).isEqualTo(studentList.size());

    }

    @Test
    void targetWithoutPagenation() {
        log.info("결과 {} ", benefitMapper.selectBenefitTarget("가산", LocalDate.parse("2024-03-03"), LocalDate.parse("2024-04-02"), "277", "", null, null));
        assertThat(benefitMapper.selectBenefitTarget("가산", LocalDate.parse("2024-03-03"), LocalDate.parse("2024-04-02"), "277", "", null, null).size()).isEqualTo(19);

    }

}