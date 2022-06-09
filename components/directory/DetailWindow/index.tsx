import {Dispatch, FC, SetStateAction} from "react"
import styled from "styled-components"

import Card from "../../shared/Card"
import ProjectForm from "./ProjectForm"
import ProjectDetail from "./ProjectDetail"
import {ProjectProps} from "../../../common/types"

interface Props {
    _id: string,
    data: ProjectProps,
    updateProjects: (action: 'add' | 'update' | 'remove', data: {} | string) => void,
    changeSelection: (newSelection: string) => void,
    editingState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const DetailWindow: FC<Props> = ({
                                     _id,
                                     data,
                                     changeSelection,
                                     editingState,
                                     updateProjects
                                 }) => {
    const [isEditing, setIsEditing] = editingState

    return <Container>
        {!data ? <p style={{alignSelf: 'center'}}>Select a project</p> : (
            <Card primary={false}>
                {isEditing ? (
                    <ProjectForm _id={_id}
                                 data={data}
                                 updateProject={updateProjects}
                                 setIsEditing={setIsEditing}
                    />
                ) : (
                    <ProjectDetail _id={_id}
                                   data={data}
                                   setIsEditing={setIsEditing}
                                   changeSelection={changeSelection}
                    />
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