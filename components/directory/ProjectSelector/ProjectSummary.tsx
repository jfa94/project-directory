import {FC, Dispatch, SetStateAction} from "react"
import styled from "styled-components"

import Card from "../../shared/Card"
import {ProjectProps} from "../../../common/types"

interface Props extends ProjectProps {
    id: string
    selected?: boolean
    setSelected: Dispatch<SetStateAction<string>>
}

const ProjectSummary: FC<Props> = (props) => {
    return <Wrapper onClick={() => props.setSelected(props.id)}>
        <Card primary={props.selected}>
            <h4>{props.title}</h4>
            <p>{props.context}</p>
        </Card>
    </Wrapper>
}

const Wrapper = styled.div`
  cursor: pointer;
`

export default ProjectSummary;