package com.kosta.ems.studentLogin;

import com.kosta.ems.config.jwt.TokenInfo;
import com.kosta.ems.student.dto.StudentDTO;

public interface UserService {
    public TokenInfo login(StudentDTO studentDTO);

    public TokenInfo isRefreshTokenValid(String refreshToken, String accessToken);

    public void logout(String hrdNetId, String loginUser);
}
