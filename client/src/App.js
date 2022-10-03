import './StyleSheets/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<div
						className='container p-0'
						style={{ marginTop: '1rem', width: '90%' }}
					>
						<Routes>
							<Route exact path='/' element={<Home />} />
							<Route exact path='/about' element={<About />} />
							<Route exact path='/login' element={<Login />} />
							<Route exact path='/signup' element={<SignUp />} />
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
