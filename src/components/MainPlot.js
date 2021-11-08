import React, { useRef, useEffect} from "react";
import * as d3 from "d3";
import ControlPanel from "./ControlPanel";
import TableView from "./TableView";

const MainPlot = (props) => {
    const scatterplotSvg = useRef(null);

    // TODO
    let movieData = props.data;
    // movieData.forEach(d=>{ //each d is dictionary
    //     console.log(d.imdb_rating)
    // })

    useEffect(() => {
        /* Plot movie data graph. */
        let xScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d.imdb_rating), d3.max(movieData, d=>d.imdb_rating)])
            .range([0,props.width]);
        let yScale = d3.scaleLinear().domain(
            [d3.min(movieData, d=>d.us_gross), d3.max(movieData, d=>d.us_gross)])
            .range([props.width, 0]);
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        const svg = d3.select(scatterplotSvg.current);
        svg.append('g').attr('transform', `translate(${props.margin}, ${props.height})`).call(xAxis);
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
        
        /* Enable brushing. */
        const brush = d3.brush().extent([
            [d3.min(xScale.range()), d3.min(yScale.range())],
            [d3.max(xScale.range()), d3.max(yScale.range())]]).on("start brush end", brushed);
    
        const circle = svg.selectAll('circle');
        function brushed({selection}) {
            // circle.style("fill", null);
            d3.selectAll('circle').style("fill", null);
            let index_list = [];
            if (selection === null) circle.classed("selected", false);
            else {
                let [[x0, y0], [x1, y1]] = selection;
                circle.classed("selected", (d, i) => {
                    let xCoord = xScale(d[0]);
                    let yCoord = yScale(d[1]);
                    if (x0 <= xCoord && xCoord <= x1    && y0 <= yCoord && yCoord <= y1) {
                        index_list.push(i);
                    }
                    return x0 <= xCoord && xCoord <= x1 && y0 <= yCoord && yCoord <= y1;
                })
            }
            index_list.forEach(d => d3.selectAll(".selected" + d).style("fill", "red"));
        }
        //Q2: 리턴값 확인을 어떻게 함?
        //얘네들로 linked된 data를 어떻게 matching?
        //bar plot을 위한 d3 array 적용은 어떻게?

        svg.append('g').attr('transform', `translate(${props.margin}, ${props.margin})`)
        .call(brush);
    }, []);

    
	return (
    <div>
        <div className="ControlPanelContainer" style={{display: "flex"}}>
            <ControlPanel selection={props.quantitative} attribute="x: " defaultVal="imdb_rating" />
            <ControlPanel selection={props.quantitative} attribute="y: " defaultVal={"us_gross"}/>
            <ControlPanel selection={props.nominal} attribute="Color: " defaultVal={"none"} />
            <ControlPanel selection={props.quantitative} attribute="Opacity: " defaultVal={"none"}/>
            <ControlPanel selection={props.quantitative} attribute="Size: " defaultVal={"none"}/>
        </div>
        <div style={{marginTop: 20, display: "flex"}}>
            <svg style={{marginRight: 20}} ref={scatterplotSvg} width={props.width} height={props.height}/>
            <TableView />
		</div>
    </div>
	)
};

export default MainPlot;