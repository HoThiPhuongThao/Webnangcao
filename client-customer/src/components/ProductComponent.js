import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const { params } = this.props;
    if (params?.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
    if (params.cid) {

    } else if (params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props;
    if (params?.cid && params.cid !== prevProps.params?.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
    if (params.cid && params.cid !== prevProps.params.cid) {
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios
      .get(`/api/customer/products/category/${cid}`)
      .then((res) => {
        const result = res.data;
        this.setState({ products: result });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

   // apis
    apiGetProductsByKeyword(keyword) {
        axios.get('/api/customer/products/search/' + keyword).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }

  render() {
    const { products } = this.state;

    const prods = products.map((item) => {
    return (
      <div key={item._id} className="inline">
        <figure>
        <Link to={'/product/' + item._id}>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              width="300px"
              height="300px"
              alt={item.name || 'Product'}
            />
          </Link>
          <figcaption className="text-center">
            {item.name}
            <br />
            Price: {item.price}
          </figcaption>
        </figure>
      </div>
    );
  });

    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }
}

export default withRouter(Product);
