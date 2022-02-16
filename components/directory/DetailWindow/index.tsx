import styled from "styled-components"

import Card from "../../shared/Card"
import ProjectForm from "./ProjectForm"

function DetailWindow(props) {
    return <Container>
        {!props.data ? <p style={{alignSelf: 'center'}}>Select a project</p> : (
            <Card>
                <ProjectForm key={props.data.title} data={props.data}/>
            </Card>
        )}
    </Container>
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  overflow-x: auto;
  background: whitesmoke;
  padding: 1rem;
`

export default DetailWindow;