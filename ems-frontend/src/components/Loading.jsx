import styled, { keyframes } from 'styled-components';
import Palette from '../styles/Palette';
import PropTypes from 'prop-types';
import '../styles/loading.css';

const Loading = ({ isComplete = false, size = "2.5641rem" }) => {
  if (isComplete) {
    const stroke = keyframes`
      100% {
        stroke-dashoffset: 0
      }
    `;

    const scale = keyframes`

      0%,
      100% {
        transform: none
      }

      50% {
        transform: scale3d(1.1, 1.1, 1)
      }
    `;

    const fill = keyframes`
      100% {
        box-shadow: inset 0px 0px 0px 60px #5C7CFA
      }
    `;
    const CheckingWrapper = styled.div`
    display: inline-block;
    .checkmark__circle {
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      stroke-width: 2;
      stroke-miterlimit: 10;
      stroke: #5C7CFA;
      fill: none;
      animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
    }

    .checkmark {
      width: ${size};
      height: ${size};
      border-radius: 50%;
      display: block;
      stroke-width: 2;
      stroke: #fff;
      stroke-miterlimit: 10;
      margin: 10% auto;
      box-shadow: inset 0px 0px 0px #5C7CFA;
      animation: ${fill} .4s ease-in-out .4s forwards, ${scale} .3s ease-in-out .9s both
    }

    .checkmark__check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
    }
  `;

    return (
      <CheckingWrapper className="wrapper">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </CheckingWrapper>
    );
  } else {
    const LoadingWrapper = styled.div`
      width: ${size};
      height: ${size};
    `;
    return (
      <LoadingWrapper id='loading'></LoadingWrapper>
    );

  }
};
export default Loading;
