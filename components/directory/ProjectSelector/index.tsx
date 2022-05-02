import {FC, Dispatch, SetStateAction, useEffect, useState} from "react"
import styled from "styled-components"

import ProjectSummary from "./ProjectSummary"
import SearchBar from "./SearchBar"

const today = new Date()
const mm = today.getMonth() + 1
const dd = today.getDate()
const todayString = `${today.getFullYear()}-${(mm > 9 ? '' : '0') + mm}-${(dd > 9 ? '' : '0') + dd}`

const newProjectId = `project${Date.now()}`
const newProject = {
    [newProjectId]: {
        'title': 'New Project',
        'category': 'Project',
        'startDate': todayString,
        'endDate': todayString,
        'context': '',
        'tags': []
    }
}

interface Props {
    renderTrigger: boolean,
    selection: string,
    changeSelection: Dispatch<SetStateAction<string>>,
    projectsData: object,
    updateProjects: (action: 'add' | 'remove', data: {} | string) => void
}

const sortProjects = (data: object): Array<object | string[]> => {
    const dataByYear = {}

    Object.keys(data).forEach(key => {
        const projectStartDate = new Date(data[key].startDate === '' ? Date.now() : data[key].startDate)

        if (!dataByYear[projectStartDate.getFullYear()]) {
            dataByYear[projectStartDate.getFullYear()] = []
        }

        const searchTerms = [
            ...data[key].title.toLowerCase().split(' '),
            ...(data[key]?.tags || []).map(tag => tag.toLowerCase()),
            ...(data[key]?.context?.toLowerCase() || '').split(' ')
        ]

        dataByYear[projectStartDate.getFullYear()].push({
            projectKey: key,
            startDate: projectStartDate,
            searchTerms: searchTerms
        })
    })

    Object.keys(dataByYear).forEach(key => {
        dataByYear[key].sort((a, b) => {
            return b.startDate - a.startDate
        })
    })

    const years = Object.keys(dataByYear).sort((a, b) => {
        return Number(b) - Number(a)
    })

    return [dataByYear, years]
}

const ProjectSelector: FC<Props> = ({renderTrigger, selection, changeSelection, projectsData, updateProjects}) => {
    const [sortedData, setSortedData] = useState({})
    const [years, setYears] = useState<string[]>([])
    const [filterTerms, setFilterTerms] = useState<string[]>([])

    useEffect(() => {
        const [tempData, tempYears] = sortProjects(projectsData)
        setSortedData(tempData)
        setYears(tempYears as string[])
    }, [projectsData, renderTrigger])

    return <Container>
        <Controls>
            <SearchBar setFilterTerms={setFilterTerms}/>
            <button onClick={() => updateProjects('add', newProject)}>Add project</button>
        </Controls>
        {years.map(year => {
            return <div key={year}>
                <h2>{year}</h2>
                <ProjectContainer>
                    {sortedData[year].filter(project => {
                        return filterTerms.length === 0 || !filterTerms.some(term => !project.searchTerms.includes(term.toLowerCase()))
                    }).map(({projectKey}) => {
                        return projectsData[projectKey] && <ProjectSummary key={projectKey}
                                                                           id={projectKey}
                                                                           selected={selection === projectKey}
                                                                           setSelected={changeSelection}
                                                                           {...projectsData[projectKey]}
                        />
                    })}
                </ProjectContainer>
            </div>
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

const Controls = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export default ProjectSelector;