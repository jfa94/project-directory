import {FC, Dispatch, SetStateAction} from "react"
import styled from "styled-components"

import Card from "../../shared/Card"

interface Props {
    id: string
    selected?: boolean
    name: string
    description: string
    setSelected: Dispatch<SetStateAction<string>>
}

const ProjectSummary: FC<Props> = (props) => {
    return <Wrapper onClick={() => props.setSelected(props.id)}>
        <Card primary={props.selected}>
            <h4>{props.name}</h4>
            <p>{props.description}</p>
        </Card>
    </Wrapper>
}

const Wrapper = styled.div`
  cursor: pointer;
`

export default ProjectSummary;