// Main resources
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import worlddata from './data/world';

/*
 *  Begin demo data definitions
 *  TODO: 
 *      - Integrate as data service
 *      - Data should not be in global scope
 */
const config =  {
    project: require('./config/project.json'),
};
const userData = require('./data/users.json');
const departmentData = require('./data/departments.json');
const roleData = require('./data/roles.json');

// Process user data
for(let i = 0; i < userData.length; i++) {
    userData[i].fullName = userData[i].nameFirst + ' ' + userData[i].nameLast;
    userData[i].startDate = new Date(userData[i].startDate);
}

// Render application
ReactDOM.render(
  <App
    title={config.project.title}
    users={userData}
    departments={departmentData}
    roles={roleData}
    geodata={worlddata}
  />,
  document.getElementById('root')
);