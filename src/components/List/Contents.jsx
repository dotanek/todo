import React, { Component } from 'react';
import styled from 'styled-components';

import TaskGroup from './TaskGroup';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    margin-left: ${props => props.navToggle ? '250px' : '0px'};
    margin-right: ${props => props.detailsToggle ? '35%' : '0%'};
    overflow: hidden;
    transition: 0.2s ease-in-out;

    @media (max-width: 900px) {
        margin-left: 0px;
    }

    @media (max-width: 500px) {
        margin-right: 0%;
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
    state = { }

    // -- Renders --

    renderTaskGroups = () => {
        return this.props.taskGroups
            .filter(tg => this.props.activeTab.groupFilter(tg))
            .map(tg => {
                return <TaskGroup key={tg.date} taskGroup={tg} activeTask={this.props.activeTask} onClickTask={(t) => this.props.onClickTask(t)}/>
            });
    }

    render() {
        return (
            <Container navToggle={this.props.navToggle} detailsToggle={this.props.detailsToggle}>
                <Title>{this.props.activeTab.label}</Title>
                <TaskGroups>
                    {this.renderTaskGroups()}
                </TaskGroups>
            </Container>
        );
    }
}
 
export default Contents;