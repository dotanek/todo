import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    font-size: 14px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    margin-top: 4px;
    color: #303030;

    &:hover {
        background-color: rgba(0,0,0,0.1);
        cursor: pointer;
    } 
`

const Checkbox = styled.input`
    width: 10px;
    height: 10px;
    margin: 10px;
    appearance: none;
    border: 1px solid #404040;
    transition: 0.1s ease-in-out;

    &:hover {
        cursor: pointer;
    }

    &:active {
        width: 14px;
        height: 14px;
        margin: 8px;
    }

    &:checked {
        background-color: #404040;
    }
`

class Task extends Component {
    state = { }

    render() { 
        return (
            <Container>
                <Checkbox type='checkbox' />
                {this.props.task.description}
            </Container>
        );
    }
}
 
export default Task;