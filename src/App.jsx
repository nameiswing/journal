import React, { useContext, useState, useEffect } from "react";
import FlexContainer from './components/utils/FlexContainer';
import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./mui-theme";
import Form from "./components/Form";
import Todos from "./components/Todos";
import styled from "@emotion/styled";


const GlobalStates = React.createContext();
export const useGlobalStates = () => useContext(GlobalStates);

const App = () => {

    const [ inputValues, setInputValues ] = useState({ 
        title:'', 
        body:'', 
        id: '', 
        checked: false, 
        date: new Date().toLocaleDateString('en-ca'),
    });
    
    const [ notes, setNotes ] = useState([...getNotesFromLocal()]);
    
    function getNotesFromLocal() {
        if(!!localStorage.getItem('todo-notes')) {
            return JSON.parse(localStorage.getItem('todo-notes'));
        } else {
            return [];
        };
    };

    let states = {
        notes, setNotes,
        inputValues, setInputValues
    }

    useEffect( () => localStorage.setItem('todo-notes', JSON.stringify(notes)), [notes, inputValues] )
    
    return (
        <GlobalStates.Provider value={ states }>
            <ThemeProvider theme={ muiTheme }>
                <FlexContainer 
                    col 
                    width="clamp(20rem, 95vw, 32rem)" 
                    height="clamp(40rem, 90vh, 50rem)"
                    padding="1rem"
                >
                    <Heading>My Coding Journal</Heading>
                    <Form />
                    <Todos />
                </FlexContainer>
            </ThemeProvider>
        </GlobalStates.Provider>
    )
}

export default App

const Heading = styled.h1`
    font-size: 1.875rem;
    color: var(--primary-color);
`