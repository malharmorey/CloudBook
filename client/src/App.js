import './StyleSheets/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AlertState from './context/alerts/AlertState';

function App() {
	const host = 'http://192.168.1.11:8000';
	const title = 'CloudBook | Your notes on cloud';

	return (
		<>
			<AlertState>
				<NoteState host={host}>
					<Router>
						<Navbar />

						<div className='mainContainer'>
							<Routes>
								<Route exact path='/' element={<Home title={'Home'} />} />
								<Route
									exact
									path='/about'
									element={<About title={'About'} />}
								/>
								<Route
									exact
									path='/login'
									element={<Login host={host} title={title} />}
								/>
								<Route
									exact
									path='/signup'
									element={<SignUp host={host} title={title} />}
								/>
							</Routes>
						</div>
					</Router>
				</NoteState>
			</AlertState>
		</>
	);
}

export default App;
