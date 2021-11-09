import React, { useState, useRef, useEffect} from "react";
import * as d3 from "d3";

import ControlPanel from "./ControlPanel";
import TableView from "./TableView";


const MainPlot = (props) => {

    const scatterplotSvg = useRef(null);
    const svgWidth = props.width + 2*props.margin;
    const svgHeight = props.height + 2*props.margin;
    
    const q = props.quantitative;

    // TODO
    let movieData = props.data;
    let selectedData = [];

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        /* Plot movie data graph. */
        let xScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d.imdb_rating), d3.max(movieData, d=>d.imdb_rating)])
            .range([0,props.width]);

        let yScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d.us_gross), d3.max(movieData, d=>d.us_gross)])
            .range([props.height, 0]);
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        const svg = d3.select(scatterplotSvg.current);
        svg.append('g').attr('transform', `translate(${props.margin}, ${svgHeight-props.margin})`).call(xAxis);
        svg.append('g').attr('transform', `translate(${props.margin}, ${props.margin})`).call(yAxis);

        svg.append('g')
            .attr('transform', `translate(${props.margin}, ${props.margin})`)
            .selectAll('circle')
            .data(movieData)
            .enter()
            .append('circle')
            .attr('r', props.pointSize)
            .attr('cx', d=>xScale(d.imdb_rating))
            .attr('cy', d=>yScale(d.us_gross));
        
        /* Enable brushing. */
        const brush = d3.brush().extent([
            [d3.min(xScale.range()), d3.min(yScale.range())],
            [d3.max(xScale.range()), d3.max(yScale.range())]]).on("start end", brushed);
    
        const circle = svg.selectAll('circle');
        function brushed({selection}) {
            // circle.style("fill", null);
            d3.selectAll('circle').style("fill", null);
            selectedData = [];
            if (selection === null) circle.classed("selected", false);
            else {
                let [[x0, y0], [x1, y1]] = selection;
                circle.classed("selected", (d, i) => {
                    let xCoord = xScale(d.imdb_rating);
                    let yCoord = yScale(d.us_gross);
                    if (x0 <= xCoord && xCoord <= x1    && y0 <= yCoord && yCoord <= y1) {
                        selectedData.push(d);
                    }
                    return x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1;
                })
            }
            setMovies(selectedData);
            // selectedData.forEach(d => d3.selectAll(".selected" + d).style("fill", "red"));
        }

        svg.append('g').attr('transform', `translate(${props.margin}, ${props.margin})`)
        .call(brush);
    }, []);

    
	return (
    <div>
        <div className="ControlPanelContainer" style={{display: "flex"}}>
            <ControlPanel selection={q} attribute="x: " defaultVal="imdb_rating"/>
            <ControlPanel selection={q} attribute="y: " defaultVal={"us_gross"}/>
            <ControlPanel selection={props.nominal} attribute="Color: " defaultVal="none"/>
            <ControlPanel selection={q} attribute="Opacity: " defaultVal="none"/>
            <ControlPanel selection={props.quantitative} attribute="Size: " defaultVal={"none"} />
        </div>
        <div style={{marginTop: 20, display: "flex"}}>
            <svg style={{marginRight: 20}} ref={scatterplotSvg} width={svgWidth} height={svgHeight}/>
            <TableView selectedMovies={movies}/>
		</div>
    </div>
	)
};

export default MainPlot;