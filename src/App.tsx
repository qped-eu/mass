import { Fragment} from 'react';
import logo from './logo.png';
import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
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
					<Route path='/' element={home} />
					<Route path='/documentation' element={docu} />
					<Route path='/configurator' element={<Configurator />} />
					<Route path='/style' element={style} />
					<Route path='/semantics' element={sem}/>
					<Route path='/coverage' element={cov} />
					<Route path='/class' element={cla} />
					<Route path='/metrics' element={met} />
				</Routes>
				<Footer/>
			</Router>
    	</Fragment>
  );
};

export default App;
