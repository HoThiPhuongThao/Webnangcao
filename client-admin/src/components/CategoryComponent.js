// import axios from 'axios'; 
// import React, { Component } 
// from 'react'; 
// import MyContext 
// from '../contexts/MyContexts'; 
// import CategoryDetail from './CategoryDetailComponent';

// class Category extends Component { 
//     static contextType = MyContext; // using this.context to access global state 
//     constructor(props) { 
//         super(props); this.state = { 
//             categories: [], 
//             itemSelected: null
//         };
//     }
//     render() { 
//         const cates = this.state.categories.map((item) => { 
//             return (
//                 <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
//                     <td>{item._id}</td>
//                     <td>{item.name}</td>
//                 </tr>
//             );
//         }); 
//         return ( 
//             <div>
//                 <div className="float-left">
//                     <h2 className="text-center">CATEGORY LIST</h2>
//                     <table className="datatable" border="1">
//                         <tbody>
//                             <tr className="datatable">
//                                 <th>ID</th>
//                                 <th>Name</th>
//                             </tr>
//                             {cates}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="inline" />
//                 <CategoryDetail item={this.state.item} updateCategories={this.updateCategories} />
//                 <div className="float-clear" />
//             </div>
//         );
// } 
// updateCategories = (categories) => { // arrow-function 
// this.setState({ categories: categories });
// }
// // event-handlers 
// trItemClick(item) { 
//     this.setState({ itemSelected: item });
// }
// // apis 
// apiGetCategories() {
//     const config = { headers: { 'x-access-token': this.context.token } };
//     axios
//         .get('/api/admin/categories', config)
//         .then((res) => {
//             const result = res.data;
//             this.setState({ categories: result });
//         })
//         .catch((err) => {
//             console.error('Error fetching categories:', err);
//             alert('Failed to load categories. Please check your API or token.');
//         });
// }
// }

// export default Category;




import axios from 'axios'; 
import React, { Component } from 'react'; 
import MyContext from '../contexts/MyContexts'; 
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component { 
    static contextType = MyContext; // using this.context to access global state 

    constructor(props) { 
        super(props); 
        this.state = { 
            categories: [], 
            itemSelected: null, // Dữ liệu của hàng được chọn
        };
    }

    componentDidMount() { 
        this.apiGetCategories(); // Lấy dữ liệu khi component được render
    }

    // Render bảng dữ liệu
    render() { 
        const cates = this.state.categories.map((item) => { 
            return (
                <tr 
                    key={item._id} 
                    className="datatable" 
                    onClick={() => this.trItemClick(item)} // Bắt sự kiện khi click
                >
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                </tr>
            );
        });

        return ( 
            <div>
                {/* Danh sách category */}
                <div className="float-left">
                    <h2 className="text-center">CATEGORY LIST</h2>
                    <table className="datatable" border="1">
                        <tbody>
                            <tr className="datatable">
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                            {cates}
                        </tbody>
                    </table>
                </div>

                {/* Hiển thị thông tin chi tiết */}
                <div className="inline">
                    <CategoryDetail 
                        item={this.state.itemSelected} // Truyền dữ liệu hàng đã chọn
                        updateCategories={this.updateCategories} 
                    />
                </div>
                <div className="float-clear" />
            </div>
        );
    }

    // Cập nhật danh sách category
    updateCategories = (categories) => { 
        this.setState({ categories: categories });
    }

    // Khi bấm vào một hàng
    trItemClick(item) { 
        this.setState({ itemSelected: item }); // Lưu thông tin hàng đã chọn
    }

    // Lấy dữ liệu category từ API
    apiGetCategories() {
        const config = { headers: { 'x-access-token': this.context.token } }; 
        axios.get('/api/admin/categories', config)
            .then((res) => {
                const result = res.data; 
                this.setState({ categories: result });
            })
            .catch((err) => {
                console.error('Error fetching categories:', err);
                alert('Failed to load categories. Please check your API or token.');
            });
    }
}

export default Category;
