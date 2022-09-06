import { Fragment, useState, useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Configurator from './Pages/Configurator/Configurator';
import Footer from './Components/Footer/Footer';
import MarkdownContent from './Pages/MarkdownContent';

const importMD = function(mdFile:String, setInput:Function){
	import(`./markdown/${mdFile}`)
		.then(res => {
			fetch(res.default)
			.then(res => res.text())
			.then(res => setInput(res))
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
}

const App = () => {
	const [home, setHome] = useState<string>("Loading");
	const [docu, setDocu] = useState<string>("Loading");
	const [style, setStyle] = useState<string>("Loading");
	const [sem, setSem] = useState<string>("Loading");
	const [cov, setCov] = useState<string>("Loading");
	const [cla, setCla] = useState<string>("Loading");
	const [met, setMet] = useState<string>("Loading");

	useEffect(() => {
		importMD("qped-mass.md", setHome);
		importMD("mass-doku.md", setDocu);
		importMD("qped-style.md", setStyle);
		importMD("qped-semantics.md", setSem);
		importMD("qped-coverage.md", setCov);
		importMD("qped-class.md", setCla);
		importMD("qped-metrics.md", setMet);
	}, []);

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
					<Route path='/' element={<MarkdownContent input={home}/>} />
					<Route path='/documentation' element={<MarkdownContent input={docu}/>} />
					<Route path='/configurator' element={<Configurator />} />
					<Route path='/style' element={<MarkdownContent input={style}/>} />
					<Route path='/semantics' element={<MarkdownContent input={sem}/>}/>
					<Route path='/coverage' element={<MarkdownContent input={cov}/>} />
					<Route path='/class' element={<MarkdownContent input={cla}/>} />
					<Route path='/metrics' element={<MarkdownContent input={met}/>} />
				</Routes>
				<Footer/>
			</Router>
    	</Fragment>
  );
};

export default App;
