import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';

// Individual row of user data
class UserRow extends React.Component {
    
    render() {
        var oneDay = 24*60*60*1000;
        return (
            <div className="userItem">
                {this.props.details.id},
                {this.props.details.nameFull},
                {this.props.details.username},
                {this.props.details.email},
                {this.props.details.gender.toLowerCase() === 'm' ? 'Male' : 'Female'},
                {this.props.details.nickname},
                {Math.round(Math.abs( (new Date().getTime() - this.props.details.startDate.getTime())/ oneDay))}
            </div>
        );
    }
}

export default UserRow;