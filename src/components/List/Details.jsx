import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: ${props => props.detailsToggle ? '30%' : '0%'};
    height: 100%;
    transition: 0.2s ease-in-out;
`

class Details extends Component {
    state = {  }
    render() { 
        return (
            <Container detailsToggle={this.props.detailsToggle}></Container>
        );
    }
}
 
export default Details;