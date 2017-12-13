import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'; // From https://github.com/oliviertassinari/react-swipeable-views

import UsersVisualization from './visualizations/UsersVisualization';

import UserTable from './table/UserTable';
import UserRow from './table/UserRow';

let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tabStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};


// Return methods for sorting users' data
const getUserSortingFunc = (sortMethod) => {
    
    switch(sortMethod) {
        case 'nameLast':
    
            return (a, b) => {
                    const nameA = a.nameLast.toUpperCase();
                    const nameB = b.nameLast.toUpperCase();

                    if(nameA < nameB) {
                        return -1;
                    }
                    if(nameA > nameB) {
                        return 1;
                    }
                    return 0;
                }
            // no 'break;' needed here since function returns, React throws unreachable code warning if it exists
        default:
            break;
    }
}


/*
 *  Main list view
 */
class MainViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortMethod: 'nameLast',
            tabSlideIndex: 2,
            viewHeight: 400,
            viewWidth: 500,
        };
        this.testData = [];
        this.randomize = this.randomize.bind(this);
        this.randomize();
        setInterval(this.randomize, 1000);
    }

    randomize() {
        const newDataLength = getRandomInt(5, 10);
        const newData = [];
        for(let i=0; i < newDataLength; i++) {
            newData[i] = getRandomInt(0, 255);
        }
        this.testData = newData;
        this.render();
    }


    handleTabChange = (tabValue) => {
        this.setState({
            tabSlideIndex: tabValue
        });
    }

    render() {
        const data = this.testData.slice();
        const users = this.props.users.sort(getUserSortingFunc(this.state.sortMethod));
        const departments = this.props.departments.slice();
        const roles = this.props.roles.slice();
        const userRows = users.map((user => {
            return (
                <UserRow key={user.id} details={user} />
            );
        }));

        return (
            <div>
                <div>
                    <Tabs
                        onChange={this.handleTabChange}
                        value={this.state.tabSlideIndex}
                    >
                        <Tab label="Unformatted data" value={0} />
                        <Tab label="Table data" value={1} />
                        <Tab label="Visualization (pending)" value={2} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.tabSlideIndex}
                        onChangeIndex={this.handleTabChange}
                    >
                        <div>
                            {userRows}
                        </div>
                        <div style={tabStyles.slide}>
                            <UserTable
                                users={users}
                                departments={departments}
                                roles={roles}
                            />
                        </div>
                        <div style={tabStyles.slide}>
                            <UsersVisualization
                                data={data} 
                                users={users}
                                departments={departments}
                                roles={roles}
                                geodata={this.props.geodata}
                                height={this.state.viewHeight}
                                width={this.state.viewWidth}
                            />
                        </div>
                    </SwipeableViews>
                </div>
                
            </div>
        );
    }
}


export default MainViewComponent;