import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 35%;
    margin-left: ${props => props.detailsToggle ? '65%' : '100%' };
    background-color: #ffffff;
    height: 100%;
    transition: 0.2s ease-in-out;
    border-left: 1px solid rgba(0,0,0,0.1);

    @media (max-width: 700px) {
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
        margin-left: ${props => props.detailsToggle ? '30%' : '100%' };
        width: 70%;
    }

    @media (max-width: 500px) {
        box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
        margin-left: ${props => props.detailsToggle ? '0%' : '100%' };
        width: 100%;
    }
`

const Header = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    background-color: rgba(0,0,0,0.05);
`

const Return = styled.div`
    position: relative;
    display: flex;
    width: 40px;
    height: 50px;
    justify-content: center;
    align-items: center;

    div {
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: #000000;
        border-radius: 1px 0px 0px 1px;
    }

    &:hover {
        cursor: pointer;
    }
`

const Rect1 = styled.div`
    transform-origin: bottom left;
    transform: rotate(-30deg);
`

const Rect2 = styled.div`

    transform-origin: top left;
    transform: rotate(30deg);
`

const Date = styled.div`
    display: flex;
    flex-grow: 1;
    height: 50px;
    font-size: 17px;
    padding-left: 20px;
    align-items: center;

    @media (max-width:700px) {
        padding-left: 0px;
    }
`

const Title = styled.input`
    display: flex;
    width: calc(100% - 20px);
    padding-left: 20px;
    height: 60px;
    font-size: 18px;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid rgba(0,0,0,0.1);
`

const Description = styled.textarea`
    width: calc(100% - 40px);
    padding: 20px;
    font-size: 14px;
`

class Details extends Component {
    state = {  }

    renderReturn = () => {
        if (window.innerWidth <= 700) {
            return (
                <Return onClick={this.props.onClickDetailsReturn}>
                    <Rect1 />
                    <Rect2 />
                </Return>
            );
        }
    }

    render() { 
        if(!this.props.activeTask) {
            return (
                <Container ref={this.props.detailsRef} detailsToggle={this.props.detailsToggle} />
            );
        }

        return (
            <Container ref={this.props.detailsRef} detailsToggle={this.props.detailsToggle}>
                <Header>
                    {this.renderReturn()}
                    <Date>25th September</Date>
                </Header>
                <Title type='text' value={this.props.activeTask.title} onChange={() => console.log('ye')}/>
                <Description placeholder='Click here and type to add a description.' />
            </Container>
        );
    }
}
 
export default Details;