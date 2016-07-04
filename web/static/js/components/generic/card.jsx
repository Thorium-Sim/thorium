import React from 'react';

const Card = (props) => (
	<div className="card" style={props.style || {}}>
	{(() => {
		if (props.image) {
		return <img className="card-img-top" data-src={props.image} />;
		}
	})()}
	<div className="card-block">
	{(() => {
		if (props.title) {
		return 	<h4 className="card-title">{props.title}</h4>;
		}
	})()}
	{props.children}
	</div>
	</div>
	);
export default  Card;
