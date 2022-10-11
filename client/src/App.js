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
	const host = 'http://192.168.1.3:8000';
	const title = 'CloudBook | Your notes on cloud';

	//Alerts
	const showAlert = (message, type) => {
		setAlert({
			message: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};
	return (
		<>
			<NoteState showAlert={showAlert} host={host}>
				<Router>
					<Navbar showAlert={showAlert} />
					<Alert alert={alert} />
					<div className='mainContainer'>
						<Routes>
							<Route exact path='/' element={<Home title={'Home'} />} />
							<Route exact path='/about' element={<About title={'About'} />} />
							<Route
								exact
								path='/login'
								element={
									<Login showAlert={showAlert} host={host} title={title} />
								}
							/>
							<Route
								exact
								path='/signup'
								element={
									<SignUp showAlert={showAlert} host={host} title={title} />
								}
							/>
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
