import {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'

import ProjectSummary from './ProjectSummary'

const newProject = {
    'project99': {
        'title': 'New Project',
        'description': 'I am testing out how to add a new project',
    }
}

function ProjectSelector({selection, changeSelection, projectsData, updateProjects}) {

    return <Container>
        {Object.keys(projectsData).map(key => <ProjectSummary key={key}
                                                              id={key}
                                                              name={projectsData[key].title}
                                                              description={projectsData[key].description}
                                                              selected={selection === key}
                                                              setSelected={changeSelection}
        />)}
        <button onClick={() => updateProjects('add', newProject)}>Add project</button>
        <button onClick={() => updateProjects('remove', 'project99')}>Remove project</button>
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