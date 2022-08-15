import { Fragment} from 'react';
import logo from './logo.png';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Documentation from './Pages/Documentation/Documentation';
import Configurator from './Pages/Configurator/Configurator';
import StyleTutorial from './Pages/Tutorials/StyleTutorial';
import SemanticTutorial from './Pages/Tutorials/SemanticTutorial';
import CoverageTutorial from './Pages/Tutorials/CoverageTutorial';
import ClassTutorial from './Pages/Tutorials/ClassTutorial';
import MetricTutorial from './Pages/Tutorials/MetricTutorial';
import Footer from './Components/Footer/Footer';

const home = <Home/>;
const docu = <Documentation/>
const style = <StyleTutorial/>;
const sem = <SemanticTutorial/>;
const cov = <CoverageTutorial/>;
const cla = <ClassTutorial/>;
const met = <MetricTutorial/>;

const App = () => {
	return (
		<Fragment>
			<Router>
				<Navbar/>
				<div className='App'>
					<header className='App-header'>
						<img src={logo} className='App-logo' alt='logo' />
						<h1 className='App-title'>Welcome to the QPED-project's configurator</h1>
						<p className='App-intro'>Easily configure our checkers for Quarterfall.</p>
					</header>
				</div>
				<Routes>
					<Route path='/mass' element={home} />
					<Route path='/mass/documentation' element={docu} />
					<Route path='/mass/configurator' element={<Configurator />} />
					<Route path='/mass/style' element={style} />
					<Route path='/mass/semantics' element={sem}/>
					<Route path='/mass/coverage' element={cov} />
					<Route path='/mass/class' element={cla} />
					<Route path='/mass/metrics' element={met} />
				</Routes>
				<Footer/>
			</Router>
    	</Fragment>
  );
};

export default App;
