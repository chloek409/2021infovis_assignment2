import React, { useRef, useEffect} from "react";
import MaterialTable from "material-table";

const TableView = (props) => {

    const tableviewCol = [
        { title: "title", field: "title"},
        { title: "genre", field: "genre"},
        { title: "creative_type", field: "creative_type"},
        { title: "release", field: "release"},
        { title: "rating", field: "rating"}
    ]
 
    return (
        <div className = "TableViewContainer" style={{ marginTop: 50, width:"550px", height:"400px"}}>
            <MaterialTable
                columns={tableviewCol}
                data={props.selectedMovies}
                options={{
                    toolbar:false,
                    paging: false,
                    maxBodyHeight: 350,
                    rowStyle: {fontSize: 12.5} }}
            />
        </div>
    )
};

export default TableView;