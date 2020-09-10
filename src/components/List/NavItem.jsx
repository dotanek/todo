import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 90%;
    height: 40px;
    margin-top: 2px;
    border-radius: 5px;
    /*border: 1px solid black;*/
    &:hover {
        background-color: rgba(0,0,0,0.1);
        cursor: pointer;
    }
`

const Icon = styled.div`
    display: flex;
    width: 40px;
    justify-content: center;
    align-items: center;

    img {
        width: 80%;
        height: 80%;
        opacity: 0.7;
    }
`

const Label = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    font-size: 15px;
`

const Counter = styled.div`
    display: flex;
    width: 28px;
    height: 28px;
    margin: 6px;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border-radius: 14px;
    background-color: rgba(0,0,0,0.1);
`

class NavItem extends Component {
    state = {  }
    render() { 
        return (
            <Container>
                <Icon><img src={this.props.icon} alt='welp'/></Icon>
                <Label>{this.props.label}</Label>
                <Counter>{this.props.counter}</Counter>
            </Container>
        );
    }
}

export default NavItem;