import React from "react";
import classes from "./Orders.module.css";
import Header from "../Header/Header";
import OrderItem from "./OrderItem/OrderItem";
import { connect } from "react-redux";
import walk from "../../walk.gif";

const Orders = (props) => {

  const [result, setResult] = React.useState(
    <div className={classes.explore}>
      <h2 className={classes.exploreText}>Explore items to purchase</h2>
      <img src={walk} className={classes.exploreIcon} alt="" />
    </div>
  );

  React.useEffect(() => {
    let orders = 
      props.ordersArray.map((orderItem) => (
        <OrderItem
          key={orderItem.product}
          image={orderItem.image}
          productName={orderItem.product}
          price={orderItem.price}
          date={orderItem.date}
        />
      ));
    orders && setResult(orders);
  }, [props.ordersArray]);

  return (
    <>
      <Header />
      <h1 className={classes.OrderHeader}>Placed Orders</h1>
      <div className={classes.Orders}>{result}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ordersArray: state.Reducer.order,
  };
};

export default connect(mapStateToProps)(Orders);
