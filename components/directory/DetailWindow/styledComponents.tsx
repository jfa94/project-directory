import styled from "styled-components"
import Image from "next/image"

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

export const FullWidthDiv = styled.div`
  grid-column: span 2;
`

export const HalfWidthDiv = styled.div`
  grid-column: span 1;
`

export const CustomP = styled.p`
  width: 100%;
  font-size: 1.2rem;
`

export const CustomLabel = styled.label`
  width: 100%;
  display: block;
`

export const CustomInput = styled.input`
  width: 100%;
  font-size: 1rem;
`

export const CustomTextarea = styled.textarea`
  width: 100%;
`

export const TagsField = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 2.3rem;
  gap: 0.2rem;
  align-items: center;
  border: solid 1px black;
  padding: 0.3rem;
`

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 5px;
  background-color: darkgrey;
`

export const TagText = styled.span`
  margin: 0 0.3rem;
  font-size: 0.9rem;
`

export const DeleteIcon = styled(Image)`
  cursor: pointer;
`

export const Input = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
`