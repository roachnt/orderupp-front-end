import React from "react";
import { Checkbox } from "semantic-ui-react";

const PizzaOptions = props => (
  <React.Fragment>
    <Checkbox label="Pepperoni" onChange={props.handleCheckboxChange} />
    <Checkbox label="Italian Sausage" onChange={props.handleCheckboxChange} />
    <Checkbox label="Mushrooms" onChange={props.handleCheckboxChange} />
    <Checkbox label="Hamburger" onChange={props.handleCheckboxChange} />
    <Checkbox label="Ham" onChange={props.handleCheckboxChange} />
    <Checkbox label="Bacon" onChange={props.handleCheckboxChange} />
    <Checkbox label="Onions" onChange={props.handleCheckboxChange} />
    <Checkbox label="Banana Peppers" onChange={props.handleCheckboxChange} />
    <Checkbox
      label="Green and Black Olives"
      onChange={props.handleCheckboxChange}
    />
    <Checkbox label="Extra Cheese" onChange={props.handleCheckboxChange} />
  </React.Fragment>
);

export default PizzaOptions;
