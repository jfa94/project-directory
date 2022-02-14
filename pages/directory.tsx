import styled from "styled-components";

import {SelectedProjectContextProvider} from "../context/SelectedProjectContext";
import ProjectSelector from '../components/directory/ProjectSelector/index'
import DetailWindow from '../components/directory/DetailWindow/index'

function Directory() {
    return <SelectedProjectContextProvider>
        <Container>
            <ProjectSelectorSection>
                <ProjectSelector/>
            </ProjectSelectorSection>
            <DetailWindowContainer>
                <DetailWindow/>
            </DetailWindowContainer>
        </Container>
    </SelectedProjectContextProvider>
}

const Container = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  border-top: 1px solid whitesmoke;
`

const ProjectSelectorSection = styled.section`
  flex-basis: 25vw;
`

const DetailWindowContainer = styled.div`
  flex-basis: 75vw;
`

export default Directory;