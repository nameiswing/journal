import styled from "@emotion/styled";

const FlexContainer = ({
    alignItems,
    justifyContent,
    children,
    col,
    gap,
    width,
    height,
    padding
}) => {
    return (
        <Container
            alignItems = { alignItems }
            col = { col }
            gap = { gap }
            justifyContent = { justifyContent }
            width = { width }
            padding = { padding }
            height = { height }
        >
            { children }
        </Container>
    )
}

export default FlexContainer

const Container = styled.div`
    display: flex;
    align-items: ${ props => props.alignItems };
    justify-content: ${ props => props.justifyContent };
    flex-direction: ${ props => props.col && 'column'};
    gap: ${ props => props.gap };
    width: ${ props => props.width };
    height: ${ props => props.height };
    padding: ${ props => props.padding };
`
export const FlexWrap = styled.div`
    display: flex;
    padding: .75rem 1.25rem;
`