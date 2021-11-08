import React, { useRef, useEffect} from "react";
import MaterialTable from "material-table";
import * as d3 from "d3";

const TableView = (props) => {

    const tableStyle = {
        width:"400px",
        height:"350px"
    }
    
    return (
        <div className = "TableViewContainer" style={tableStyle}>
          <div>
              "TableView locates HERE"
          </div>
        </div>
    )
};

export default TableView;