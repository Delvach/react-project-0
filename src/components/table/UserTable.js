import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class UserTable extends React.Component {


    render() {
        var oneDay = 24*60*60*1000;
        const departments = this.props.departments.slice();
        const roles = this.props.roles.slice();

        const getDepartmentName = (deptId) => {
            const output = departments.find((dept) => {
                return dept.id === deptId;
            });
            return (typeof output === 'undefined') ? '' : output.title;
        }

        const getRoleName = (roleId) => {
            const output = roles.find((role) => {
                return role.id === roleId;
            });
            return (typeof output === 'undefined') ? '' : output.title;
        }

        const userTableRows = this.props.users.map((user => {
            return (
                <TableRow key={user.id}>
                    <TableRowColumn>{user.username}</TableRowColumn>
                    <TableRowColumn>{user.nameFull}</TableRowColumn>
                    <TableRowColumn>{getRoleName(user.roleId)}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{getDepartmentName(user.deptId)}</TableRowColumn>
                    <TableRowColumn>{Math.round(Math.abs( (new Date().getTime() - user.startDate.getTime())/ oneDay))}</TableRowColumn>
                </TableRow>
            );
        }));
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Username</TableHeaderColumn>
                        <TableHeaderColumn>Full Name</TableHeaderColumn>
                        <TableHeaderColumn>Job Title</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Department</TableHeaderColumn>
                        <TableHeaderColumn># Days in org</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userTableRows}
                </TableBody>
            </Table>
        );
    }
}

export default UserTable;