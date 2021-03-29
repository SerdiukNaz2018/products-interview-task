import React, { Component } from "react";
import styles from "./ProductsPage.module.css";
import axios from "axios";
import Product from "../Product/Product";
import EditProduct from "../EditProduct/EditProduct";

export default class ProductsPage extends Component {
	state = {
		products: [],

		addingNewProduct: false,
	};

	toggleModalWindow = () => {
		this.setState({ addingNewProduct: !this.state.addingNewProduct });
	};

	componentDidMount() {
		this.getProducts();
	}

	deleteProduct(productId) {
		const newProductsArray = this.state.products.filter(product => product.id != productId);
		axios
			.put("https://interview-89c5c-default-rtdb.firebaseio.com/products/.json", newProductsArray)
			.then(response => {
				this.getProducts();
			})
			.catch(error => {
				console.error(error);
			});
	}

	getProducts = () => {
		axios
			.get("https://interview-89c5c-default-rtdb.firebaseio.com/products.json")
			.then(response => {
				var filtered = response.data.filter(element => {
					return element != null;
				});

				this.setState({ products: filtered });
			})
			.catch(error => {
				console.error(error);
			});
	};

	sortProductsBy = criteria => {
		const sortedProducts = this.state.products.sort((a, b) => {
			return a[criteria] > b[criteria] ? 1 : -1;
		});

		this.setState({ products: sortedProducts });
	};

	addNewProduct = (id, newProduct) => {
		const newProducts = [...this.state.products];

		newProducts.push({ ...newProduct, id: newProducts.length });
		axios
			.put("https://interview-89c5c-default-rtdb.firebaseio.com/products.json", newProducts)
			.then(response => {
				this.toggleModalWindow();
				this.getProducts();
			})
			.catch(error => {
				console.error(error);
			});
	};

	render() {
		return (
			<div className={styles.ProductsPage}>
				{this.state.addingNewProduct ? (
					<EditProduct cancel={this.toggleModalWindow} save={this.addNewProduct}>
						New Product
					</EditProduct>
				) : null}
				<div className={styles.Buttons}>
					<button onClick={() => this.sortProductsBy("name")}>Sort by name</button>
					<button onClick={() => this.sortProductsBy("count")}>Sort by count</button>
					<button onClick={this.toggleModalWindow}>New Product</button>
				</div>
				{this.state.products.map((product, index) => {
					return (
						<Product
							delete={() => this.deleteProduct(product.id)}
							key={product.id}
							id={index}
							name={product.name}
							imageUrl={product.imageUrl}
							count={product.count}
							size={product.size}
							weight={product.weight}
							refresh={this.getProducts}
						/>
					);
				})}
			</div>
		);
	}
}
