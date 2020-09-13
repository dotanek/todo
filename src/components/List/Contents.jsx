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

const TaskGroups = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    padding-top: 10px;
    overflow: auto;
`

class Contents extends Component {
    state = {
        taskView:'this-week',
    }

    // -- Renders --

    renderTaskGroups = () => {
        const taskGroups = this.props.taskGroups;

        switch(this.state.taskView) {
            case 'today': 
                return <TaskGroup group={taskGroups[0]} tasks={taskGroups[0].tasks}></TaskGroup>
            
            case 'tomorrow':
                return <TaskGroup group={taskGroups[1]} tasks={taskGroups[1].tasks}></TaskGroup>

            case 'this-week':
                return taskGroups.map(g => {
                    return <TaskGroup key={g.date} group={g} tasks={g.tasks} />
                });

            default:break;
        }
    }

    render() {
        return (
            <Container navToggle={this.props.navToggle}>
                <Title>This week</Title>
                <TaskGroups>
                    {this.renderTaskGroups()}
                    {/*<TaskGroup name='Today' />
                    <TaskGroup name='Tomorrow' />
                    <TaskGroup name='Saturday' />
                    <TaskGroup name='Completed' />*/}
                </TaskGroups>
            </Container>
        );
    }
}
 
export default Contents;