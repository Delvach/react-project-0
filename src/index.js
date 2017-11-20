// Main resources
import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'; // From https://github.com/oliviertassinari/react-swipeable-views
import Toggle from 'material-ui/Toggle';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import FontIcon from 'material-ui/FontIcon';


// React flexbox grid for layout; similar functionality will be in the next full release of React
import { Grid, Row, Col } from 'react-flexbox-grid';



// Custom styles
import './index.css';

const iconStyles = {
  marginRight: 24,
};

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

/*
 *  Filter view component
 */
class MainFilterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeptFilterChange = this.handleDeptFilterChange.bind(this);
        this.handleRoleFilterChange = this.handleRoleFilterChange.bind(this);
        this.state = {
            deptFilter: props.departments[0].id,
            roleFilter: props.roles[0].id,
        };
    }

    handleDeptFilterChange = (e, index, value) => {
        console.info(e);
        this.setState({
            deptFilter: e.target.value
        }, () => { console.info(this.state); });
    }

    handleRoleFilterChange = (e, index, value) => {
        console.info(e);
        this.setState({
            roleFilter: e.target.value
        }, () => { console.info(this.state); });
    }
    
    render() {
        const data = {
            depts: this.props.departments.slice(),
            roles: this.props.roles.slice()
        };

        const filters = [
            {id:'dept', title:'Department'},
            {id:'role', title:'Role'}
        ].map((metric, idx) => {
            const selOptions= data[(metric.id === 'dept') ? 'depts' : 'roles'].map((item, idx) => {
                return (
                    <FilterOption 
                        key={item.id} 
                        id={item.id} 
                        title={item.title}
                        active={this.props.isToggleActive(metric.id, item.id)}
                        handleChange={this.props.handleFilterChange}
                    />
                );
            });
            return (
                <Filter
                    optionValues={selOptions} 
                    key={metric.id} 
                    id={metric.id} 
                    title={metric.title} 
                />
            );
        });

        return (
            <div className="filter">
            {filters}
            </div>
        );
    }
}

class Filter extends React.Component {
    render() {
        const iconName = this.props.id === 'dept' ? 'account_balance' : 'account_circle';
        const textLabel = 'View ' + (this.props.id === 'dept' ? 'Departments' : 'Roles');
        return (
            <div>
                <div className="icon-text">
                    <FontIcon className="material-icons" style={iconStyles}>{iconName}</FontIcon>
                    <span className="text">{textLabel}</span>
                </div>
                <div>
                    {this.props.optionValues}
                </div>
            </div>
        );
    }
}

class FilterOption extends React.Component {
    render() {
        return (
            <div>
                <Toggle
                    onToggle={this.props.handleChange}
                    label={this.props.title}
                    labelPosition="right"
                    toggled={this.props.active}
                />
            </div>
        )
    }
}


/*
 *  Main list view
 */
class MainViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSlideIndex: 0
        };
    }

    handleTabChange = (tabValue) => {
        this.setState({
            tabSlideIndex: tabValue
        });
    }

    render() {
        const members = this.props.members;
        members.sort();
        const memberRows = members.map((member => {
            return (
                <MemberRow key={member.id} details={member} />
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
                            {memberRows}
                        </div>
                        <div style={tabStyles.slide}>
                            <MemberTable
                                data={members}
                            />
                        </div>
                        <div style={tabStyles.slide}>
                            Integrate d3 visual here
                        </div>
                    </SwipeableViews>
                </div>
                
            </div>
        );
    }

}

class MemberTable extends React.Component {
    render() {
        var oneDay = 24*60*60*1000;
        const memberTableRows = this.props.data.map((member => {
            return (
                <TableRow key={member.id}>
                    <TableRowColumn>{member.username}</TableRowColumn>
                    <TableRowColumn>{member.nameFull}</TableRowColumn>
                    <TableRowColumn>{member.email}</TableRowColumn>
                    <TableRowColumn>{member.nickname}</TableRowColumn>
                    <TableRowColumn>{Math.round(Math.abs( (new Date().getTime() - member.startDate.getTime())/ oneDay))}</TableRowColumn>
                </TableRow>
            );
        }));
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Username</TableHeaderColumn>
                        <TableHeaderColumn>Full Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Nickname</TableHeaderColumn>
                        <TableHeaderColumn># Days Member</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {memberTableRows}
                </TableBody>
            </Table>
        );
    }
}

// Individual row of member data
class MemberRow extends React.Component {

    render() {
        var oneDay = 24*60*60*1000;
        return (
            <div className="memberItem">
                {this.props.details.id},
                {this.props.details.nameFull},
                {this.props.details.username},
                {this.props.details.email},
                {this.props.details.gender === 'm' ? 'Male' : 'Female'},
                {this.props.details.nickname},
                {Math.round(Math.abs( (new Date().getTime() - this.props.details.startDate.getTime())/ oneDay))}
            </div>
        );
    }
}






/*
 *  Data class definitions
 */

// Define org department class
class Department {
    constructor(id, title) {
        // this.id     = title.toLowerCase().split(' ').join('');
        this.id     = id;
        this.title  = title;
    }
}

// Define member role class
class Role {
    constructor(id, title) {
        // this.id     = title.toLowerCase().split(' ').join('');
        this.id     = id;
        this.title  = title;
    }
}

// Define member class
class Member {
    constructor(id, username, nameFirst, nameLast, gender, email, nickname, roleId, deptId, startDate) {
        this.id     = id;
        this.username = username;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.nameFull = [nameFirst, nameLast].join(' ');
        this.gender = gender.toLowerCase();
        this.email = email;
        this.nickname = nickname;
        this.roleId = roleId;
        this.deptId = deptId;
        this.startDate = new Date(startDate);
    }
}

/*
 *  Begin demo data definitions
 *  TODO: Integrate as data service
 */

// Define departments
const orgDepartments = [
    new Department('all','All'),
    new Department('cre','Creative'),
    new Department('engb', 'Back End Infrastructure'),
    new Department('fin', 'Finance'),
    new Department('engf', 'Front End Development'),
    new Department('hr', 'Human Resources'),
    new Department('man', 'Management'),
    new Department('sale', 'Sales'),
];


// Define roles
const orgRoles = [
    new Role('all', 'All'),
    new Role('dsgn', 'Designer'),
    new Role('eng', 'Engineer'),
    new Role('man', 'Manager'),
    new Role('pman', 'Project Manager'),
    new Role('sale', 'Sales Associate'),
];



// Define members, using faux data from https://www.mockaroo.com
const orgMembers = [];

[{"id":1,"username":"vbrettoner0","nameFirst":"Von","nameLast":"Brettoner","gender":"M","email":"vbrettoner0@amazon.com","nickname":"Black-crowned night heron","startDate":"5/5/2013","role":"eng","dept":"engb"},
{"id":2,"username":"wdegenhardt1","nameFirst":"Web","nameLast":"Degenhardt","gender":"M","email":"wdegenhardt1@4shared.com","nickname":"Lesser masked weaver","startDate":"12/19/2015","role":"eng","dept":"engf"},
{"id":3,"username":"opirt2","nameFirst":"Osbourn","nameLast":"Pirt","gender":"M","email":"opirt2@mayoclinic.com","nickname":"Palm squirrel","startDate":"6/17/2016","role":"man","dept":"man"},
{"id":4,"username":"mhuncote3","nameFirst":"Matthus","nameLast":"Huncote","gender":"M","email":"mhuncote3@amazonaws.com","nickname":"Mallard","startDate":"9/11/2014","role":"pman","dept":"engb"},
{"id":5,"username":"jchristaeas4","nameFirst":"Jordain","nameLast":"Christaeas","gender":"F","email":"jchristaeas4@rediff.com","nickname":"Lion, steller's sea","startDate":"5/24/2010","role":"pman","dept":"hr"},
{"id":6,"username":"edenore5","nameFirst":"Edy","nameLast":"de Nore","gender":"F","email":"edenore5@upenn.edu","nickname":"Lappet-faced vulture","startDate":"7/3/2016","role":"pman","dept":"hr"},
{"id":7,"username":"npoynzer6","nameFirst":"Nolly","nameLast":"Poynzer","gender":"M","email":"npoynzer6@yahoo.com","nickname":"Genet, small-spotted","startDate":"3/18/2013","role":"dsgn","dept":"engb"},
{"id":8,"username":"vmelarkey7","nameFirst":"Vinny","nameLast":"Melarkey","gender":"M","email":"vmelarkey7@kickstarter.com","nickname":"Eastern box turtle","startDate":"7/1/2013","role":"dsgn","dept":"engb"},
{"id":9,"username":"kbello8","nameFirst":"Kimball","nameLast":"Bello","gender":"M","email":"kbello8@amazon.com","nickname":"Western patch-nosed snake","startDate":"12/14/2014","role":"man","dept":"man"},
{"id":10,"username":"hwoolhouse9","nameFirst":"Haslett","nameLast":"Woolhouse","gender":"M","email":"hwoolhouse9@biblegateway.com","nickname":"Red brocket","startDate":"3/7/2012","role":"sale","dept":"cre"},
{"id":11,"username":"bbampkina","nameFirst":"Brandi","nameLast":"Bampkin","gender":"F","email":"bbampkina@prnewswire.com","nickname":"Lily trotter","startDate":"2/6/2017","role":"man","dept":"man"},
{"id":12,"username":"jdenyb","nameFirst":"Jori","nameLast":"Deny","gender":"F","email":"jdenyb@elpais.com","nickname":"Red deer","startDate":"2/10/2009","role":"pman","dept":"sale"},
{"id":13,"username":"eswynleyc","nameFirst":"Eula","nameLast":"Swynley","gender":"F","email":"eswynleyc@issuu.com","nickname":"Dark-winged trumpeter","startDate":"10/12/2011","role":"pman","dept":"sale"},
{"id":14,"username":"pfranzeld","nameFirst":"Preston","nameLast":"Franzel","gender":"M","email":"pfranzeld@wsj.com","nickname":"Canada goose","startDate":"6/18/2016","role":"dsgn","dept":"engf"},
{"id":15,"username":"agornalle","nameFirst":"Andreas","nameLast":"Gornall","gender":"M","email":"agornalle@fema.gov","nickname":"Nine-banded armadillo","startDate":"12/31/2012","role":"dsgn","dept":"man"},
{"id":16,"username":"gzavatterof","nameFirst":"Ginger","nameLast":"Zavattero","gender":"F","email":"gzavatterof@cargocollective.com","nickname":"Uinta ground squirrel","startDate":"7/14/2016","role":"pman","dept":"cre"},
{"id":17,"username":"ckermitg","nameFirst":"Caye","nameLast":"Kermit","gender":"F","email":"ckermitg@skyrock.com","nickname":"White-headed vulture","startDate":"4/14/2008","role":"sale","dept":"fin"},
{"id":18,"username":"rkeymeh","nameFirst":"Ranice","nameLast":"Keyme","gender":"F","email":"rkeymeh@fc2.com","nickname":"Caracara, yellow-headed","startDate":"1/5/2015","role":"pman","dept":"man"},
{"id":19,"username":"ybiddwelli","nameFirst":"Yankee","nameLast":"Biddwell","gender":"M","email":"ybiddwelli@rediff.com","nickname":"Pine squirrel","startDate":"9/23/2015","role":"eng","dept":"cre"},
{"id":20,"username":"iguirardinj","nameFirst":"Iris","nameLast":"Guirardin","gender":"F","email":"iguirardinj@scribd.com","nickname":"Boa, emerald green tree","startDate":"4/3/2009","role":"man","dept":"hr"},
{"id":21,"username":"shighmank","nameFirst":"Stanislaus","nameLast":"Highman","gender":"M","email":"shighmank@mysql.com","nickname":"Striped dolphin","startDate":"9/12/2011","role":"sale","dept":"sale"},
{"id":22,"username":"mblaschekl","nameFirst":"Murielle","nameLast":"Blaschek","gender":"F","email":"mblaschekl@dailymail.co.uk","nickname":"Least chipmunk","startDate":"12/18/2010","role":"man","dept":"engf"},
{"id":23,"username":"sedmonsonm","nameFirst":"Sapphira","nameLast":"Edmonson","gender":"F","email":"sedmonsonm@bizjournals.com","nickname":"Lappet-faced vulture","startDate":"10/21/2008","role":"sale","dept":"sale"},
{"id":24,"username":"phucksn","nameFirst":"Peri","nameLast":"Hucks","gender":"F","email":"phucksn@ted.com","nickname":"Pintail, white-cheeked","startDate":"8/31/2012","role":"man","dept":"hr"},
{"id":25,"username":"jtrussello","nameFirst":"Jewel","nameLast":"Trussell","gender":"F","email":"jtrussello@exblog.jp","nickname":"House crow","startDate":"5/19/2010","role":"eng","dept":"fin"},
{"id":26,"username":"rhamlingtonp","nameFirst":"Rivi","nameLast":"Hamlington","gender":"F","email":"rhamlingtonp@163.com","nickname":"Python, carpet","startDate":"9/10/2009","role":"man","dept":"hr"},
{"id":27,"username":"dconingq","nameFirst":"Dolf","nameLast":"Coning","gender":"M","email":"dconingq@netscape.com","nickname":"Tortoise, galapagos","startDate":"9/19/2016","role":"eng","dept":"man"},
{"id":28,"username":"tburnipr","nameFirst":"Thomasa","nameLast":"Burnip","gender":"F","email":"tburnipr@seattletimes.com","nickname":"Red lava crab","startDate":"7/18/2015","role":"man","dept":"engb"},
{"id":29,"username":"odellcasas","nameFirst":"Olenka","nameLast":"Dell Casa","gender":"F","email":"odellcasas@theguardian.com","nickname":"Thomson's gazelle","startDate":"6/27/2013","role":"eng","dept":"hr"},
{"id":30,"username":"lnormingtont","nameFirst":"Loreen","nameLast":"Normington","gender":"F","email":"lnormingtont@pen.io","nickname":"Timber wolf","startDate":"1/31/2014","role":"eng","dept":"man"},
{"id":31,"username":"dkiehlu","nameFirst":"Derk","nameLast":"Kiehl","gender":"M","email":"dkiehlu@dyndns.org","nickname":"Owl, white-browed","startDate":"12/11/2007","role":"pman","dept":"man"},
{"id":32,"username":"tzellmerv","nameFirst":"Theobald","nameLast":"Zellmer","gender":"M","email":"tzellmerv@house.gov","nickname":"Langur, hanuman","startDate":"6/5/2008","role":"pman","dept":"man"},
{"id":33,"username":"fhendersonw","nameFirst":"Frederich","nameLast":"Henderson","gender":"M","email":"fhendersonw@slate.com","nickname":"South African hedgehog","startDate":"11/2/2009","role":"pman","dept":"fin"},
{"id":34,"username":"hdennex","nameFirst":"Herb","nameLast":"Denne","gender":"M","email":"hdennex@blogs.com","nickname":"Deer, white-tailed","startDate":"3/16/2016","role":"dsgn","dept":"engf"},
{"id":35,"username":"lruseworthy","nameFirst":"Lew","nameLast":"Ruseworth","gender":"M","email":"lruseworthy@hatena.ne.jp","nickname":"Common wolf","startDate":"3/27/2009","role":"sale","dept":"man"},
{"id":36,"username":"ehalyz","nameFirst":"Evvie","nameLast":"Haly","gender":"F","email":"ehalyz@amazon.com","nickname":"Flycatcher, tyrant","startDate":"2/1/2010","role":"man","dept":"man"},
{"id":37,"username":"amasson10","nameFirst":"Ambur","nameLast":"Masson","gender":"F","email":"amasson10@java.com","nickname":"Wildebeest, blue","startDate":"6/3/2015","role":"dsgn","dept":"cre"},
{"id":38,"username":"jmccleverty11","nameFirst":"Joel","nameLast":"McCleverty","gender":"M","email":"jmccleverty11@mozilla.org","nickname":"North American river otter","startDate":"7/13/2016","role":"man","dept":"cre"},
{"id":39,"username":"ktegeller12","nameFirst":"Kellia","nameLast":"Tegeller","gender":"F","email":"ktegeller12@java.com","nickname":"Least chipmunk","startDate":"2/19/2009","role":"dsgn","dept":"engf"},
{"id":40,"username":"akenway13","nameFirst":"Aldous","nameLast":"Kenway","gender":"M","email":"akenway13@ifeng.com","nickname":"Little blue penguin","startDate":"5/24/2011","role":"sale","dept":"sale"},
{"id":41,"username":"dpandie14","nameFirst":"Davin","nameLast":"Pandie","gender":"M","email":"dpandie14@adobe.com","nickname":"Eastern dwarf mongoose","startDate":"10/6/2010","role":"sale","dept":"fin"},
{"id":42,"username":"bharnes15","nameFirst":"Baxter","nameLast":"Harnes","gender":"M","email":"bharnes15@wordpress.org","nickname":"Bear, sloth","startDate":"12/3/2012","role":"sale","dept":"cre"},
{"id":43,"username":"mstirley16","nameFirst":"Moria","nameLast":"Stirley","gender":"F","email":"mstirley16@gmpg.org","nickname":"Hornbill, leadbeateri's ground","startDate":"1/18/2011","role":"sale","dept":"hr"},
{"id":44,"username":"edearden17","nameFirst":"Elmore","nameLast":"Dearden","gender":"M","email":"edearden17@webnode.com","nickname":"American racer","startDate":"11/5/2014","role":"sale","dept":"hr"},
{"id":45,"username":"npetrenko18","nameFirst":"Ninetta","nameLast":"Petrenko","gender":"F","email":"npetrenko18@unc.edu","nickname":"Brush-tailed phascogale","startDate":"8/25/2016","role":"man","dept":"hr"},
{"id":46,"username":"rrobeiro19","nameFirst":"Raynor","nameLast":"Robeiro","gender":"M","email":"rrobeiro19@typepad.com","nickname":"Gray duiker","startDate":"9/9/2011","role":"sale","dept":"fin"},
{"id":47,"username":"rmcgrowther1a","nameFirst":"Rutter","nameLast":"McGrowther","gender":"M","email":"rmcgrowther1a@pen.io","nickname":"Snake, carpet","startDate":"2/3/2017","role":"man","dept":"cre"},
{"id":48,"username":"aalleway1b","nameFirst":"Amandi","nameLast":"Alleway","gender":"F","email":"aalleway1b@amazon.co.jp","nickname":"Macaw, red and blue","startDate":"8/9/2013","role":"eng","dept":"fin"},
{"id":49,"username":"whattrick1c","nameFirst":"Walliw","nameLast":"Hattrick","gender":"F","email":"whattrick1c@hp.com","nickname":"Dolphin, striped","startDate":"8/4/2017","role":"dsgn","dept":"hr"},
{"id":50,"username":"etolworthie1d","nameFirst":"Everard","nameLast":"Tolworthie","gender":"M","email":"etolworthie1d@guardian.co.uk","nickname":"Antelope, roan","startDate":"11/6/2013","role":"sale","dept":"fin"}]
.forEach(entry => {
    orgMembers.push(new Member(
        entry.id,
        entry.username,
        entry.nameFirst,
        entry.nameLast,
        entry.gender,
        entry.email,
        entry.nickname,
        entry.role,
        entry.dept,
        entry.startDate
    ));
});


// Begin building react app

// Main application inserted into DOM
class MainApp extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.state = {
            filters: {
                depts: {
                    showAll: true,
                    active: orgDepartments.slice()
                },
                roles: {
                    showAll: true,
                    active: orgRoles.slice()
                },
            }
        };
    }


    // componentDidMount() { }

    // componentWillUnmount() {}

    // Handle select box change events
    handleFilterChange = (e, v) => {
        console.info(e.target, v);
    }

    isToggleActive = (metricId, filterId) => {
        // this.state.filters[metricId]
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
                                    title="delvach learning app 0"
                                    showMenuIconButton={false}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={3} md={3} lg={3} >
                                <MainFilterComponent 
                                    handleFilterChange={this.handleFilterChange} 
                                    departments={orgDepartments}
                                    roles={orgRoles}
                                    isToggleActive={this.isToggleActive}
                                />
                            </Col>
                            <Col xs={12} sm={9} md={9} lg={9} >
                                <MainViewComponent members={orgMembers}  />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}




// Render application
ReactDOM.render(
  <MainApp />,
  document.getElementById('root')
);