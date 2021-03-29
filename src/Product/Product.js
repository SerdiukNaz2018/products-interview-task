import React from "react";
import styles from "./Product.module.css";
import { NavLink } from "react-router-dom";

export default function Product(props) {
	return (
		<NavLink to={"/products/" + props.id}>
			<div className={styles.Product}>
				<img src={props.imageUrl} alt={props.name} />
				<h2> {props.name}</h2>

				<div className={styles.Characteristics}>
					<hr />
					<p>Count: {props.count}</p>
					<p>Width: {props.size.width}</p>
					<p>Height: {props.size.height}</p>
					<p>Weight: {props.weight}</p>
				</div>
				<button
					onClick={event => {
						event.preventDefault();
						props.delete();
					}}
				>
					Delete
				</button>
			</div>
		</NavLink>
	);
}
