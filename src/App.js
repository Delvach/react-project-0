import React from 'react';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Grid, Row, Col } from 'react-flexbox-grid';

import MainViewComponent from './components/MainViewComponent';
import MainFilterComponent from './components/MainFilterComponent';

// Custom styles
import './index.css';



class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.state = {
            filters: {
                depts: {
                    showAll: true,
                    active: props.departments.slice()
                },
                roles: {
                    showAll: true,
                    active: props.roles.slice()
                },
            }
        };
    }

    // Handle select box change events
    handleFilterChange = (e, v) => {
        console.info(e.target, v);
    }

    isToggleActive = (metricId, filterId) => {
        return filterId === 'all';
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="main">
                    <Grid fluid>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} >
                                <AppBar
                                    title={this.props.title}
                                    showMenuIconButton={false}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={3} md={3} lg={3} >
                                <MainFilterComponent 
                                    handleFilterChange={this.handleFilterChange} 
                                    departments={this.props.departments}
                                    roles={this.props.roles}
                                    isToggleActive={this.isToggleActive}
                                />
                            </Col>
                            <Col xs={12} sm={9} md={9} lg={9} >
                                <MainViewComponent
                                    users={this.props.users}
                                    departments={this.props.departments}
                                    roles={this.props.roles}
                                    geodata={this.props.geodata}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;