package com.kosta.ems.employment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;


import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class EmploymentRepoTest {
	@Autowired
	EmploymentRepo repo;
	
	@Test
	@Transactional
	public void findBySeq() {
	    Optional<EmploymentDTO> result = repo.findBySeq(1);
	    if(result.isPresent()) {
	        assertThat(result.get().getCompany()).isEqualTo("금호IDT");
	        log.info(result.get().toString());
	        return;
	    }
	    log.error(result.toString());
	    fail();
	    
	}

}
