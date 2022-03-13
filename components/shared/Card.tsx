import styled, {css} from "styled-components"

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  flex: 1;
  border-radius: .5rem;
  box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.05);
  ${props => props.primary && css`
    color: white;
    background-color: dimgrey;
  `}
`

export default Card;