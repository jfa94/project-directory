import {FC, useState} from "react"
import styled from "styled-components"

import Card from "../../shared/Card"
import ProjectForm from "./ProjectForm"
import ProjectDetail from "./ProjectDetail";

interface Props {
    _id: string,
    data,
    updateProjects: (action: 'add' | 'remove', data: {} | string) => void
}

const DetailWindow: FC<Props> = (props) => {
    const [isEditing, setIsEditing] = useState(true)

    return <Container>
        {!props.data ? <p style={{alignSelf: 'center'}}>Select a project</p> : (
            <Card>
                {isEditing ? (
                    <ProjectForm _id={props._id} data={props.data} updateProject={props.updateProjects}/>
                ) : (
                    <ProjectDetail _id={props._id} data={props.data}/>
                )}
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