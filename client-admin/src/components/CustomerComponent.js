import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContexts';

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }

  render() {
    // CUSTOMER LIST
    const customers = this.state.customers.map((item) => {
      return (
        <tr
          key={item._id}
          className="datatable"
          onClick={() => this.trCustomerClick(item)}
        >
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.active}</td>
          <td>
            {item.active === 0 ? (
              <span
                className="link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkEmailClick(item);
                }}
              >
                EMAIL
              </span>
            ) : (
              <span
                className="link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkDeactiveClick(item);
                }}
              >
                DEACTIVE
              </span>
            )}
          </td>
        </tr>
      );
    });

    // ORDER LIST
    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          className="datatable"
          onClick={() => this.trOrderClick(item)}
        >
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
        </tr>
      );
    });

    // ORDER DETAIL
    let items = [];
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td>
              <img
                src={"data:image/jpg;base64," + item.product.image}
                width="70"
                height="70"
                alt=""
              />
            </td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }

    return (
      <div>
        {/* CUSTOMER */}
        <div className="align-center">
          <h2 className="text-center">CUSTOMER LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>

        {/* ORDERS */}
        {this.state.orders.length > 0 ? (
          <div className="align-center">
            <h2 className="text-center">ORDER LIST</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>ID</th>
                  <th>Creation date</th>
                  <th>Cust. name</th>
                  <th>Cust. phone</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
                {orders}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* ORDER DETAIL */}
        {this.state.order ? (
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  // EVENTS
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }

  trOrderClick(item) {
    this.setState({ order: item });
  }

  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }

  lnkDeactiveClick(item) {
    if (window.confirm("Are you sure to deactive this customer?")) {
      this.apiPutCustomerDeactive(item._id, item.token);
    }
  }

  // API
  apiGetCustomers() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/customers', config).then((res) => {
      this.setState({ customers: res.data });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  apiGetCustomerSendmail(id) {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Deactive SUCCESS!");
        this.apiGetCustomers();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}

export default Customer;