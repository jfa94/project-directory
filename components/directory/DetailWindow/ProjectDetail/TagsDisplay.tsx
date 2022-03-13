import {FC} from "react"

import {TagsField, TagContainer, TagText} from "../../../shared/styledComponents"

interface Props {
    tags: string[],
}

const TagsDisplay: FC<Props> = ({tags}) => {
    return <TagsField>
        {tags.map((tag, index) => (
            <TagContainer key={index}>
                <TagText>{tag}</TagText>
            </TagContainer>
        ))}
    </TagsField>
}

export default TagsDisplay;