import {FC} from "react"
import styled from "styled-components"

import {Props} from "./propsInterface"

const ProjectDetail:FC<Props> = ({data}) => {
    const {title, description, startDate, endDate, tags} = data

    return <Container>

    </Container>
}

const Container = styled.div``

export default ProjectDetail;