import {FC, Dispatch, SetStateAction} from "react"
import styled from "styled-components"

import Card from "../../shared/Card"
import {ProjectProps} from "../../../common/types"
import {TagContainer, TagsField, TagText} from "../../shared/styledComponents"

const months: {[index: number]: string} = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

interface Props extends ProjectProps {
    id: string
    selected?: boolean
    setSelected: (newSelection: string) => void
}

const ProjectSummary: FC<Props> = (props) => {
    const _date = new Date(props.startDate)
    const displayedMonth = months[_date.getMonth()]
    const displayedDate = _date.getDate()

    return <Wrapper onClick={() => props.setSelected(props.id)}>
        <Card primary={props.selected ?? false}>
            <Headline>
                <Category>{props.category}</Category>
                <ProjectDate>{displayedDate} {displayedMonth}</ProjectDate>
            </Headline>
            <Title>{props.title}</Title>
            <TagsField editing={false}>
                {props.tags && props.tags.map((tag, index) => (
                    <TagContainer key={index} primary={props.selected ?? false}>
                        <TagText>{tag}</TagText>
                    </TagContainer>
                ))}
            </TagsField>
        </Card>
    </Wrapper>
}

const Wrapper = styled.div`
  cursor: pointer;
`

const Headline = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  overflow: hidden;
`

const Title = styled.h3`
  padding: 0.6rem 0;
  margin: 0;
`

const ProjectDate = styled.p`
  margin: 0;
  text-align: right;
`

const Category = styled.p`
  margin: 0;
  padding: 0 0.5rem 0.3rem 0;
  font-style: italic;
`

export default ProjectSummary;