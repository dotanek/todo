import React, { Component } from 'react';
import styled from 'styled-components';

import TaskGroup from './TaskGroup';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    margin-left: ${props => props.navToggle ? '250px' : '0px'};
    border-right: 1px solid rgba(0,0,0,0.1);
    transition: 0.2s ease-in-out;

    @media (max-width: 900px) {
        margin-left: 0px;
    }
`
const Title = styled.div`
    display: flex;
    width: calc(100% - 30px);
    height: 80px;
    align-items: center;
    padding-left: 30px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    font-size: 30px;
    font-weight: bold;
`

const Tasks = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    padding-top: 10px;
    overflow: auto;
`


class Contents extends Component {
    state = {  }
    render() {
        return (
            <Container navToggle={this.props.navToggle}>
                <Title>Today</Title>
                <Tasks>
                    <TaskGroup name='Today'></TaskGroup>
                    <TaskGroup name='Tomorrow'></TaskGroup>
                    <TaskGroup name='Saturday'></TaskGroup>
                </Tasks>
            </Container>
        );
    }
}
 
export default Contents;