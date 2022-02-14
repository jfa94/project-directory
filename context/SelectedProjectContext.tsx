import React, {useState, createContext, FC} from 'react'

const SelectedProjectContext = createContext(null)

const SelectedProjectContextProvider:FC = (props) => {
    const [selectedProject, setSelectedProject] = useState(0)

    return (
        <SelectedProjectContext.Provider value={[selectedProject, setSelectedProject]}>
            {props.children}
        </SelectedProjectContext.Provider>
    );
}

export {SelectedProjectContextProvider, SelectedProjectContext}