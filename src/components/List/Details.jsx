import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.detailsToggle ? '30%' : '0%'};
    height: 100%;
    transition: 0.2s ease-in-out;
`

const Title = styled.input`
    display: flex;
    width: calc(100% - 20px);
    padding-left: 20px;
    height: 40px;
    font-size: 18px;
    align-items: center;
    font-weight: bold;
    background-color: rgba(0,0,0,0.1);
`

const Description = styled.textarea`
    width: calc(100% - 40px);
    padding: 20px;
    font-size: 14px;
`

class Details extends Component {
    state = {  }
    render() { 
        if(!this.props.activeTask) {
            return (
                <Container detailsToggle={this.props.detailsToggle} />
            );
        }

        return (
            <Container detailsToggle={this.props.detailsToggle}>
                <Title type='text' value={this.props.activeTask.title} onChange={() => console.log('ye')}/>
                <Description placeholder='Click here and type to add a description.' />
            </Container>
        );
    }
}
 
export default Details;