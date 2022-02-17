import styled from "styled-components"
import {FC, useReducer} from "react"

import {Props} from "./propsInterface"
import TagsInput from "./TagsInput";

const reducer = (state, {field, value}) => {
    return {
        ...state,
        [field]: value
    }
}

const ProjectForm: FC<Props> = ({_id, data, updateProject}) => {
    const [state, dispatch] = useReducer(reducer, data)
    const {title, description, startDate, endDate, tags} = state

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('submitted')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.type != 'textarea') {
            e.preventDefault()
        }
    }

    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    }

    const syncTags = (newTags: string[]) => {
        dispatch({field: 'tags', value: newTags})
    }

    return <Container>
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
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
            <TagsInput tags={tags} syncTags={syncTags}/>
            <div>
                <button onClick={() => updateProject('update', {[_id]: state})} type="button">Save Changes</button>
                <button onClick={() => updateProject('remove', _id)} type="button">Delete project</button>
            </div>
        </form>
    </Container>
}

const Container = styled.div``

export default ProjectForm;