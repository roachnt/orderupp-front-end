import React from "react";
import { Portal, Button, Segment, Header } from "semantic-ui-react";

const AddItemPortal = props => (
  <Portal
    closeOnTriggerClick
    openOnTriggerClick
    trigger={
      <Button
        color="blue"
        onClick={() => props.addItemToOrder(props.itemId, props.options)}
      >
        Add item
      </Button>
    }
    open={props.open}
    onOpen={props.handleOpenPortal}
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
);

export default AddItemPortal;
