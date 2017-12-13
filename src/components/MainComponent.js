import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandlerFilter = this.clickHandlerFilter.bind(this);
        this.clickHandlerMain = this.clickHandlerMain.bind(this);
        this.state = {};
    }

    // componentDidMount() { }

    // componentWillUnmount() {}

    // Handle click in filter UI
    clickHandlerFilter = (i) => {
        console.info(i);
    }

    // Handle click in main UI
    clickHandlerMain = (i) => {
        console.info(i);
    }

    render() {

        const mainFilter() => {
            return (
                {this.props.mainFilter}
            );
        }

        return (
            <div className="main">
                
                
                <Grid fluid>
                    <Row>
                      <Col xs={12} sm={3} md={3} lg={3} >
                        {mainFilter}
                      </Col>
                      <Col xs={12} sm={9} md={9} lg={9} >
                        {this.props.mainView}
                      </Col>
                    </Row>
                </Grid>
            </div>
            
        );
    }
}

export default MainComponent;