import React, { useRef, useEffect} from "react";
import * as d3 from "d3";

const MainPlot = (props) => {
    const whatSvg = useRef();
    const svgHeight = props.height;

    // TODO
    let movieData = props.data;

    useEffect(() => {
        /* Plot movie data. */        
    }, []);

    
	return (
		<div>
            <svg ref={whatSvg} width={svgHeight} height={svgHeight}/>
		</div>
	)
};

export default MainPlot;