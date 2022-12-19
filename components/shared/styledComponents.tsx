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

export const ThreeQuartersWidthDiv = styled.div`
  grid-column: span 3;

  @media (max-width: 1000px) {
    grid-column: span 2;
  }

  @media (max-width: 650px) {
    grid-column: span 4;
  }
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
  font-size: ${props => props.theme.fontSizes.medium};
`

export const Label = styled.label`
  width: 100%;
  display: inline;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.medium};
`

export const Input = styled.input`
  width: 100%;
  font-size: ${props => props.theme.fontSizes.medium};
`

export const Textarea = styled.textarea`
  width: 100%;
  font-size: ${props => props.theme.fontSizes.medium};
`

export const TagsField = styled.div<{ editing: boolean }>`
  display: flex;
  flex-wrap: wrap;
  min-height: 2.3rem;
  gap: 0.2rem;
  align-items: center;
  padding: 0.3rem ${props => props.editing ? '0.3rem' : '0'};
  border: ${props => props.editing ? 'solid 1px grey' : 'none'}
`

export const TagContainer = styled.div<{ primary: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 5px;
  ${props => props.primary ? css`
    background-color: whitesmoke;
    color: black;
  ` : css`
    background-color: ${props => props.theme.colors.third};
    color: white;
  `
  };
`

export const TagText = styled.span`
  margin: 0 0.3rem;
  font-size: 0.9rem;
`

export const DeleteIcon = styled(Image)`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(13deg) brightness(107%) contrast(103%);
  cursor: pointer;
`

export const CustomInput = styled.input`
  border: none;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`