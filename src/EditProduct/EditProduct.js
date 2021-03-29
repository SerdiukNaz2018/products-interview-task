import axios from "axios";
import React, { Component } from "react";
import styles from "../Modal.module.css";

export default class EditProduct extends Component {
	state = {
		name: this.props.name,
		count: this.props.count,
		imageUrl: this.props.imageUrl,
		width: this.props.width,
		height: this.props.height,
		weight: this.props.weight,
	};

	changeCharacteristic = (characteristic, value) => {
		this.setState({ [characteristic]: value });
	};

	render() {
		return (
			<div className={styles.Backdrop} onClick={this.props.cancel}>
				<div className={styles.Modal} onClick={event => event.stopPropagation()}>
					<h2>{this.props.children}</h2>
					<input
						placeholder="Name"
						value={this.state.name}
						onChange={event => {
							this.changeCharacteristic("name", event.target.value);
						}}
					/>
					<input
						placeholder="Count"
						type="number"
						value={this.state.count}
						onChange={event => {
							this.changeCharacteristic("count", event.target.value);
						}}
					/>
					<input
						placeholder="Image URL"
						value={this.state.imageUrl}
						onChange={event => {
							this.changeCharacteristic("imageUrl", event.target.value);
						}}
					/>
					<input
						placeholder="Width"
						type="number"
						value={this.state.width}
						onChange={event => {
							this.changeCharacteristic("width", event.target.value);
						}}
					/>
					<input
						placeholder="Height"
						type="number"
						value={this.state.height}
						onChange={event => {
							this.changeCharacteristic("height", event.target.value);
						}}
					/>
					<input
						placeholder="Weight"
						value={this.state.weight}
						onChange={event => {
							this.changeCharacteristic("weight", event.target.value);
						}}
					/>
					<button
						onClick={() =>
							this.props.save(this.props.id, {
								id: this.props.id,
								name: this.state.name,
								count: this.state.count,
								imageUrl: this.state.imageUrl,
								size: {
									width: this.state.width,
									height: this.state.height,
								},
								weight: this.state.weight,
								comments: this.props.comments,
							})
						}
					>
						Save
					</button>
					<button onClick={this.props.cancel}>Cancel</button>
				</div>
			</div>
		);
	}
}
