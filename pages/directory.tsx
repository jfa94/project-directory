import {FC, useEffect, useState} from "react"
import styled, {css} from "styled-components"
import {useSession, signIn} from "next-auth/react"

import ProjectSelector from "../components/directory/ProjectSelector/index"
import DetailWindow from "../components/directory/DetailWindow/index"
import {Loading} from "../components/shared/Loading"
import {getDummyProjects} from "../api/dummyProjects"

interface Props {
}

const Directory: FC<Props> = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            signIn('cognito', {callbackUrl: '/directory'})
        }
    })

    const [projectsData, setProjectsData] = useState({})
    const [selectedProject, setSelectedProject] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [renderTrigger, setRenderTrigger] = useState(true)

    const updateProjects: (
        action: 'add' | 'update' | 'remove',
        data: {} | string
    ) => Promise<void> = async (action, data) => {
        if (action === 'add') {
            // TODO: add PUT method
            setProjectsData(prevState => Object.assign(data, prevState))
            setSelectedProject(Object.keys(data)[0])
            setIsEditing(true)
        } else if (action === 'update' && typeof data === 'object') {
            const response = await fetch('/api/projects', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({projectid: selectedProject, ...data[selectedProject]})
            })
            console.log(response)

            setProjectsData(prevState => Object.assign(prevState, data))
            setSelectedProject(Object.keys(data)[0])
            setRenderTrigger(prevState => !prevState)
        } else if (action === 'remove' && typeof data === 'string') {
            // TODO: add PUT method
            setProjectsData(prevState => {
                const newObj = Object.assign({}, prevState)
                delete newObj[data]
                return newObj
            })
            setSelectedProject('')
        } else {
            console.warn('No changes made: Incompatible parameters passed to updateProjects')
        }
    }

    const changeSelection = (newSelection: string) => {
        setSelectedProject(newSelection)
        setIsEditing(false)
    }

    useEffect(() => {
        (async () => {
            const projects = await getDummyProjects()
            setProjectsData(projects)
            setIsLoading(false)
        })()

        return () => {
            setProjectsData({})
            setIsLoading(false)
        }
    }, [])

    return <Container>
        <ProjectSelectorSection selectedProject={selectedProject}>
            {isLoading ? <Loading>Loading...</Loading> : (
                <ProjectSelector renderTrigger={renderTrigger}
                                 selection={selectedProject}
                                 changeSelection={changeSelection}
                                 projectsData={projectsData}
                                 updateProjects={updateProjects}
                />)}
        </ProjectSelectorSection>
        <DetailWindowContainer selectedProject={selectedProject}>
            <DetailWindow key={selectedProject}
                          _id={selectedProject}
                          data={projectsData[selectedProject]}
                          editingState={[isEditing, setIsEditing]}
                          changeSelection={changeSelection}
                          updateProjects={updateProjects}
            />
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

  @media (max-width: 1250px) {
    flex-basis: 33vw;
  }

  @media (max-width: 650px) {
    ${props => props.selectedProject === '' ? css`
      display: block;
      flex-basis: 100vw;
    ` : css`
      display: none;
      flex-basis: 0;
    `
    }
`

const DetailWindowContainer = styled.section`
  flex-basis: 75vw;

  @media (max-width: 1250px) {
    flex-basis: 67vw;
  }

  @media (max-width: 650px) {
    ${props => props.selectedProject === '' ? css`
      display: none;
      flex-basis: 0;
    ` : css`
      display: block;
      flex-basis: 100vw;
    `
    }
  }
`

export default Directory;