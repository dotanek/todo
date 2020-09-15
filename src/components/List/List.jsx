import React, { Component } from 'react';
import styled from 'styled-components';

import Nav from './Nav';
import Contents from './Contents';
import Details from './Details';

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: ${window.innerHeight + 'px'};
    margin: 0;
    padding: 0;
    overflow: hidden;
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

    @media screen {
        &:hover {
            cursor: pointer;
        }
    }
`

let date = new Date();

const taskTabs = [ 
    { 
        label: 'Today', 
        id:'today',
        groupFilter: (taskGroup) => {
            if (
                taskGroup.date.getYear() === date.getYear() &&
                taskGroup.date.getMonth() === date.getMonth() &&
                taskGroup.date.getDate() === date.getDate()
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    { 
        label: 'Tomorrow',
        id:'tomorrow',
        groupFilter: (taskGroup) => {
            if (
                taskGroup.date.getYear() === date.getYear() &&
                taskGroup.date.getMonth() === date.getMonth() &&
                taskGroup.date.getDate() === date.getDate() + 1
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    { 
        label: 'This week',
        id: 'this-week',
        groupFilter: (taskGroup) => {
            let weekStart = new Date();
            let weekEnd = new Date();
            weekStart.setDate(date.getDate() - date.getDay());
            weekStart.setHours(24,0,0);
            weekEnd.setDate(date.getDate() + (7 - date.getDay()));
            weekEnd.setHours(23,59,59);

            if (
                taskGroup.date >= weekStart &&
                taskGroup.date <= weekEnd
            ) {
                return true;
            } else {
                return false;
            }
        } 
    },
    {
        label: 'Next week',
        id: 'next-week',
        groupFilter: (taskGroup) => {
            let weekStart = new Date();
            let weekEnd = new Date();
            weekStart.setDate((date.getDate() - date.getDay()) + 7);
            weekStart.setHours(24,0,0);
            weekEnd.setDate((date.getDate() + (7 - date.getDay())) + 7);
            weekEnd.setHours(23,59,59);

            if (
                taskGroup.date >= weekStart &&
                taskGroup.date <= weekEnd
            ) {
                return true;
            } else {
                return false;
            }
        }
    }
];


class List extends Component {
    state = {
        navToggle: (window.innerWidth >= 900),
        detailsToggle: (window.innerWidth >= 700),
        taskGroups: [],
        activeTab: taskTabs[0]
    }

    constructor(props) {
        super(props);
        this.navRef = React.createRef();
        this.detailsRef = React.createRef();
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

        if(
            !this.detailsRef.current.contains(e.target) &&
            window.innerWidth < 700
        ) {
            this.setState({ detailsToggle:false }); // Hides details when clicking outside of it in mobile mode.
        }
    }

    onClickButton = () => { // Auto toggle and user toggle is spearated.
        if (typeof this.state.userNavToggle === 'undefined') {
            this.setState({ userNavToggle:!this.state.navToggle, navToggle:!this.state.navToggle });
        } else {
            this.setState({ userNavToggle:!this.state.userNavToggle, navToggle:!this.state.navToggle });
        }
    }

    onClickTaskTab = (taskTab) => {
        this.setState({ activeTab:taskTab, navToggle:(window.innerWidth >= 900) });
    }

    onClickTask = (task) => {
        setTimeout(() => {
            this.setState({ activeTask:task, detailsToggle:true });
        },1)
    }
    
    onClickDetailsReturn = () => {
        this.setState({ detailsToggle:false });
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.onResizeWindow);
        window.addEventListener('click', this.onClickWindow);

        // Grouping tasks by date.

        let taskGroups = [];

        let date2 = new Date();
        date2.setDate(date.getDate() + 1);
        let date3 = new Date();
        date3.setDate(date.getDate() + 2);
        let date4 = new Date();
        date4.setDate(23);

        const tasks = [
            { id:'task1', title:'Wyrzucić śmieci.', date: date },
            { id:'task2', title:'Zrobić pranie.', date: date },
            { id:'task3', title:'Pamiętaj aby strzelić bujakę po mieście i dostać limoooooooooooooooooooo.', date: date2 },
            { id:'task3', title:'Pamiętaj o kablu do akumulatora.', date: date3 },
            { id:'task3', title:'Pobić żonę', date: date4 },
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
                <Nav
                    activeTab={this.state.activeTab}
                    taskTabs={taskTabs}
                    navRef={this.navRef}
                    navToggle={this.state.navToggle}
                    taskGroups={this.state.taskGroups}
                    onClickTaskTab={(taskTab) => this.onClickTaskTab(taskTab)}
                />
                <Contents
                    navToggle={this.state.navToggle}
                    detailsToggle={this.state.detailsToggle}
                    activeTab={this.state.activeTab}
                    taskGroups={this.state.taskGroups}
                    activeTask={this.state.activeTask}
                    onClickTask={(t) => this.onClickTask(t)}
                />
                <Details
                    detailsToggle={this.state.detailsToggle}
                    activeTask={this.state.activeTask}
                    detailsRef={this.detailsRef}
                    onClickDetailsReturn={this.onClickDetailsReturn}
                />
                <Button ref={this.buttonRef} onClick={this.onClickButton}/>
            </Container>
        );
    }
}
 
export default List;