import React from 'react';
import axios from 'axios'
import ListItem from './ListItem';

export default class NewList extends React.Component {

	state = {
		users: [],
		page: 0,
		loading: false,
		prevY: 0
	};


	componentDidMount = () => {
		this.handleDataFetch(this.state.page);
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0
		};
		this.observer = new IntersectionObserver(this.callBack, options);
		this.observer.observe(this.loadingRef);
	};

	callBack = (entries, observer) => {
		console.log('reached call back', this.state.prevY, entries[0].boundingClientRect.y)
		const {users } = this.state;
		const y = entries[0].boundingClientRect.y;
		
		// Scroll Down
		if (this.state.prevY > y) {
			const currPage = users[users.length - 1].id;
			this.handleDataFetch(currPage);
			this.setState({ page: currPage });
		}
		this.setState({prevY: y})

		// Scroll up
	};


	handleDataFetch = (page) => {
		this.setState({ loading: true });
		return axios
			.get(`https://api.github.com/users?since=${page}&per_page=10`)
			.then(res => {
				this.setState({
					users: [...this.state.users, ...res.data],
					loading: false
				})
			})
	};

	render() {
		const {users} = this.state;
		const loadingCSS = {
			height: "50px",
			margin: "30px"
		};
		const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
		return (
			<div>
				<div id="list-container">
					<ul style={{listStyle: 'none', alignContent: 'center', textAlign: 'center', position: 'relative'}}>
						{users.map((user, index) => {
							return (
								<ListItem
									key={user.id}
									data={user}
								/>
							);
						})}
					</ul>
				</div>
				<div
					ref={loadingRef => (this.loadingRef = loadingRef)}
					style={loadingCSS}
				>
					<span style={loadingTextCSS}>Loading...</span>
				</div>
			</div>

		);
	};
}
