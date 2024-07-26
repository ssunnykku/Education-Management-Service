import styled from 'styled-components';
import RoundButton from '../components/RoundButton';
import InputBasic from '../components/InputBasic';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as Api from '../utils/api.js';

const Login = () => {
  const [hrdNetId, setHrdNetId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const loginAction = () => {
    Api.post('students/login', {
      hrdNetId: hrdNetId,
      password: password,
    }).then((res) => {

      localStorage.setItem('userToken', res.result);
      navigate('/myPage');
    });
  };

  return (
    <LoginPageWrapper>
      <Link to="/">
        <LogoWrapper>
          <LogoImgWrapper>
            <LogoImg src='/edu_logo.png'/>
          </LogoImgWrapper>
        </LogoWrapper>
      </Link>
      <LoginForm>
        <InputTagWrapper>
          <InputBasic
            type='text'
            placeholder='HRD-Net-Id'
            value={hrdNetId}
            onChange={(event) => {
              setHrdNetId(event.target.value);
            }}
          />
          <InputBasic
            type='password'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </InputTagWrapper>
        <LoginBtnWrapper>
          <RoundButton
            text={'Log in'}
            type={'primary'}
            action={() => {
              loginAction();
            }}
          />
        </LoginBtnWrapper>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default Login;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 8rem;
  width: 100%;

`;

const LogoImgWrapper = styled.div`
  display: flex;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;  
  align-items: center;
  justify-content: center;
  padding-left: 5rem;
`;

const LogoImg = styled.img`
  object-fit:cover;
  width: 16rem;
`;

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  padding: 1.2rem;
`;

const LoginForm = styled.div`
  width: 100%;
  min-height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
`;

const LoginBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const InputTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
