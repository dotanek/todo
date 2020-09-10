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
    background-color: #d5e8ff;
    border-right: 1px solid rgba(0,0,0,0.1);
    transition: 0.2s ease-in-out;
    left: ${props => props.active ? '0px' : '-250px' };
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
    state = {  }
    render() { 
        return (
            <Container active={this.props.active}>
                <User>Username</User>
                <NavItem label='Today' icon={iconToday} counter='5'/>
                <NavItem label='Tomorrow' icon={iconToday} counter='2'/>
                <NavItem label='This week' icon={iconToday} counter='7'/>
                <NavItem label='Next week' icon={iconToday} counter='15'/>
            </Container>
        );
    }
}
export default Nav;