package com.kosta.ems.benefit;

import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDate;
import java.util.Collection;

@Mapper
public interface BenefitMapper {
    Collection<BenefitTargetDTO> selectBenefitTarget(String academyLocation, LocalDate startDate, LocalDate endDate, int courseNumber, int limit, int offset);

    void insertBenefitSettlementDuration(BenefitSettlementReqDTO settlementDurationDTO);

    void insertBenefitSettlementAmount(BenefitDTO benefitDTO);

    Collection<BenefitSettlementResultDTO> selectBenefitSettlementResult(String academyLocation, String name, String courseNumber, LocalDate benefitSettlementDate, int limit, int offset);

    int countSettlementTarget(String academyLocation, LocalDate startDate, LocalDate endDate, int courseNumber);

    int countSettlementResult(String academyLocation, String name, String courseNumber, LocalDate benefitSettlementDate);
}
