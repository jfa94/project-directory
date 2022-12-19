import {FC} from "react"

import {DetailWindowProps} from "../../../../common/types"
import {
    Label,
    P,
    FullWidthDiv,
    HalfWidthDiv,
    LayoutContainer,
    QuarterWidthDiv,
    DeleteIcon
} from "../../../shared/styledComponents"
import TagsDisplay from "./TagsDisplay"
import styled from "styled-components"
import Button from "../../../shared/Button"

const ProjectDetail: FC<DetailWindowProps> = ({data, changeSelection, setIsEditing}) => {
    const startDateObj = new Date(data.startDate)
    const endDateObj = new Date(data.endDate)
    const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'} as const

    return <LayoutContainer>
        <FullWidthDiv>
            <TitleRow>
                <div>
                    <Label>Title </Label>
                    <P>{data.title}</P>
                </div>
                <CloseIcon>
                    <DeleteIcon src="/icons/close.svg"
                                alt="close"
                                height={25}
                                width={25}
                                onClick={() => changeSelection ? changeSelection('') : console.warn('changeSelection not defined')}
                    />
                </CloseIcon>
            </TitleRow>
        </FullWidthDiv>
        <HalfWidthDiv>
            <Label>Category </Label>
            <P>{data.category}</P>
        </HalfWidthDiv>
        <QuarterWidthDiv>
            <Label htmlFor="startDate">Start Date </Label>
            <P>{startDateObj.toLocaleDateString('en-GB', dateOptions)}</P>
        </QuarterWidthDiv>
        <QuarterWidthDiv>
            <Label htmlFor="endDate">End Date </Label>
            <P>{endDateObj.toLocaleDateString('en-GB', dateOptions)}</P>
        </QuarterWidthDiv>
        <FullWidthDiv>
            <Label htmlFor="message">Message </Label>
            <P>{data.message}</P>
        </FullWidthDiv>
        <FullWidthDiv>
            <Label htmlFor="context">Context </Label>
            <P>{data.context}</P>
        </FullWidthDiv>
        <FullWidthDiv>
            <Label htmlFor="actions">Actions </Label>
            <P>{data.actions}</P>
        </FullWidthDiv>
        <FullWidthDiv>
            <Label htmlFor="impact">Impact </Label>
            <P>{data.impact}</P>
        </FullWidthDiv>
        <FullWidthDiv>
            <Label htmlFor="learnings">Learnings </Label>
            <P>{data.learnings}</P>
        </FullWidthDiv>
        <FullWidthDiv>
            <Label>Tags</Label>
            {data.tags && <TagsDisplay tags={data.tags}/>}
        </FullWidthDiv>
        <Div>
            <Button onClick={() => setIsEditing(prevState => !prevState)} filled={false}>Edit</Button>
        </Div>
    </LayoutContainer>
}

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CloseIcon = styled.div`
  flex-shrink: 0;
`

const Div = styled(FullWidthDiv)`
  display: flex;
  justify-content: flex-end;
`

export default ProjectDetail;