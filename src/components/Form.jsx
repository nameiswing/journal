import FlexContainer from "./utils/FlexContainer";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";
import { useGlobalStates } from "../App";
import uuid from 'react-uuid';
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
    saveBtn: {
        padding: ".375rem .875rem",
        marginLeft: ".5rem",
        borderRadius: ".5rem",
        width: "45%",
        fontSize: "1rem",
        borderWidth: "2px",

        "&:hover": {
            borderWidth: "2px",
        }
    },
}));

//COMPONENT FUNCTION STARTS HERE
const Form = () => {

    const { 
        inputValues, 
        setInputValues, 
        notes, 
        setNotes 
    } = useGlobalStates();
    
    const classes = useStyles();

    function handleTitleChange(e) {
        setInputValues({...inputValues, title: e.target.value})
    };
    function handleDateChange(e) {
        setInputValues({...inputValues, date: e.target.value})
    };
    function handleBodyContentChange(e) {
        setInputValues({...inputValues, body: e.target.value})
    };
    function saveInputValues() {
        let titleValue = inputValues.title.replace(/\s/g, '').length > 0;
        let bodyValue = inputValues.body.replace(/\s/g, '').length > 0;
        if( !titleValue || !bodyValue ) return;

        setNotes([...notes, {...inputValues, id: uuid() }]);
        clearInput();
    };
    function clearInput() {
        setInputValues({ title: '', body: '', checked: false, date: '' });
    };

    useEffect( () => console.log(notes), [notes])


    return (
        <StyledForm 
            onSubmit={ e => {
                e.preventDefault();
                return saveInputValues();
            }}
        >
            <FlexContainer col>
                <StyledLabel htmlFor="title">Task</StyledLabel>
                <StyledInput
                    value={inputValues.title}
                    type="text"
                    name="title"
                    placeholder="Keep it short."
                    onChange={ e => handleTitleChange(e)}
                    required
                />
            </FlexContainer>
            <FlexContainer col>
                <StyledLabel htmlFor="date">Date</StyledLabel>
                <StyledInput
                    value={inputValues.date}
                    type="date"
                    name="date"
                    // placeholder="Keep it short."
                    required
                    onChange={ e => handleDateChange(e)}
                />
            </FlexContainer>
            <FlexContainer col>
                <StyledLabel htmlFor="notes">My Thoughts</StyledLabel>
                <StyledTextArea
                    value={inputValues.body}
                    name="notes"
                    placeholder="Can be long but don't write a book."
                    onChange={ e => handleBodyContentChange(e) }
                    required
                />
            </FlexContainer>
            <FlexContainer justifyContent="center">
                <Button
                    className={classes.saveBtn}
                    color="primary"
                    variant="outlined"
                    size="small"
                    disableElevation
                    onClick={clearInput}
                >
                    Clear
                </Button>
                <Button
                    className={classes.saveBtn}
                    color="primary"
                    variant="contained"
                    // startIcon={<AiOutlineSave />}
                    size="small"
                    disableElevation
                    onClick={saveInputValues}
                >
                    Save
                </Button>
            </FlexContainer>
        </StyledForm>
    );
};

export default Form;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
`;
const StyledInput = styled.input`
    border: 0;
    outline: 0;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    color: var(--grey-main);
    border: 2px solid var(--grey-light4);
    background-color: var(--grey-light5);
    transition: 0.2s;
    position: relative;
    width: 100%;

    &::placeholder {
        color: var(--grey-light2);
        /* font-size: 0.875rem; */
        font-weight: 300;
    }

    &:hover {
        border: 2px solid var(--grey-light3);
    }
    &:focus {
        border: 2px solid var(--primary-color);
        background-color: #fff;
    }
`;
const StyledLabel = styled.label`
    font-weight: 400;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    color: var(--grey-light);
    text-transform: uppercase;
`;
const StyledTextArea = styled.textarea`
    border: 0;
    outline: 0;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: var(--grey-main);
    border: 2px solid var(--grey-light4);
    background-color: var(--grey-light5);
    transition: 0.2s;
    position: relative;
    resize: none;
    height: 8rem;
    font-weight: 400;
    width: 100%;

    &::placeholder {
        color: var(--grey-light2);
        /* font-size: 0.875rem; */
        font-weight: 300;
    }

    &:hover {
        border: 2px solid var(--grey-light3);
    }
    &:focus {
        border: 2px solid var(--primary-color);
        background-color: #fff;
    }
`;
