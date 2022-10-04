import React from 'react';
import '../StyleSheets/home.css';
import Notes from './Notes';

const Home = (props) => {
	return (
		<>
			<h2>Your Notes</h2>
			<Notes showAlert={props.showAlert} />
		</>
	);
};

export default Home;
