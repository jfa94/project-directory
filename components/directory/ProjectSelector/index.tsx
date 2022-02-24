import {FC, Dispatch, SetStateAction, useEffect, useState} from "react"
import styled from "styled-components"

import ProjectSummary from "./ProjectSummary"
import SearchBar from "./SearchBar"
import {ProjectProps} from "../../../common/types";

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

        const searchTerms = [
            ...data[key].title.toLowerCase().split(' '),
            ...data[key].tags.map(tag => tag.toLowerCase())
            , ...data[key].description.toLowerCase().split(' ')]

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

    console.log('data sorted')

    return [dataByYear, years]
}

const ProjectSelector: FC<Props> = ({selection, changeSelection, projectsData, updateProjects}) => {
    const [sortedData, setSortedData] = useState({})
    const [years, setYears] = useState<string[]>([])
    const [filterTerms, setFilterTerms] = useState<string[]>([])

    useEffect(() => {
        const [tempData, tempYears] = sortProjects(projectsData)
        setSortedData(tempData)
        setYears(tempYears as string[])
    }, [projectsData])

    return <Container>
        <Controls>
            <SearchBar setFilterTerms={setFilterTerms}/>
            <button onClick={() => updateProjects('add', newProject)}>Add project</button>
        </Controls>
        {years.map(year => {
            return <div key={year}>
                <h3>{year}</h3>
                {sortedData[year].filter(project => {
                    return filterTerms.length === 0 || !filterTerms.some(term => !project.searchTerms.includes(term.toLowerCase()))
                }).map(({projectKey}) => {
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

const Controls = styled.div`
  display: flex;
  gap: 0.75rem;
`

export default ProjectSelector;