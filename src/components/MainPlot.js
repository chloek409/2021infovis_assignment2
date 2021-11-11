import React, { useState, useRef, useEffect} from "react";
import * as d3 from "d3";
import ControlPanel from "./ControlPanel";
import TableView from "./TableView";
import { scaleLinear } from "d3";


const MainPlot = (props) => {

    const scatterplotSvg = useRef(null);
    const width = props.width;
    const height = props.height;
    const svgWidth = width + 2*props.margin;
    const svgHeight = height + 2*props.margin;

    // TODO
    const movieData = props.data;
    movieData.forEach(d => {
        d.budget = parseFloat(d.budget);
        d.us_gross = parseFloat(d.us_gross);
        d.worldwide_gross = parseFloat(d.worldwide_gross);
        d.rotten_rating = parseFloat(d.rotten_rating);
        d.imdb_rating = parseFloat(d.imdb_rating);
        d.imdb_votes = parseFloat(d.imdb_votes);
        });

    //for managing movie data
    const [movies, setMovies] = useState([]);

    //for managing control panel options
    const [x, setX] = useState("imdb_rating");
    const [y, setY] = useState("us_gross");
    const [color, setColor] = useState("none");
    const [opacity, setOpacity] = useState("none");
    const [ptsize, setPtsize] = useState("none");

    useEffect(() => {
        /* Plot movie data graph. */
        let xScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d[x]), d3.max(movieData, d=>d[x])])
            .range([0,props.width]);

        let yScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d[y]), d3.max(movieData, d=>d[y])])
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
            .join('circle')
            .attr('r', props.pointSize)
            .attr('cx', d=>xScale(d[x]))
            .attr('cy', d=>yScale(d[y]))
            .attr('fill', "black");

        /* Enable brushing. */
        const brush = d3.brush().extent([
            [d3.min(xScale.range()), d3.min(yScale.range())],
            [d3.max(xScale.range()), d3.max(yScale.range())]]).on("start end", brushed);
    
            const circle = svg.selectAll('circle');
            function brushed({selection}) {
                d3.selectAll('circle').style("fill", null);
                let selectedData = [];
                if (selection === null) circle.classed("selected", false);
                else {
                    let [[x0, y0], [x1, y1]] = selection;
                    circle.classed("selected", (d, i) => {
                        let xCoord = xScale(d.imdb_rating);
                        let yCoord = yScale(d.us_gross);
                        if (x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1)
                            selectedData.push(d);
                        return x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1;
                        })
                    }
                setMovies(selectedData);
                }

            svg.append('g').attr('transform', `translate(${props.margin}, ${props.margin})`)
            .call(brush);
        }, []);


    useEffect(() => {
        /* Plot movie data graph. */
        let xScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d[x]), d3.max(movieData, d=>d[x])])
            .range([0,width]);

        let yScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d[y]), d3.max(movieData, d=>d[y])])
            .range([height, 0]);

        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

        let radiusScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d[ptsize]), d3.max(movieData, d=>d[ptsize])])
            .range([props.pointSize, props.maxPointSize]);

        const svg = d3.select(scatterplotSvg.current);
        // svg.attr('transform', `translate(${props.margin}, ${height})`).call(xAxis).transition().duration(1000);
        // svg.attr('transform', `translate(${2*props.margin}, ${props.margin})`).call(yAxis).transition().duration(1000);

        svg.attr('transform', `translate(${props.margin}, ${props.margin})`)
            .selectAll('circle')
            .data(movieData)
            .join('circle')
            .transition()
            .duration(1000)
            .attr('r', function(d) {if (ptsize === "none") return props.pointSize; else return radiusScale(d[ptsize])})
            .attr('cx', d=>xScale(d[x]))
            .attr('cy', d=>yScale(d[y]))
            .attr('fill', function(d) {if (color === "none") return "black"; else return colorScale(d[color])});

        /* Enable brushing. */
        const brush = d3.brush().extent([
            [d3.min(xScale.range()), d3.min(yScale.range())],
            [d3.max(xScale.range()), d3.max(yScale.range())]]).on("start end", brushed);
    
            const circle = svg.selectAll('circle');

            function brushed({selection}) {
                d3.selectAll('circle').style("fill", null);
                let selectedData = [];
                if (selection === null) {circle.classed("selected", false); selectedData=[];}
                else {
                    let [[x0, y0], [x1, y1]] = selection;
                    circle.classed("selected", (d, i) => {
                        let xCoord = xScale(d[x]);
                        let yCoord = yScale(d[y]);
                        if (x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1){
                            selectedData.push(d);
                        }
                        return x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1;
                        })
                    }
                setMovies(selectedData);
                }

            svg.append('g').attr('transform', `translate(${props.margin}, ${props.margin})`)
            .call(brush);
        }, [x,y,color, opacity, ptsize]);

    
	return (
    <div>
        <div className="ControlPanelContainer" style={{display: "flex"}}>
            <ControlPanel menuOptions={props.quantitative} attribute="x: " defaultVal="imdb_rating" setMenu={setX}/>
            <ControlPanel menuOptions={props.quantitative} attribute="y: " defaultVal="us_gross" setMenu={setY}/>
            <ControlPanel menuOptions={props.colorOptions} attribute="Color: " defaultVal="none" setMenu={setColor}/>
            <ControlPanel menuOptions={props.opacityAndSizeOptions} attribute="Opacity: " defaultVal="none" setMenu={setOpacity}/>
            <ControlPanel menuOptions={props.opacityAndSizeOptions} attribute="Size: " defaultVal="none" setMenu={setPtsize}/>
        </div>
        <div style={{marginTop: 20, display: "flex"}}>
            <svg style={{marginRight: 20}} ref={scatterplotSvg} width={svgWidth} height={svgHeight}>
            </svg>
            <TableView selectedMovies={movies}/>
		</div>
    </div>
	)
};

export default MainPlot;