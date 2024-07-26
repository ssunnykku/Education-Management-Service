import styled from 'styled-components';
import Palette from '../styles/Palette';
import PropTypes from 'prop-types';
import '../styles/slideFromBottom.css';

const FullPageModal = ({ id, children }) => {
  return (
    <FullPageModalWrapper id={id} popover='auto'><div>{children}</div></FullPageModalWrapper>
  );
};

const FullPageModalWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 89vh;

  position: fixed;
  top: 11vh;
  font-size: 0.95rem;
  border-radius: 5vw;
  background-color: #F8F8F8;
  box-shadow: 0px 2px 10px rgba(231, 233, 242, 0.7);
  border: none;
  
  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    height: 100%;
    padding-top: 2.2564rem;
  padding-left: 1.2307rem;
  padding-right: 1.2307rem;
  }
`;
export default FullPageModal;
