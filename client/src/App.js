import './StyleSheets/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Alert from './Components/Alert';

function App() {
	const [alert, setAlert] = useState(null);

	//Alerts
	const showAlert = (message, type) => {
		setAlert({
			message: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 4000);
	};
	return (
		<>
			<NoteState showAlert={showAlert}>
				<Router>
					<Navbar />
					<Alert alert={alert} />
					<div
						className='container p-0'
						style={{ marginTop: '1rem', width: '90%' }}
					>
						<Routes>
							<Route exact path='/' element={<Home />} />
							<Route exact path='/about' element={<About />} />
							<Route
								exact
								path='/login'
								element={<Login showAlert={showAlert} />}
							/>
							<Route
								exact
								path='/signup'
								element={<SignUp showAlert={showAlert} />}
							/>
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
