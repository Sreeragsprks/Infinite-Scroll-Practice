import React from "react";

const ListItem = ({ data, top, refVal, id }) => (
		<li className="list-item" style={{boxShadow: '2px 2px 9px 0px #bbb', width: '70%', height: '60%'}}>
			<img src={data.avatar_url} alt='' height='100px' width='200px' />
			<p>
				{data.login}
			</p>
			<p>
				<a href={`${data.html_url}`} target='blank'>ProfileLink</a>
			</p>
		</li>
);
export default ListItem;
