import React, {useState, useRef, useEffect} from "react";
import * as d3 from "d3";
import Select from 'react-select';

const ControlPanel = (props) => {

    const selection = props.selection;
    const attribute = props.attribute;

    var options = selection.map(function(selection) {
        return {value: selection, label: selection}
    })

    const [selectedOption, setSelectedOption] = useState(props.defaultV);
    const changeSelectedOption = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(selectedOption.value);
    }
    const menuStyle = {display: "flex", marginRight: 20}
    return (
          <div className = "ControlMenuContainer">
            <div style={menuStyle}>
                <div style={{marginRight: 7}}>{attribute}</div>
                <Select
                    options={options}
                    placeholder={props.defaultV}
                    defaultValue={props.defaultV}
                    value = {selectedOption}
                    onChange={changeSelectedOption}
                />
            </div>
          </div>
      )
};

export default ControlPanel;