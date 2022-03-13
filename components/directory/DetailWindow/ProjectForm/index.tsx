import {FC, useReducer} from "react"

import {DetailWindowProps} from "../../../../common/types"
import TagsInput from "./TagsInput"
import {
    Input,
    Label,
    Textarea,
    FullWidthDiv,
    HalfWidthDiv,
    LayoutContainer, QuarterWidthDiv,
} from "../../../shared/styledComponents"

const reducer = (state, {field, value}) => {
    return {
        ...state,
        [field]: value
    }
}

const ProjectForm: FC<DetailWindowProps> = ({_id, data, setIsEditing, updateProject}) => {
    const [state, dispatch] = useReducer(reducer, data)

    const handleSubmit = (e) => {
        e.preventDefault()
        // alert('submitted')
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

    const handleSave = () => {
        updateProject('update', {[_id]: state})
        setIsEditing(prevState => !prevState)
    }

    return <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <LayoutContainer>
            <FullWidthDiv>
                <Label htmlFor="title">Title </Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Project Title"
                    value={state.title}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <HalfWidthDiv>
                <Label htmlFor="category">Category </Label>
                <div onChange={onChange}>
                    <input
                        type="radio"
                        value="Project"
                        checked={state.category === "Project"}
                        name="category"
                        readOnly
                    />Project
                    <input
                        type="radio"
                        value="Anecdote"
                        checked={state.category === "Anecdote"}
                        name="category"
                        readOnly
                    />Anecdote
                </div>
            </HalfWidthDiv>
            <QuarterWidthDiv>
                <Label htmlFor="startDate">Start Date </Label>
                <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={state.startDate}
                    onChange={onChange}
                />
            </QuarterWidthDiv>
            <QuarterWidthDiv>
                <Label htmlFor="endDate">End Date </Label>
                <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={state.endDate}
                    onChange={onChange}
                />
            </QuarterWidthDiv>
            <FullWidthDiv>
                <Label htmlFor="message">Message </Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Anecdote message"
                    rows={2}
                    value={state.message}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <FullWidthDiv>
                <Label htmlFor="context">Context </Label>
                <Textarea
                    id="context"
                    name="context"
                    placeholder="Project context"
                    rows={2}
                    value={state.context}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <FullWidthDiv>
                <Label htmlFor="actions">Actions </Label>
                <Textarea
                    id="actions"
                    name="actions"
                    placeholder="Project actions"
                    rows={2}
                    value={state.actions}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <FullWidthDiv>
                <Label htmlFor="impact">Impact </Label>
                <Textarea
                    id="impact"
                    name="impact"
                    placeholder="Project impact"
                    rows={2}
                    value={state.impact}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <FullWidthDiv>
                <Label htmlFor="learnings">Learnings </Label>
                <Textarea
                    id="learnings"
                    name="learnings"
                    placeholder="Project learnings"
                    rows={2}
                    value={state.learnings}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <FullWidthDiv>
                <Label>Tags</Label>
                <TagsInput tags={state.tags} syncTags={syncTags}/>
            </FullWidthDiv>
            <FullWidthDiv>
                <button onClick={handleSave} type="button">Save Changes</button>
                <button onClick={() => updateProject('remove', _id)} type="button">Delete project</button>
            </FullWidthDiv>
        </LayoutContainer>
    </form>
}

export default ProjectForm;