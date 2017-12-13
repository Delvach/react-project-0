import React from 'react';

import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon';

const iconStyles = {
  marginRight: 24,
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


export default MainFilterComponent;