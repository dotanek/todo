import React, { Component } from 'react';
import styled from 'styled-components';

import iconToday from '../../resources/icon-today.svg';

import NavItem from './NavItem';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 250px;
    max-width: 100%;
    height: calc(100% - 8px);
    padding-top: 8px;
    background-color: #eeeeee;
    border-right: 1px solid rgba(0,0,0,0.1);
    transition: 0.2s ease-in-out;
    margin-left: ${props => props.navToggle ? '0px' : '-250px'};
    z-index: 1000;
    
    @media (max-width: 900px) {
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    }
`

const User = styled.div`
    display: flex;
    width: 90%;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 22px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.05);
`

class Nav extends Component {
    state = { }

    // -- Renders --

    renderTaskTabs = () => {
        return this.props.taskTabs.map(t => {
            let taskGroups = this.props.taskGroups.filter(tg => t.groupFilter(tg));
            let counter = 0;

            if (taskGroups.length) {
                taskGroups.forEach(tg => counter += tg.tasks.length);
            }

            return (
                <NavItem
                    key={t.id}
                    label={t.label}
                    icon={iconToday}
                    counter={counter}
                    tabActive={t === this.props.activeTab}
                    onClickTaskTab={() => this.props.onClickTaskTab(t)}
                />
            );
        });
    }

    // -- Others -- //

    generateCounters = () => {
        let counters = [];

        console.log(this.props.taskGroups);
        this.props.taskTabs.forEach(t => {
            let taskGroups = this.props.taskGroups.filter(tg => t.filter(tg));
            counters.push(taskGroups.length);
        });

        return counters;
    }

    render() {
        return (
            <Container className='noSelect' ref={this.props.navRef} navToggle={this.props.navToggle}>
                <User>Username</User>
                {this.renderTaskTabs()}
            </Container>
        );
    }
}
export default Nav;