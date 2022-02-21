import {FC, Dispatch, SetStateAction, useEffect, useState} from "react"
import styled from "styled-components"

import ProjectSummary from "./ProjectSummary"

const newProject = {
    'project99': {
        'title': 'New Project',
        'category': 'project',
        'description': '',
        'startDate': '',
        'endDate': '',
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

        dataByYear[projectStartDate.getFullYear()].push({projectKey: key, startDate: projectStartDate})
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

const ProjectSelector: FC<Props> = ({selection, changeSelection, projectsData, updateProjects}) => {
    const [sortedData, setSortedData] = useState({})
    const [years, setYears] = useState<string[]>([])

    useEffect(() => {
        const [tempData, tempYears] = sortProjects(projectsData)
        setSortedData(tempData)
        setYears(tempYears as string[])
    }, [projectsData])

    console.log(sortedData)
    console.log(projectsData)

    return <Container>
        <button onClick={() => updateProjects('add', newProject)}>Add project</button>
        {years.map(year => {
            return <div key={year}>
                <h3>{year}</h3>
                {sortedData[year].map(({projectKey}) => {
                    return projectsData[projectKey] && <ProjectSummary key={projectKey}
                                                                       id={projectKey}
                                                                       name={projectsData[projectKey].title}
                                                                       description={projectsData[projectKey].description}
                                                                       selected={selection === projectKey}
                                                                       setSelected={changeSelection}
                    />
                })}
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

export default ProjectSelector;