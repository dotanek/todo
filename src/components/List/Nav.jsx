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

    generateCounters = () => {
        let counters = {};

        let today = this.props.taskGroups.find(g => g.date === 'today');
        counters.today = (typeof today !== 'undefined') ? today.tasks.length : 0;

        let tomorrow = this.props.taskGroups.find(g => g.date === 'tomorrow');
        counters.tomorrow = (typeof tomorrow !== 'undefined') ? tomorrow.tasks.length : 0;

        return counters;
    }

    render() { // Each tab should be an object and have its own group picking function.
        return (
            <Container ref={this.props.navRef} navToggle={this.props.navToggle}>
                <User>Username</User>
                <NavItem label='Today' icon={iconToday} counter={this.generateCounters().today} />
                <NavItem label='Tomorrow' icon={iconToday} counter={this.generateCounters().tomorrow} />
                <NavItem label='This week' icon={iconToday} counter='3'/>
                <NavItem label='Next week' icon={iconToday} counter='50'/>
            </Container>
        );
    }
}
export default Nav;