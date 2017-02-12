import React from 'react';

const Col = (props) => {
	let className = props.className;
	return (
		<div className={ className }>
		{ props.children }
		</div>
		);
};

export default Col;
