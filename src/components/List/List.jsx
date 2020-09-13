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
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #105510;
    z-index: 1001;
    
    &:hover {
        cursor: pointer;
    }
`

const navTabs = {
    today: { label: 'Today', id:'today'},
    tomorrow: { label: 'Tomorrow', id:'tomorrow' },
    thisWeek: { label: 'This week', id: 'this-week' },
    nextWeek: { label: 'Next week', id: 'next-week' }
}

class List extends Component {
    state = {
        navToggle: (window.innerWidth >= 900),
        detailsToggle: (window.innerWidth >= 700),
        taskGroups: [],
        activeTab: navTabs.today
    }

    constructor(props) {
        super(props);
        this.navRef = React.createRef();
        this.buttonRef = React.createRef(); // This is temporary, will be deleted.
    }

    // -- Events --

    onResizeWindow = () => {
        let navToggle;
        let detailsToggle;

        if (window.innerWidth < 700) {
            navToggle = false;
            detailsToggle = false;
        } else if (window.innerWidth < 900) {
            navToggle = false;
            detailsToggle = true;
        } else {
            navToggle = true;
            detailsToggle = true;
        }

        if (typeof this.state.userNavToggle !== 'undefined' && this.state.userNavToggle === false) { 
            navToggle = false; // Once user has hidden the nav it should not appear on resize.
        }

        this.setState({ navToggle, detailsToggle });
    }

    onClickWindow = e => {
        if(
            (!this.navRef.current.contains(e.target) && !this.buttonRef.current.contains(e.target)) &&
            window.innerWidth < 900
        ) {
            this.setState({ navToggle:false }); // Hides navigation when clicking outside of it in mobile mode.
        }
    }

    onClickButton = () => { // Auto toggle and user toggle is spearated.
        if (typeof this.state.userNavToggle === 'undefined') {
            this.setState({ userNavToggle:!this.state.navToggle, navToggle:!this.state.navToggle });
        } else {
            this.setState({ userNavToggle:!this.state.userNavToggle, navToggle:!this.state.navToggle });
        }
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.onResizeWindow);
        window.addEventListener('click', this.onClickWindow);

        // Grouping tasks by date.

        let taskGroups = []; 

        const tasks = [
            { id:'task1', description:'Wyrzucić śmieci.', date:'today' },
            { id:'task2', description:'Zrobić pranie.', date:'today' },
            { id:'task3', description:'Pamiętaj aby strzelić bujakę po mieście i dostać limo.', date:'tomorrow' },
        ];

        tasks.forEach(t => {
            let target = taskGroups.find(g => g.date === t.date);

            if (typeof target === 'undefined') {
                taskGroups.push({ tasks:[t], date:t.date });
            } else {
                target.tasks.push(t);
            }
        });

        this.setState({ taskGroups });
    }

    render() { 
        return (
            <Container>
                <Nav activeTab={this.state.activeTab} navRef={this.navRef} navToggle={this.state.navToggle} taskGroups={this.state.taskGroups}/>
                <Contents navToggle={this.state.navToggle} taskGroups={this.state.taskGroups}/>
                <Details detailsToggle={this.state.detailsToggle}/>
                <Button ref={this.buttonRef} onClick={this.onClickButton}/>
            </Container>
        );
    }
}
 
export default List;