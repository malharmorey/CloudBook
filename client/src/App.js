import './StyleSheets/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';

function App() {
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/about' element={<About />} />
					</Routes>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
