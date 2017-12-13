import React from 'react';
// import ReactTransitionGroup from 'react-addons-transition-group';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { geoMercator, geoPath } from 'd3-geo';

import WorldMap from './WorldMap';

/*
 * Updated usage of react-faux-dom from:
 * https://github.com/krawaller/d3animatedchartinreact/blob/gh-pages/index.js
 */
let createHook = (comp,elem,statename) => {
    let elems = new Map(),
        interval
    const updateState = ()=> {
        comp.setState({[statename]:elem.toReact()})
    }
    setTimeout(updateState)
    comp.isAnimating = ()=> !!interval
    return (transition)=> {
        transition.each((e)=>{
            elems.set(e,(elems.get(e) || new Set()).add(transition.id))
            interval = interval || setInterval(updateState,16)
        })
        transition.each("end",(e)=>{
            let anims = elems.get(e)
            anims.delete(transition.id)
            if (anims.size){
                elems.set(e,anims)
            } else {
                elems.delete(e)
            }
            if (!elems.size) interval = clearInterval(interval)
        })
    }
}


/*
 *  D3 Visualization
 */
class UserVisualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debug: true
        };
        // this.createChart = this.createChart.bind(this);
        this.generateChart = this.generateChart.bind(this);
    }

    componentDidMount() {
        if(this.state.debug) console.info('componentDidMount()');

        this.generateChart();

        // return svgNode.toReact();
    }

    generateChart() {
        let faux = new ReactFauxDOM.Element('div');
        let hook = createHook(this, faux, "visualization");

        const chartData = this.props.data.slice();
        const dataMax = max(chartData);

        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.height]);

        var svg = select(faux).append('svg')
            .attr('viewBox', '0 0 ' + + this.props.height + ' ' + this.props.width)
            .attr('height', this.props.height)
            .attr('width', this.props.width);

        var rects = svg
            .selectAll('rect')
            .data(this.props.data);

        rects
            .enter()
            .append('rect')
            .style('fill', '#fe9922')
            .attr('x', (d,i) => i * 25)
            .attr('y', d => this.props.height - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25);

        rects
            .exit()
            .remove();
    }

    render() {
        return (
            <div>
                {this.state.visualization}
            </div>
        );
    }

    componentDidUpdate() {
        // if(this.state.debug) console.info('componentDidUpdate()');
        // Chart is brought into view
        // this.createChart();
    }

    // Visualization is in view
    componentWillMount() {
        if(this.state.debug) console.info('componentWillMount()');
    }

    // Visualization is no longer visible
    componentWillUnmount() {
        if(this.state.debug) console.info('componentWillUnmount()');
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.debug) console.info('componentWillReceiveProps()');
    }


    /* Called by componentDidMount(), populates placeholder svg markup
    createChart() {
        let faux = new ReactFauxDOM.Element('div');
        let hook = createHook(this,faux,"visualization");

        const node = this.node;
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.height]);

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect');
   
        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove();
   
        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d,i) => i * 25)
            .attr('y', d => this.props.height - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25);
    }
    */

    

    // createChart_render() {
    //     return (
    //         <svg
    //             ref={node => this.node = node}
    //             height={this.props.height}
    //             width={this.props.width}
    //         />
    //     );
    // }

    testRender() {
        return (
            <WorldMap
                geodata={this.props.geodata}

            />
        );
    }
}

export default UserVisualization;