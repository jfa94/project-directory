import styled from "styled-components"

interface Props {
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    tags: string[]
}

function ProjectDetail(props: Props) {
    const {title, description, startDate, endDate, tags} = props

    return <Container>

    </Container>
}

const Container = styled.div``

export default ProjectDetail;