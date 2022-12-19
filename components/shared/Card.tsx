import styled, {css} from "styled-components"

const Card = styled.div<{primary: boolean}>`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  flex: 1;
  border-radius: .5rem;
  box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.075);
  ${props => props.primary && css`
    color: white;
    background: ${props => props.theme.colors.gradient};
    box-shadow: 0 0 5px 1px ${props => props.theme.colors.secondaryAlt};
  `}
`

export default Card;