import React from "react";
import styles from "./Comment.module.css";

export default function Comment(props) {
	return (
		<div className={styles.Comment}>
			<button onClick={props.delete}>Delete</button>
			<p>{props.description}</p>
			<p id={styles.Date}>{props.date}</p>
		</div>
	);
}
