import styled from 'styled-components';
import Palette from '../styles/Palette';
import PropTypes from 'prop-types';
import { useState } from 'react';

const InputBasic = (props) => {

  return (
    <InputWrapper width={props.width}>
      {props.searchIcon && <SearchIcon className="bi bi-search"></SearchIcon>}
      <InputStyle
        text={props.text}
        placeholder={props.placeholder}
        style={{ height: `${props.height}rem` }}
        className={
          (props.searchIcon ? 'search ' : '') +
          (props.editInput ? 'editInput' : '')
        }
        value={props.value}
        type={props.type == 'bankAccount' ? 'text' : props.type}
        onChange={props.onChange}
        defaultValue={props.text}
        name={props.name}
        pattern = {props.type == 'tel' ? '[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}' : props.type == 'bankAccount' ? '[0-9]{10,14}$' : '.*'}
        title = {props.title}
        required={props.required}
      />
    </InputWrapper>
  );
};

InputBasic.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  searchIcon: PropTypes.bool,
  editInput: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

const InputWrapper = ({width, children}) => {

  return (
    <Temp width={width}>{children}</Temp>
  )
}

const Temp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.i`
  position: relative;
  left: 1.7rem;
`;

const InputStyle = styled.input`
  width: 100%;
  height: 3.5rem;

  background: ${Palette.BodyPrimary};
  border: 1px solid ${Palette.InputBorder};
  border-radius: 10px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* padding-left: 1rem; */
  text-align: center;
  

  &::placeholder {
    color: ${Palette.InputBorder};
  }

  &.search {
    &::placeholder {
      padding-left: 1.2rem;
    }
  }
  &.editInput {
    &::placeholder {
      color: ${Palette.TextPrimary};
    }
  }
`;

export default InputBasic;
