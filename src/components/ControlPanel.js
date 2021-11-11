import React, {useState, useRef, useEffect} from "react";
import Select from 'react-select';

const ControlPanel = (props) => {

    const selection = props.selection;
    const attribute = props.attribute;

    var options = selection.map(function(selection, i) {
        return {value: i, label: selection}
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