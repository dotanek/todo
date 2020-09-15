import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 30px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    margin-top: 4px;
    color: #303030;
    background-color: ${props => props.taskActive ? 'rgba(0,0,255,0.1)' : 'none'};
    
    &:hover {
        background-color: rgba(0,0,0,0.1);
        cursor: pointer;
    } 
`

const Checkbox = styled.input`
    position: absolute;
    appearance: none;
    width: 10px;
    height: 10px;
    margin: 10px;
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

const Text = styled.div`
    display: flex;
    flex-grow: 1;
    height: 30px;
    margin-left: 30px;
    margin-right: 20px;
    align-items: center;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
`

class Task extends Component {
    state = { }

    onClickCheckbox = (e) => {
        e.stopPropagation();
        console.log('Checkbox clicked.');
    }

    render() { 
        return (
            <Container onClick={this.props.onClickTask} taskActive={this.props.taskActive}>
                <Checkbox type='checkbox' onClick={this.onClickCheckbox}/>
                <Text>{this.props.task.title}</Text>
            </Container>
        );
    }
}
 
export default Task;