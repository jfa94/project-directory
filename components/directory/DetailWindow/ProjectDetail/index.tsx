import {FC} from "react"

import {Props} from "../propsInterface"
import {
    CustomLabel,
    CustomP,
    FullWidthDiv,
    HalfWidthDiv,
    LayoutContainer
} from "../styledComponents"
import TagsDisplay from "./TagsDisplay"

const ProjectDetail:FC<Props> = ({data, setIsEditing}) => {
    const {title, description, startDate, endDate, tags} = data

    return <LayoutContainer>
        <FullWidthDiv>
            <CustomLabel>Title </CustomLabel>
            <CustomP>{title}</CustomP>
        </FullWidthDiv>
        <FullWidthDiv>
            <CustomLabel htmlFor="description">Description </CustomLabel>
            <CustomP>{description}</CustomP>
        </FullWidthDiv>
        <HalfWidthDiv>
            <CustomLabel htmlFor="startDate">Start Date </CustomLabel>
            <CustomP>{startDate}</CustomP>
        </HalfWidthDiv>
        <HalfWidthDiv>
            <CustomLabel htmlFor="endDate">End Date </CustomLabel>
            <CustomP>{endDate}</CustomP>
        </HalfWidthDiv>
        <FullWidthDiv>
            <CustomLabel>Tags</CustomLabel>
            <TagsDisplay tags={tags}/>
        </FullWidthDiv>
        <FullWidthDiv>
            <button onClick={() => setIsEditing(prevState => !prevState)}>Edit</button>
        </FullWidthDiv>
    </LayoutContainer>
}

export default ProjectDetail;