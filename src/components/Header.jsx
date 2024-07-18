import styled from 'styled-components';
import Palette from '../styles/Palette';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <Background>
      {props.prevBtn ? <PrevBtn></PrevBtn>: ''}<span>{props.title}</span>
    </Background>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  prevBtn: PropTypes.bool
};

const PrevBtn = styled.div`
  width: 2vh;
  height: 2vh;
  background-image: url('data:image/svg+xml;utf8,<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70711 0.292893C10.0976 0.683417 10.0976 1.31658 9.70711 1.70711L2.41421 9L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289L8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.0976311 9.70711 0.292893Z" fill="white"/></svg>');
  background-repeat: no-repeat;
  `;

const Background = styled.div`
  width: 100%;
  height: 13vh;
  background: rgb(74,125,250);
  background: linear-gradient(90deg, rgba(74,125,250,1) 0%, rgba(96,145,251,1) 57%, rgba(161,193,255,1) 100%);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 1.1rem;
  color: white;
  font-weight: bolder;
`;  

export default Header;
