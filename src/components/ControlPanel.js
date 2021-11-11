import React, {useState, useRef, useEffect} from "react";
import * as d3 from "d3";
import Select from 'react-select';

const ControlPanel = (props) => {

    const menus = props.menuOptions;
    const attribute = props.attribute;

    var options = menus.map(function(menus, i) {
        return {value: menus, label: menus}
    })

    const [selectedOption, setSelectedOption] = useState(props.defaultVal);
    const changeSelectedOption = (selectedOption) => {
        setSelectedOption(selectedOption);
        props.setMenu(selectedOption.value);
    }

    return (
          <div className = "ControlMenuContainer">
            <div style={{display: "flex", marginRight: 20}}>
                <div style={{marginTop: 9, marginRight: 7}}>{attribute}</div>
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