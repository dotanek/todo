import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 5px;
    /*border-bottom: 1px solid black;*/
`

const Label = styled.div`
    display: flex;
    width: calc(100% - 5px);
    height: 30px;
    align-items: center;
    padding-left: 5px;
    font-size: 16px;
    color: #606060;
    /*background-color: rgba(0,0,0,0.1);*/
`

const Toggle = styled.div`
    position: relative;
    display: flex;
    width: 30px;
    height: 100%;
    justify-content: center;
    align-items: center;
    /*align-items:background-color: rgba(0,0,0,0.1);*/
    transform: rotate(-90deg);

    div {
        position: absolute;
        width: 6px;
        height: 1.5px;
        background-color: #606060;
    }
`

const Rect1 = styled.div`
    transform-origin: right bottom;
    transform: translate(-3px,3px) rotate(45deg);
`

const Rect2 = styled.div`
    transform-origin: left bottom;
    transform: translate(3px,3px) rotate(-45deg);
`

const Text = styled.div`
    display: flex;
    width: auto;
    align-items: center;
`

const Line = styled.div`
    display: flex;
    flex-grow: 1;
    margin-left: 10px;
    margin-right: 20px;
    border-bottom: 1px solid #999999;
`

class TaskGroup extends Component {
    state = {  }
    render() {
        return ( 
            <Container>
                <Label>
                    <Toggle>
                        <Rect1 />
                        <Rect2 />
                    </Toggle>
                    <Text>{this.props.name}</Text>
                    <Line />
                </Label>
            </Container>
        );
    }
}
 
export default TaskGroup;