import {FC, useState} from "react"

import {TagsField, TagContainer, TagText, DeleteIcon, CustomInput} from "../../../shared/styledComponents"

interface Props {
    tags: string[],
    syncTags: (newTags: string[]) => void
}

const TagsInput: FC<Props> = ({tags = [], syncTags}) => {
    const [inputVal, setInputVal] = useState('')

    const handleInput = (e) => {
        setInputVal(e.target.value)
    }

    const handleCreate = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            syncTags([...tags, e.target.value])
            setInputVal('')
        }
    }

    const handleDelete = (tag) => {
        syncTags([...tags].filter(val => val != tag))
    }

    return <TagsField editing>
        {tags.map((tag, index) => (
            <TagContainer key={index}>
                <TagText>{tag}</TagText>
                <DeleteIcon src="/icons/close-circle.svg"
                            alt="close"
                            height={17}
                            width={17}
                            onClick={() => handleDelete(tag)}
                />
            </TagContainer>
        ))}
        <CustomInput id="tag"
                     name="newTag"
                     type="text"
                     placeholder="Press enter to add a tag"
                     value={inputVal}
                     onChange={handleInput}
                     onKeyPress={handleCreate}
        />
    </TagsField>
}

export default TagsInput;