import FlexContainer, { FlexWrap } from "./utils/FlexContainer"
import { useGlobalStates } from "../App"
import styled from "@emotion/styled";
import { AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Drawer from "./Drawer";



const Todos = () => {

    const { 
        notes, 
        setNotes,
    } = useGlobalStates();

    const [ details, setDetails ] = useState({});
    const [ isOpen, setIsOpen ] = useState(false);

    function drawerToggle() {
        setIsOpen(!isOpen)
    }

    function setCheckedStatus(e, idTag, checked) {
        e.stopPropagation();
        const itemIndex = notes.findIndex( item => item.id === idTag);
        
        setNotes( items => {
            items[itemIndex].checked = !checked;
            return [...items]
        })
    };
    function deleteNote(idTag) {
        let response = window.confirm("Delete Note?")
        if(!response) return;

        const parent = document.getElementById(idTag);
        parent.style.transform = "translateX(-120%)";
        parent.style.opacity = 0;

        setTimeout( () => setNotes( () => notes.filter( note => note.id !== idTag)), 200)
    };
    
    return (
        <TodoContainer>
            <FlexContainer  col>
                { notes.length > 0 &&
                    notes.map( note => (
                        <InfoContainer key={note.id} id={note.id}>
                            <CustomCheckMark onChange={(e)=>setCheckedStatus(e, note.id, note.checked)}>
                                <input type="checkbox" defaultChecked={note.checked}/>
                                <b>{note.date && note.date + ' • '}{ note.title }</b>
                                <span></span>
                            </CustomCheckMark>
                            <IconButton onClick={()=>{
                                setIsOpen(true);
                                setDetails({
                                    heading: note.title,
                                    body: note.body,
                                    date: note.date
                                })
                            }}>
                                <AiOutlineMore color="var(--primary-color)"/>
                            </IconButton>
                            <IconButton onClick={() => deleteNote(note.id)}>
                                <AiOutlineDelete color="var(--error)"/>
                            </IconButton>
                        </InfoContainer>
                    ))
                }
            </FlexContainer>
            <Drawer details={details} drawn={isOpen} clickHandler={drawerToggle}/>
        </TodoContainer>
    )
}

export default Todos

const TodoContainer = styled.div`
    padding: .75rem;
    margin-top: .75rem;
    overflow-y: scroll;
    height: 100%;
    background-color: var(--grey-light4);
    border-radius: .25rem;
    position: relative;

    &::-webkit-scrollbar {
        width: .5rem;
        background-color: var(--grey-light4);
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: .25rem;
        background-color: var(--grey-light3);
        
        &:hover {
            background-color: var(--grey-light2);
        }
    }
`
const InfoContainer = styled(FlexWrap)`
    justify-content: space-between;
    border-radius: .25rem;
    color: var(--grey-main);
    background-color: var(--grey-light5);
    box-shadow: 0 2px 4px var(--grey-light3);
    padding: .875rem 1rem .875rem 1rem;
    margin-bottom: .25rem;

    &:hover{
        box-shadow: 0 2px 6px var(--grey-light2);
        background-color: #fff;
    }
`
const CustomCheckMark = styled.label`
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transform: translateY(.25rem);
    width: 100%;

    &:hover input ~ span {
        background-color: var(--primary-color);
        opacity: .75;
    }
    b {
        display: inline-block;
        font-weight: 400;
        transform: translateY(.25rem);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: var(--grey-main);
        width: calc(100% - 4rem);
    }
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    input:checked ~ b {
        text-decoration: line-through;
        text-decoration-color: var(--secondary-color);
        text-decoration-thickness: .125rem;
        opacity: .5;
    }
    input:checked ~ span {
        background-color: var(--primary-color);
    }
    input:checked ~ span:after {
        display: block;
    }
    span {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        transform: translateY(.25rem);
        background-color: var(--primary-color-light);

        &::after {
            content: "";
            position: absolute;
            display: none;
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
`