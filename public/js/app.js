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

	deleteAnimal = (id, index) => {
		fetch(`animals/${id}`, { method: 'DELETE' })
			.then(data => {
				this.setState({
					animals: [
						...this.state.animals.slice(0, index),
						...this.state.animals.slice(index + 1)
					]
				})
			})
	}

	updateAnimal = (animal, index) => {
		animal.adopted = !animal.adopted;
		fetch(`animals/${animal._id}`, {
			body: JSON.stringify(animal),
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(updatedAnimal => updatedAnimal.json())
			.then(jsonedAnimal => {
				fetch('/animals')
					.then(response => response.json())
					.then(animals => {
						this.setState({ animals: animals })
					})
			})
		console.log(this.state.animal)
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
				adopted: this.state.adopted
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
				<h1>Sunny Philadelphia Animal Shelter</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="mb-3">
						<label htmlFor='name' className="form-label">Name: </label>
						<input type='text' value={this.state.name} onChange={this.handleChange} id='name' className="form-control"/>
					</div>
					<div className="mb-3">
						<label htmlFor='species' className="form-label">Species: </label>
						<input type='text' value={this.state.species} onChange={this.handleChange} id='species' className="form-control"/>
					</div>
					<div className="mb-3">
						<label htmlFor='breed' className="form-label">Breed: </label>
						<input type='text' value={this.state.breed} onChange={this.handleChange} id='breed' className="form-control"/>
					</div>
					<div className="mb-3">
						<label htmlFor='sex' className="form-label">Sex: </label>
						<input type='text' value={this.state.sex} onChange={this.handleChange} id='sex' className="form-control"/>
					</div>
					<div className="mb-3">
						<label htmlFor='image' className="form-label">Image URL: </label>
						<input type='text' value={this.state.image} onChange={this.handleChange} id='image' className="form-control"/>
					</div>
					<div className="mb-3">
						<label htmlFor='age' className="form-label">Age: </label>
						<input type='number' value={this.state.age} onChange={this.handleChange} id='age' className="form-control"/>
					</div>
					<br />
					<input type='submit' className="btn btn-primary"/>	
				</form>
				<br />
				<div className='container'>
					<div className='row'>
						{this.state.animals.map((animal, index) => {
							return (
								<div className='col-sm-4'>
									<div className='card' style={{width: '18rem'}}>
										<img src={animal.image} className='card-img-top' />
										<div className='card-body'>
											<h5 className={`card-title ${animal.adopted ? 'animal' : ''}`}>{animal.name}</h5>
											<p class='card-text'>{animal.adopted ? '(Adopted)' : ''}</p>
										</div>
										<ul className='list-group list-group-flush'>
											<li className='list-group-item'>{animal.species}</li>
											<li className='list-group-item'>{animal.breed}</li>
											<li className='list-group-item'>{animal.sex}</li>
											<li className='list-group-item'>{animal.age}</li>
										</ul>
										<div className='card-body'>
											<button onClick={() => this.updateAnimal(animal, index)}>{animal.adopted ? 'Stray' : 'Adopt'}</button>
											<button onClick={() => this.deleteAnimal(animal._id, index)}>Delete</button>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</React.Fragment>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));