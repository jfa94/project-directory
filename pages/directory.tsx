import {useEffect, useState} from "react"
import styled from "styled-components"

import ProjectSelector from "../components/directory/ProjectSelector/index"
import DetailWindow from "../components/directory/DetailWindow/index"
import {getDummyProjects} from "../api/dummyProjects"

function Directory() {
    const [projectData, setProjectData] = useState({})
    const [selectedProject, setSelectedProject] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const updateProjects: (action: 'add' | 'remove', data: {} | string) => void = (action, data) => {
        if (action === 'add' && typeof data === 'object') {
            // TODO: add PUT method
            setProjectData(prevState => Object.assign(prevState, data))
            setSelectedProject(Object.keys(data)[0])
        } else if (action === 'remove' && typeof data === 'string') {
            // TODO: add PUT method
            setProjectData(prevState => {
                const newObj = Object.assign({}, prevState)
                delete newObj[data]
                return newObj
            })
            setSelectedProject('')
        } else {
            console.warn('No changes made: Incompatible parameters passed to updateProjects')
        }
    }

    useEffect(() => {
        (async () => {
            const projects = await getDummyProjects()
            setProjectData(projects)
            setIsLoading(false)
        })()
    }, [])

    return <Container>
        <ProjectSelectorSection>
            {isLoading ? <div>Loading...</div> : (
                <ProjectSelector selection={selectedProject}
                                 changeSelection={setSelectedProject}
                                 projectsData={projectData}
                                 updateProjects={updateProjects}
                />)}
        </ProjectSelectorSection>
        <DetailWindowContainer>
            <DetailWindow data={projectData[selectedProject]}/>
        </DetailWindowContainer>
    </Container>
}

const Container = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  border-top: 1px solid whitesmoke;
`

const ProjectSelectorSection = styled.section`
  flex-basis: 25vw;
`

const DetailWindowContainer = styled.div`
  flex-basis: 75vw;
`

export default Directory;