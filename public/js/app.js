class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			species: '',
			breed: '',
			sex: '',
			image: '',
			age: null,
			adopted: false,
			animals: []
		}
	}

	componentDidMount() {
		fetch('/animals')
			.then(response => response.json())
			.then(animals => {
				this.setState({
					animals: animals
				})
			})
	}
	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmit = (event) => {
		event.preventDefault();
		fetch('/animals', {
			body: JSON.stringify({ 
				name: this.state.name, 
				species: this.state.species, 
				breed: this.state.breed, 
				sex: this.state.sex, 
				image: this.state.image, 
				age: this.state.age, 
			}),
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}).then(createdAnimal => {
			return createdAnimal.json()
		}).then(jsonedAnimal => {
			this.setState({
				name: '',
				species: '',
				breed: '',
				sex: '',
				image: '',
				age: 0,
				adopted: false,
				animals: [jsonedAnimal, ...this.state.animals]
			})
			console.log(jsonedAnimal)
		}).catch(error => console.log(error))
	}
	
	render() {
		return (
			<React.Fragment>
				<h1>Animals</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='name'>Name: </label>
					<input type='text' value={this.state.name} onChange={this.handleChange} id='name' />
					<br />
					<label htmlFor='species'>Species: </label>
					<input type='text' value={this.state.species} onChange={this.handleChange} id='species' />
					<br />
					<label htmlFor='breed'>Breed: </label>
					<input type='text' value={this.state.breed} onChange={this.handleChange} id='breed' />
					<br />
					<label htmlFor='sex'>Sex: </label>
					<input type='text' value={this.state.sex} onChange={this.handleChange} id='sex' />
					<br />
					<label htmlFor='image'>Image URL: </label>
					<input type='text' value={this.state.image} onChange={this.handleChange} id='image' />
					<br />
					<label htmlFor='age'>Age: </label>
					<input type='number' value={this.state.age} onChange={this.handleChange} id='age' />
					<br />
					<input type='submit' />
				</form>
				<div>
					{this.state.animals.map(animal => {
						return (
							<div>
								<h1>{animal.name}</h1>
								<p>{animal.species}</p>
								<p>{animal.breed}</p>
								<p>{animal.sex}</p>
								<p>{animal.image}</p>
								<p>{animal.age}</p>
								<p>adopted</p>
							</div>
						)
					})}
				</div>
			</React.Fragment>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));