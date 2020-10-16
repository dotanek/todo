import React, { Component } from 'react';
import styled from 'styled-components';

import Task from './Task';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 5px;
`

const Label = styled.div`
    display: flex;
    width: calc(100% - 5px);
    height: 30px;
    align-items: center;
    padding-left: 5px;
    font-size: 16px;
    color: #606060;

    &:hover {
        cursor: pointer;
    }
`

const Toggle = styled.div`
    position: relative;
    display: flex;
    width: 25px;
    height: 100%;
    justify-content: center;
    align-items: center;
    transform: ${props => props.groupToggle ? 'translateY(-2px) rotate(0deg)' : 'rotate(-90deg)'};
    transition: 0.2s ease-in-out;

    div {
        position: absolute;
        width: 6px;
        height: 1.5px;
        background-color: #606060;
    }
`

const Rect1 = styled.div`
    transform-origin: right bottom;
    transform: translate(-3px,4px) rotate(45deg);
`

const Rect2 = styled.div`
    transform-origin: left bottom;
    transform: translate(3px,4px) rotate(-45deg);
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

const Amount = styled.div`
    display: flex;
    width: 20px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    font-size: 15px;
`

const Tasks = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 60px);
    padding-left: 30px;
    padding-right: 30px;
`

const Placeholder = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    font-size: 15px;
    color: #606060;
`

class TaskGroup extends Component {
    state = {  
        groupToggle: true,
    }

     // -- Events -- 

    onClickLabel = () => {
        this.setState({ groupToggle:!this.state.groupToggle });
    }

    // -- Renders -- 

    renderTasks = () => {
        const tasks = this.props.taskGroup.tasks;
        if (tasks && tasks.length > 0) {
            return tasks.map(t => {
                return (
                    <Task
                        key={t._id}
                        task={t}
                        taskActive={this.props.activeTask === t}
                        onClickTask={() => this.props.onClickTask(t)}
                    />
                );
            });
        } else {
            return <Placeholder>There are no tasks in this group.</Placeholder>
        }
    }

    // -- Other --

    formatLabel = () => {
        if (this.props.taskGroup.completed) {
            return 'Completed';
        }

        if (!this.props.taskGroup.date) {
            return 'No date';
        }

        let today = new Date();
        let date = this.props.taskGroup.date;

        if (
            date.getYear() === today.getYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        ) {
            return 'Today';
        }

        if (
            date.getYear() === today.getYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate() + 1
        ) {
            return 'Tomorrow';
        }

        const months = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];

        let day = months[(date.getDay() + 6) % 7];

        let d = date.getDate();
        let m = date.getMonth() + 1;
        console.log(m);
        let y = date.getFullYear();

        return `${day} ${d > 9 ? d : '0' + d}.${m > 9 ? m : '0' + m}.${y}`
    }

    render() {
        return ( 
            <Container>
                <Label onClick={this.onClickLabel}>
                    <Toggle groupToggle={this.state.groupToggle}>
                        <Rect1 />
                        <Rect2 />
                    </Toggle>
                    <Text>{this.formatLabel()}</Text>
                    <Line />
                    <Amount>{this.props.taskGroup.tasks.length}</Amount>
                </Label>
                <Tasks>
                    {this.state.groupToggle && this.renderTasks()}
                </Tasks>
            </Container>
        );
    }
}
 
export default TaskGroup;