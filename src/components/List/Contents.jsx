import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-left: ${props => props.navActive ? '250px' : '0px' };
    border-right: 1px solid rgba(0,0,0,0.1);
    transition: 0.2s ease-in-out;

    @media (max-width: 800px) {
        margin-left: 0px;
    }
`

class Contents extends Component {
    state = {  }
    render() {
        return (
            <Container navActive={this.props.navActive}>TEST</Container>
        );
    }
}
 
export default Contents;