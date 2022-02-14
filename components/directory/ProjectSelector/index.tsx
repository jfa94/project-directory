import {useState, useContext} from 'react'
import styled from 'styled-components'

import {SelectedProjectContext} from '../../../context/SelectedProjectContext'
import ProjectSummary from './ProjectSummary'

const list = [1, 2, 3, 4, 5]

function ProjectSelector() {
    const [selectedProject, setSelectedProject] = useContext(SelectedProjectContext)

    return <Container>
            {list.map(i => {
                return <ProjectSummary key={i}
                                       id={i}
                                       name="Project Name"
                                       description="This is the description for a project"
                                       selected={selectedProject === i}
                                       setSelected={setSelectedProject}
                />
            })}
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