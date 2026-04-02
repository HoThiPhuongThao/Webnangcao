import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  lnkLogoutClick = () => {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  render() {
    const { token, customer, mycart } = this.context;

    return (
      <div>
        {token === '' ? (
          <div className="float-left">
            <Link to='/login'>Login</Link> | 
            <Link to='/signup'>Sign-up</Link> | 
            <Link to='/active'>Active</Link>
          </div>
        ) : (
          <>
            {/* LEFT */}
            <div className="float-left">
              Hello <b>{customer?.name}</b> | 
              <Link to='/home' onClick={this.lnkLogoutClick}>Logout</Link> | 
              <Link to='/myprofile'>My profile</Link> |  
              <Link to='/myorders'>My orders</Link>
            </div>

            {/* RIGHT */}
            <div className="float-right">
              <Link to='/mycart'>My cart</Link> {" "}
              have <b>{mycart?.length}</b> items
            </div>
          </>
        )}

        <div className="float-clear" />
      </div>
    );
  }
}

export default Inform;