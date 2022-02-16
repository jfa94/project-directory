import styled from "styled-components"
import {useReducer, useState} from "react";

interface Data {
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    tags: string[]
}

const reducer = (state, {field, value}) => {
    return {
        ...state,
        [field]: value
    }
}

function ProjectForm({data}) {
    const [state, dispatch] = useReducer(reducer, data)
    const {title, description, startDate, endDate, tags} = state

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('submitted')
    }

    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    return <Container>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title </label>
                <input id="title" name="title" type="text" placeholder="Project Title" value={title}
                       onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="description">Description </label>
                <textarea id="description" name="description" placeholder="Project Description" value={description}
                          onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="startDate">Start Date </label>
                <input id="startDate" name="startDate" type="date" value={startDate}
                          onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="endDate">End Date </label>
                <input id="endDate" name="endDate" type="date" value={endDate}
                       onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="tags">Tags </label>
                {/*TODO: add label picker*/}
            </div>
        </form>
    </Container>
}

const Container = styled.div``

export default ProjectForm;