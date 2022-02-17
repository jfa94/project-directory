import {FC, Dispatch, SetStateAction} from "react"
import styled from "styled-components"

import ProjectSummary from "./ProjectSummary"

const newProject = {
    'project99': {
        'title': 'New Project',
        'description': 'I am testing out how to add a new project',
    }
}

interface Props {
    renderTrigger: boolean,
    selection: string,
    changeSelection: Dispatch<SetStateAction<string>>,
    projectsData: object,
    updateProjects: (action: 'add' | 'remove', data: {} | string) => void
}

const ProjectSelector: FC<Props> = ({selection, changeSelection, projectsData, updateProjects}) => {
    return <Container>
        <button onClick={() => updateProjects('add', newProject)}>Add project</button>
        {Object.keys(projectsData).map(key => <ProjectSummary key={key}
                                                              id={key}
                                                              name={projectsData[key].title}
                                                              description={projectsData[key].description}
                                                              selected={selection === key}
                                                              setSelected={changeSelection}
        />)}
    </Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: auto;
  padding: 0.75rem;
  gap: 0.75rem;
`

export default ProjectSelector;