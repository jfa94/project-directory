import styled, {css} from "styled-components"
import Image from "next/image"

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`

export const FullWidthDiv = styled.div`
  grid-column: span 4;
`

export const HalfWidthDiv = styled.div`
  grid-column: span 2;

  @media (max-width: 1000px) {
    grid-column: span 4;
  }
`

export const QuarterWidthDiv = styled.div`
  grid-column: span 1;

  @media (max-width: 1000px) {
    grid-column: span 2;
  }

  @media (max-width: 650px) {
    grid-column: span 4;
  }
`

export const P = styled.p`
  width: 100%;
  margin: 0;
  font-size: 1rem;
`

export const Label = styled.label`
  width: 100%;
  font-weight: bold;
  display: block;
`

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
`

export const Textarea = styled.textarea`
  width: 100%;
`

export const TagsField = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 2.3rem;
  gap: 0.2rem;
  align-items: center;
  padding: 0.3rem;
  border: ${props =>
          props.editing ? 'solid 1px grey' : 'none'
  }
`

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 5px;
  background-color: ${props =>
          props.primary ? 'darkgrey' : '#ebd1a9'
  };

`

export const TagText = styled.span`
  margin: 0 0.3rem;
  font-size: 0.9rem;
`

export const DeleteIcon = styled(Image)`
  cursor: pointer;
`

export const CustomInput = styled.input`
  border: none;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`