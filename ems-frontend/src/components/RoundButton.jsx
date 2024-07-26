import styled from 'styled-components';
import Palette from '../styles/Palette';
import { PropTypes } from 'prop-types';

const RoundButton = (props) => {
  return (
    <RoundPrimaryBtn className={props.type} onClick={props.action}>
      {props.text}
    </RoundPrimaryBtn>
  );
};

RoundButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'transparent', 'underline']),
  action: PropTypes.func,
};

const RoundPrimaryBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  border-radius: 50px;

  &.primary {
    background-color: ${Palette.Primary};
    color: ${Palette.BodyPrimary};
  }

  &.transparent {
    color: ${Palette.Primary};
    border: 1.5px solid ${Palette.Primary};
  }

  &.underline {
    color: ${Palette.TextSecondary};
    text-decoration: underline;
    height: 1.4rem;
  }
`;

export default RoundButton;
