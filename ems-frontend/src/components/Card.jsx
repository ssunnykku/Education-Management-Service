import styled from 'styled-components';

const Card = ({children, align='center'}) => {

  return (
      <CardWrapper $align={align}>{children}</CardWrapper>
  );
};
const CardWrapper = styled.div`
    display: flex;
  align-items: ${props => props.align};
  flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    padding: 1.8461rem 1.23rem;
    font-size: 0.95rem;
    border-radius: 5vw;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(231, 233, 242, 0.7);
  `;
export default Card;
  