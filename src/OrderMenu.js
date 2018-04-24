import React from "react";
import { Item, Grid, Loader } from "semantic-ui-react";
import OrderMenuItem from "./OrderMenuItem";
import { connect } from "react-redux";
import { addItemToOrderAction } from "./actions/orderActions";

// TODO order by category, price
const OrderMenu = props => (
  <div>
    <Grid>
      <Grid.Column width={10} style={{ margin: "0 auto" }}>
        <Item.Group divided>
          {props.items ? (
            props.items.map(item => (
              <OrderMenuItem
                item={item}
                addItemToOrder={props.addItemToOrder}
                key={item.id}
              />
            ))
          ) : (
            <Loader active inline="centered" />
          )}
        </Item.Group>
      </Grid.Column>
    </Grid>
  </div>
);

const mapStateToProps = state => state;
const mapActionsToProps = {
  addItemToOrder: addItemToOrderAction
};

export default connect(mapStateToProps, mapActionsToProps)(OrderMenu);
