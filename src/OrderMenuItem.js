import React from "react";
import {
  Item,
  Checkbox,
  Button,
  Portal,
  Segment,
  Header,
  Radio
} from "semantic-ui-react";
import remove from "lodash/remove";

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
      options: [data.label, ...this.state.checkboxOptions]
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
              <React.Fragment>
                <Checkbox
                  label="Pepperoni"
                  onChange={this.handleCheckboxChange}
                />
                <Checkbox
                  label="Italian Sausage"
                  onChange={this.handleCheckboxChange}
                />
                <Checkbox
                  label="Mushrooms"
                  onChange={this.handleCheckboxChange}
                />
                <Checkbox
                  label="Hamburger"
                  onChange={this.handleCheckboxChange}
                />
                <Checkbox label="Ham" onChange={this.handleCheckboxChange} />
                <Checkbox label="Bacon" onChange={this.handleCheckboxChange} />
                <Checkbox label="Onions" onChange={this.handleCheckboxChange} />
                <Checkbox
                  label="Banana Peppers"
                  onChange={this.handleCheckboxChange}
                />
                <Checkbox
                  label="Green and Black Olives"
                  onChange={this.handleCheckboxChange}
                />
                <Checkbox
                  label="Extra Cheese"
                  onChange={this.handleCheckboxChange}
                />
              </React.Fragment>
            ) : (
              ""
            )}
            {this.props.item.slug === "spaghetti" ? (
              <React.Fragment>
                <Radio
                  label="Garlic Bread"
                  checked={this.state.value === "garlic bread"}
                  onClick={() => this.setState({ value: "garlic bread" })}
                  onChange={this.handleRadioChange}
                />
                <Radio
                  label="Italian Roll"
                  checked={this.state.value === "italian roll"}
                  onClick={() => this.setState({ value: "italian roll" })}
                  onChange={this.handleRadioChange}
                />
              </React.Fragment>
            ) : (
              ""
            )}
            <br />
            <Portal
              closeOnTriggerClick
              openOnTriggerClick
              trigger={
                <Button
                  color="blue"
                  onClick={() =>
                    this.props.addItemToOrder(
                      this.props.item.id,
                      this.state.options
                    )
                  }
                >
                  Add item
                </Button>
              }
              open={this.state.open}
              onOpen={this.handleOpenPortal}
            >
              <Segment
                color="green"
                style={{
                  left: 10,
                  position: "fixed",
                  top: 10,
                  zIndex: 1000
                }}
              >
                <Header>Item Added!</Header>
              </Segment>
            </Portal>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default OrderMenuItem;
