import React, { Component } from 'react';
import styled from 'styled-components';

import Nav from './Nav';
import Contents from './Contents';
import Details from './Details';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 2px);
    margin: 0;
    padding: 0;
`

const Button = styled.div`
    position: fixed;
    left: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #105510;
    &:hover {
        cursor: pointer;
    }
`

class List extends Component {
    state = {
        navActive: true
    }

    buttonOnClick = () => {
        this.setState({navActive:!this.state.navActive});
    }

    render() { 
        return (
            <Container>
                <Nav active={this.state.navActive}/>
                <Contents navActive={this.state.navActive}/>
                <Details />
                <Button onClick={this.buttonOnClick} />
            </Container>
        );
    }
}
 
export default List;