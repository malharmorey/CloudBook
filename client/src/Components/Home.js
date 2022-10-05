import React from 'react';
import '../StyleSheets/home.css';
import Notes from './Notes';
import NewNote from './NewNote';

const Home = (props) => {
	return (
		<>
			<h2>Your Notes</h2>
			<Notes />
			<NewNote />
		</>
	);
};

export default Home;
