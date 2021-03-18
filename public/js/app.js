import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
		};
	}

	componentDidMount() {
		fetch('/animals')
			.then((response) => response.json())
			.then((animals) => {
				this.setState({
					animals: animals,
				});
			});
	}

  render() {
    
  }
}
