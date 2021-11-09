import React, {useState, useRef, useEffect} from "react";
import * as d3 from "d3";
import Select from 'react-select';

const ControlPanel = (props) => {

    
    const sel = props.selection;
    let selection = [];
    if (props.defaultVal === "none") {
        selection = sel;
    }
    else selection = sel;

    const attribute = props.attribute;

    var options = selection.map(function(i, selection) {
        return {value: selection, label: i}
    })

    const [selectedOption, setSelectedOption] = useState(props.defaultVal);
    const changeSelectedOption = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(selectedOption)
    }


    const menuStyle = {display: "flex", marginRight: 20}
    return (
          <div className = "ControlMenuContainer">
            <div style={menuStyle}>
                <div style={{marginRight: 7}}>{attribute}</div>
                <Select
                    options={options}
                    placeholder={props.defaultVal}
                    defaultValue={props.defaultVal}
                    value = {selectedOption}
                    onChange={changeSelectedOption}
                />
            </div>
          </div>
      )
};

export default ControlPanel;