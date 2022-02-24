import {FC, useReducer} from "react"

import {DetailWindowProps} from "../../../../common/types"
import TagsInput from "./TagsInput";
import {
    CustomInput,
    CustomLabel,
    CustomTextarea,
    FullWidthDiv,
    HalfWidthDiv,
    LayoutContainer
} from "../styledComponents";

const reducer = (state, {field, value}) => {
    return {
        ...state,
        [field]: value
    }
}

const ProjectForm: FC<DetailWindowProps> = ({_id, data, setIsEditing, updateProject}) => {
    const [state, dispatch] = useReducer(reducer, data)
    const {title, description, startDate, endDate, tags} = state

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
                <CustomLabel htmlFor="title">Title </CustomLabel>
                <CustomInput id="title" name="title" type="text" placeholder="Project Title" value={title}
                             onChange={onChange}/>
            </FullWidthDiv>
            <FullWidthDiv>
                <CustomLabel htmlFor="description">Description </CustomLabel>
                <CustomTextarea
                    id="description"
                    name="description"
                    placeholder="Project Description"
                    rows={2}
                    value={description}
                    onChange={onChange}
                />
            </FullWidthDiv>
            <HalfWidthDiv>
                <CustomLabel htmlFor="startDate">Start Date </CustomLabel>
                <CustomInput id="startDate" name="startDate" type="date" value={startDate}
                             onChange={onChange}/>
            </HalfWidthDiv>
            <HalfWidthDiv>
                <CustomLabel htmlFor="endDate">End Date </CustomLabel>
                <CustomInput id="endDate" name="endDate" type="date" value={endDate}
                             onChange={onChange}/>
            </HalfWidthDiv>
            <FullWidthDiv>
                <CustomLabel>Tags</CustomLabel>
                <TagsInput tags={tags} syncTags={syncTags}/>
            </FullWidthDiv>
            <FullWidthDiv>
                <button onClick={handleSave} type="button">Save Changes</button>
                <button onClick={() => updateProject('remove', _id)} type="button">Delete project</button>
            </FullWidthDiv>
        </LayoutContainer>
    </form>
}

export default ProjectForm;