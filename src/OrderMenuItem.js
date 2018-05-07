import React from "react";
import { Item } from "semantic-ui-react";
import remove from "lodash/remove";

import PizzaOptions from "./PizzaOptions";
import SpaghettiOptions from "./SpaghettiOptions";
import AddItemPortal from "./AddItemPortal";

// TODO handle different foods' options
// (pizza should have toppings, pastas have choice of garlic bread or italian roll)
class OrderMenuItem extends React.Component {
  state = {
    open: false,
    checkboxOptions: [],
    radioOptions: [],
    options: []
  };
  portalTime = null;

  handleOpenPortal = () => {
    if (this.portalTime) clearTimeout(this.portalTime);
    this.setState({ open: true });
    this.portalTime = setTimeout(() => {
      this.setState({ open: false });
    }, 2000);
  };

  handleCheckboxChange = (e, data) => {
    console.log(data);
    const label = data.label;
    const checked = data.checked;
    let checkboxOptions = [...this.state.checkboxOptions.slice()];
    checked
      ? checkboxOptions.push(label)
      : (checkboxOptions = remove(checkboxOptions, option => option !== label));
    this.setState({
      checkboxOptions,
      options: [...checkboxOptions, ...this.state.radioOptions]
    });
  };

  handleRadioChange = (e, data) => {
    this.setState({
      radioOptions: [data.label],
      options: [data.label, ...this.state.checkboxOptions],
      value: data.label.toLowerCase()
    });
  };

  componentWillUnmount() {
    clearTimeout(this.portalTime);
  }
  render() {
    return (
      <Item id={this.props.item.id} key={this.props.item.id}>
        <Item.Content>
          <Item.Header as="a">{this.props.item.name}</Item.Header>
          <Item.Meta>
            <span className="cinema">${this.props.item.price.toFixed(2)}</span>
          </Item.Meta>
          <Item.Description>{this.props.item.description}</Item.Description>
          <Item.Extra>
            {this.props.item.category === "pizza" ? (
              <PizzaOptions handleCheckboxChange={this.handleCheckboxChange} />
            ) : (
              ""
            )}
            {this.props.item.slug === "spaghetti" ? (
              <SpaghettiOptions
                value={this.state.value}
                handleRadioChange={this.handleRadioChange}
              />
            ) : (
              ""
            )}
            <br />
            <AddItemPortal
              addItemToOrder={this.props.addItemToOrder}
              itemId={this.props.item.id}
              options={this.state.options}
              open={this.state.open}
              handleOpenPortal={this.handleOpenPortal}
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default OrderMenuItem;
