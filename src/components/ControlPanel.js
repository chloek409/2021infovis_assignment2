import React, {useState, useRef, useEffect} from "react";
import * as d3 from "d3";
import Select from 'react-select';

const ControlPanel = (props) => {

    const nominal = props.selection;
    const attribute = props.attribute;

    var options = nominal.map(function(nominal) {
        return {value: nominal, label: nominal}
    })
    const [selectedOption, setSelectedOption] = useState(null);

const changeSelectedOption = () => {
    // setSelectedOption("circles");
}
    const menuStyle = {display: "flex", marginRight: 20}
      return (
          <div className = "ControlMenuContainer">
            <div style={menuStyle}>
                <div style={{marginRight: 7}}>{attribute}</div>
                <Select defaultValue={selectedOption} options={options} onChange={changeSelectedOption}/>
            </div>
          </div>
      )
};

export default ControlPanel;