import React from 'react';

class D3ChartComponent extends React.Component {

    render() {
        const members = this.props.data;
        members.sort();
        const memberRows = members.map((member => {
            return (
                <MemberRow key={member.id} details={member} />
            );
        }));

        return (
            <div className="view">
                {memberRows}
            </div>
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




export default D3ChartComponent;