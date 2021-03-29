import axios from "axios";
import React, { Component } from "react";
import Comment from "../Comment/Comment";
import styles from "./ProductPage.module.css";
import EditProduct from "../EditProduct/EditProduct";

export default class ProductPage extends Component {
	state = {
		name: "",
		count: 0,
		comments: [],
		imageUrl: "",
		size: {
			width: 0,
			height: 0,
		},
		weight: "",

		editMode: false,

		comment: "",
	};

	toggleEditing = () => {
		this.setState({ editMode: !this.state.editMode });
		this.getProductInfo();
	};

	getProductInfo() {
		axios
			.get(
				"https://interview-89c5c-default-rtdb.firebaseio.com/products/" +
					this.props.match.params.productId +
					".json"
			)
			.then(response => {
				this.setState({
					name: response.data.name,
					count: response.data.count,
					comments: response.data.comments,
					imageUrl: response.data.imageUrl,
					size: response.data.size,
					weight: response.data.weight,
				});
			})
			.catch(error => {
				console.error(error);
			});
	}

	saveProductChanges = (id, newProductData) => {
		axios
			.put("https://interview-89c5c-default-rtdb.firebaseio.com/products/" + id + ".json", {
				name: newProductData.name,
				id: id,
				count: newProductData.count,
				imageUrl: newProductData.imageUrl,
				size: {
					width: newProductData.size.width,
					height: newProductData.size.height,
				},
				comments: this.state.comments,
				weight: newProductData.weight,
			})
			.then(response => {
				this.toggleEditing();
			});
	};

	leaveComment = () => {
		let newComments = [];
		if (this.state.comments) {
			newComments = [...this.state.comments];
		}

		newComments.push({
			description: this.state.comment,
			productId: this.props.match.params.productId,
			id: newComments.length,
			date: new Date().toString(),
		});

		axios
			.put(
				"https://interview-89c5c-default-rtdb.firebaseio.com/products/" +
					this.props.match.params.productId +
					"/comments.json",
				newComments
			)
			.then(response => {
				this.getProductInfo();
			})
			.catch(error => {
				console.error(error);
			});
	};

	componentDidMount() {
		this.getProductInfo();
	}

	deleteComment(commentId) {
		const newComments = this.state.comments.filter(comment => comment.id != commentId);

		axios
			.put(
				"https://interview-89c5c-default-rtdb.firebaseio.com/products/" +
					this.props.match.params.productId +
					"/comments.json",
				newComments
			)
			.then(response => {
				this.getProductInfo();
			})
			.catch(error => {
				console.error(error);
			});
	}

	render() {
		return (
			<div className={styles.ProductPage}>
				{this.state.editMode ? (
					<EditProduct
						id={this.props.match.params.productId}
						comments={this.state.comments}
						name={this.state.name}
						count={this.state.count}
						imageUrl={this.state.imageUrl}
						width={this.state.size.width}
						height={this.state.size.height}
						weight={this.state.weight}
						cancel={this.toggleEditing}
						save={this.saveProductChanges}
					>
						Edit Product
					</EditProduct>
				) : null}

				<img src={this.state.imageUrl} alt={this.state.name} />
				<div className={styles.Characteristics}>
					<h1>{this.state.name}</h1>
					<hr />
					<p>Count: {this.state.count}</p>
					<p>Width: {this.state.size.width}</p>
					<p>Height: {this.state.size.height}</p>
					<p>Weight: {this.state.weight}</p>
					<button onClick={this.toggleEditing}>Edit</button>
				</div>
				<hr />
				<div className={styles.CommentSection}>
					<h2>Comments:</h2>
					{this.state.comments
						? this.state.comments.map((comment, index) => {
								return (
									<Comment
										delete={() => this.deleteComment(comment.id)}
										key={index}
										description={comment.description}
										date={comment.date}
									/>
								);
						  })
						: null}
					<textarea
						className={styles.Comment}
						placeholder="Leave your comment here..."
						value={this.state.comment}
						onChange={event => {
							this.setState({ comment: event.target.value });
							event.stopPropagation();
						}}
					/>
					<button onClick={this.leaveComment}>Publish</button>
				</div>
			</div>
		);
	}
}
