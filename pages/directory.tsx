import {FC, useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {useRouter} from "next/router"

import ProjectSelector from "../components/directory/ProjectSelector/index"
import DetailWindow from "../components/directory/DetailWindow/index"
import {Loading} from "../components/shared/Loading"
import {getDummyProjects} from "../api/dummyProjects"
import {AuthContext} from "../context/AuthContext"

const Directory: FC<{}> = () => {
    const [projectsData, setProjectsData] = useState({})
    const [selectedProject, setSelectedProject] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [renderTrigger, setRenderTrigger] = useState(true)

    const {user} = useContext(AuthContext)
    const router = useRouter()

    const updateProjects: (action: 'add' | 'update' | 'remove', data: {} | string) => void = (action, data) => {
        if (action === 'add') {
            // TODO: add PUT method
            setProjectsData(prevState => Object.assign(data, prevState))
            setSelectedProject(Object.keys(data)[0])
            setIsEditing(true)
        } else if (action === 'update' && typeof data === 'object') {
            // TODO: add PUT method
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
            if (!user) {
                await router.push('/')
            }

            const projects = await getDummyProjects()
            setProjectsData(projects)
            setIsLoading(false)
        })()

        return () => {
            setProjectsData({})
            setIsLoading(false)
        }
    }, [user, router])

    return <Container>
        <ProjectSelectorSection>
            {isLoading ? <Loading>Loading...</Loading> : (
                <ProjectSelector renderTrigger={renderTrigger}
                                 selection={selectedProject}
                                 changeSelection={changeSelection}
                                 projectsData={projectsData}
                                 updateProjects={updateProjects}
                />)}
        </ProjectSelectorSection>
        <DetailWindowContainer>
            <DetailWindow key={selectedProject}
                          _id={selectedProject}
                          data={projectsData[selectedProject]}
                          editingState={[isEditing, setIsEditing]}
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
`

const DetailWindowContainer = styled.section`
  flex-basis: 75vw;
`

export default Directory;