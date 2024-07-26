import styled from 'styled-components';
import Palette from '../../styles/Palette';
import PropTypes from 'prop-types';

const RegistrationInput = (props) => {
  return (
    <InputWrapper>
      <Input
        onChange={props.onChange}
        placeholder={props.text}
        className={props.isWritten || 'placeholderEffect'}
        type={props.type}
      />
      <RegistrationInputMessage
        className={props.isWritten || 'unWrittenEffect'}
      >
        {props.text} Required
      </RegistrationInputMessage>
    </InputWrapper>
  );
};

RegistrationInput.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  isWritten: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default RegistrationInput;

const InputWrapper = styled.div`
  width: 100%;
  height: 5.7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0.3rem 0 0.3rem 0;
`;

const Input = styled.input`
  width: 100%;
  height: 3.5rem;
  border: 1px solid ${Palette.InputBorder};

  border-radius: 10px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  padding-bottom: 0.5rem;

  padding-left: 1rem;
  padding-top: 0.5rem;

  background-image: url('../assets/alert.svg');
  background-repeat: no-repeat;
  background-size: 28px;
  background-position: left;
  background-position-x: 5%;

  &.placeholderEffect {
    border: 1px solid ${Palette.Error};
    color: ${Palette.InputBorder};

    &::placeholder {
      color: ${Palette.Error};
    }
  }
`;

const RegistrationInputMessage = styled.p`
  padding-left: 0.3rem;
  /* color: transparent; */
  display: none;
  &.unWrittenEffect {
    display: block;
    color: ${Palette.Error};
  }
`;

const ValidateMessage = styled.div`
  padding-left: 0.3rem;
  /* color: transparent; */
  display: none;
  &.validationEffect {
    display: block;
    color: ${Palette.Error};
  }
`;
