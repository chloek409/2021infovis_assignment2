import React, { useRef, useEffect} from "react";
import * as d3 from "d3";
import ControlPanel from "./ControlPanel";
import TableView from "./TableView";

const MainPlot = (props) => {
    const scatterplotSvg = useRef(null);
    const svgHeight = props.height;

    // TODO
    let movieData = props.data;
    // movieData.forEach(d=>{ //each d is dictionary
    //     console.log(d.imdb_rating)
    // })

    useEffect(() => {
        /* Plot movie data. */
        let xScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d.imdb_rating), d3.max(movieData, d=>d.imdb_rating)])
            .range([0,props.size]);
        let yScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d.us_gross), d3.max(movieData, d=>d.us_gross)])
            .range([props.size, 0]);
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        const svg = d3.select(scatterplotSvg.current);
        svg.append('g').attr('transform', `translate(${props.margin}, ${props.height+props.margin})`).call(xAxis);
        svg.append('g').attr('transform', `translate(${props.margin}, ${props.margin})`).call(yAxis);
        svg.append('g')
            .attr('transform', `translate(${props.margin}, ${props.margin})`)
            .selectAll('circle')
            .data(movieData)
            .enter()
            .append('circle')
            .attr('r', props.pointSize)
            .attr('cx', d=>xScale(d.imdb_rating))
            .attr('cy', d=>yScale(d.us_gross))
    }, []);

    
	return (
    <div>
        <div className="ControlPanelContainer" style={{display: "flex"}}>
            <ControlPanel selection={props.quantitative} attribute="x: " defaultV={movieData.imdb_rating} />
            <ControlPanel selection={props.quantitative} attribute="y: " defaultV={movieData.us_gross}/>
            <ControlPanel selection={props.nominal} attribute="Color: " />
            <ControlPanel selection={props.quantitative} attribute="Opacity: " />
            <ControlPanel selection={props.quantitative} attribute="Size: " />
        </div>
        <div>
            <svg ref={scatterplotSvg} width={props.width} height={props.height}/>
		</div>
    </div>
	)
};

export default MainPlot;