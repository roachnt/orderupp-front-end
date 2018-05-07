import React from "react";
import { Radio } from "semantic-ui-react";

const SpaghettiOptions = props => (
  <React.Fragment>
    <Radio
      label="Garlic Bread"
      checked={props.value === "garlic bread"}
      onChange={props.handleRadioChange}
    />
    <Radio
      label="Italian Roll"
      checked={props.value === "italian roll"}
      onChange={props.handleRadioChange}
    />
  </React.Fragment>
);

export default SpaghettiOptions;
