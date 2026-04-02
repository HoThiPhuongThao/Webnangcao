import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    // Hiển thị sản phẩm mới
    const newprods = this.state.newprods.map((item) => {
      return (
      <div key={item._id} className="inline">
        <figure>
          <a href={`/product/${item._id}`}>
          <Link to={'/product/' + item._id}>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              width="300"
              height="300"
              alt={item.name}
            />
          </Link>
          </a>
          <figcaption className="text-center">
            {item.name}
            <br />
            Price: {item.price}
          </figcaption>
        </figure>
      </div>
      );
  });

    // Hiển thị sản phẩm hot
    const hotprods = this.state.hotprods.map((item) => {
      <div key={item._id} className="inline">
        <figure>
          <a href={`/product/${item._id}`}>
          <Link to=''>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              width="300"
              height="300"
              alt={item.name}
            />
            </Link>
          </a>
          <figcaption className="text-center">
            {item.name}
            <br />
            Price: {item.price}
          </figcaption>
        </figure>
      </div>
  });

    return (
      <div>
        {/* Danh sách sản phẩm mới */}
        <div className="align-center">
          <h2 className="text-center">NEW PRODUCTS</h2>
          {newprods}
        </div>

        {/* Danh sách sản phẩm hot */}
        {this.state.hotprods.length > 0 && (
          <div className="align-center">
            <h2 className="text-center">HOT PRODUCTS</h2>
            {hotprods}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // API lấy danh sách sản phẩm mới
  apiGetNewProducts() {
    axios
      .get('/api/customer/products/new')
      .then((res) => {
        const result = res.data;
        this.setState({ newprods: result });
      })
      .catch((error) => {
        console.error('Error fetching new products:', error);
      });
  }

  // API lấy danh sách sản phẩm hot
  apiGetHotProducts() {
    axios
      .get('/api/customer/products/hot')
      .then((res) => {
        const result = res.data;
        this.setState({ hotprods: result });
      })
      .catch((error) => {
        console.error('Error fetching hot products:', error);
      });
  }
}

export default Home;
