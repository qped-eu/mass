import { Fragment, useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { JsonForms } from '@jsonforms/react';
import { createAjv } from '@jsonforms/core';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.png';
import './App.css';
import schema from './mass.schema.json';
import uischema from './mass.uischema.json';
import { Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Markdown from './Markdown'
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  markdownContainer: {
    width: '90%',
	borderRadius: '10px',
	border: '1px solid gray',
	margin: 'auto',
	padding: '20px',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  actionButton: {
    display: 'block !important',
  },
  buttons: {
	display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const useResize = (myRef: React.RefObject<HTMLDivElement>) => {
	const getWidth = useCallback(() => myRef?.current?.offsetWidth, [myRef]);

	const [width, setWidth] = useState<number | undefined>(undefined);

	useEffect(() => {
		const handleResize = () => {
			setWidth(getWidth());
		};	
		if (myRef.current) {
			setWidth(getWidth());
		}
	
		window.addEventListener('resize', handleResize);

		return () => {	
			window.removeEventListener('resize', handleResize);
		};
	}, [myRef, getWidth]);
	
	return width && width > 25 ? width - 25 : width;
};

const initialData = {
  "styleSelected": false,
  "semanticsSelected": false,
  "coverageSelected": false,
  "classSelected": false,
  "metricsSelected": false,
  "syntax": {
    "level": "BEGINNER"
  }
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const handleDefaultsAjv = createAjv({useDefaults: true});

const App = () => {
	const classes = useStyles();
	const [data, setData] = useState<any>(initialData);
	const [tab, setTab] = useState<any>('home');
	const [tut, setTut] = useState<any>('syntax');
	const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
	const qped_mass = 'qped-mass.md';
	const mass_doku = 'mass-doku.md';
	//const tut_syntax = 'tutorials/qped-syntax.md';
	//const tut_style = 'tutorials/qped-style.md';
	//const tut_semantic = 'tutorials/qped-semantic.md';
	const tut_class = 'tutorials/qped-class.md';
	const tut_coverage = 'tutorials/qped-coverage.md';
	const tut_design = 'tutorials/qped-design.md';
	const divRef = useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
	const defaultTab = "home";
	const defaultTutorial = "syntax";

	const clearData = () => {
		setData(initialData);
	};
  
	const copyData = () => {
		navigator.clipboard.writeText(JSON.stringify(data));
	};
	
	useEffect(() => {
		const url = new URLSearchParams(window.location.search);
		let activeTab = url.get('tab');
		let activeTutorial = url.get('tut');
		if(activeTab === null){
			activeTab = defaultTab;
		}
		if(activeTutorial === null){
			activeTutorial = defaultTutorial;
		}
		setTab(activeTab);
		setTut(activeTutorial);
	}, []);

	return (
		<Fragment>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>Welcome to the QPED-project's configurator</h1>
					<p className='App-intro'>Easily configure our checkers for Quarterfall.</p>
				</header>
			</div>
			<Tabs
				defaultActiveKey={defaultTab}
				id="uncontrolled-tab-example"
				className="mb-3"
				activeKey={tab}
				onSelect={(k) => setTab(k)}
			>
				<Tab eventKey={defaultTab} title="Home">
					<div 
						ref={divRef}
						className={classes.markdownContainer}
					>
						<Markdown 
							maxWidth={maxWidth}
							mdFile={qped_mass}/>
					</div>
				</Tab>
				<Tab eventKey="config" title="O3 Configurator">
					<Grid
						container
						justifyContent={'center'}
						spacing={2}
						className={classes.container}
					>
						<Grid item xs={8}>
							<Typography variant={'h4'} className={classes.title}>
								Configuration Editor
							</Typography>
							<div className={classes.demoform}>
								<JsonForms
									renderers={renderers}
									schema={schema}
									uischema={uischema}
									data={data}
									cells={materialCells}
									onChange={({ errors, data }) => setData(data)}
									ajv={handleDefaultsAjv}
								/>
							</div>
						</Grid>
						<Grid item xs>
							<Typography variant={'h4'} className={classes.title}>
								Configuration Data
							</Typography>
							<div className={classes.dataContent}>
								<pre id='boundData'>{stringifiedData}</pre>
							</div>
							<Grid
								container
								justifyContent={'center'}
								className={classes.container}
								spacing={2}
							>
								<Grid item xs>
									<Button
										className={classes.actionButton}
										onClick={copyData}
										color='primary'
										variant='contained'
									>
										Copy to clipboard
									</Button>
								</Grid>
								<Grid item xs>
									<Button
										className={classes.actionButton}
										onClick={clearData}
										color='primary'
										variant='contained'
									>
										Reset data
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Tab>
				<Tab eventKey="doku" title="O3 Dokumentation">
					<div className={classes.markdownContainer}>
						<Markdown 
							maxWidth={maxWidth}
							mdFile={mass_doku}
							transformLinks={false}/>
					</div>
				</Tab>
				<Tab eventKey="tuts" title="O3 Tutorials">
					<Tabs
						defaultActiveKey={defaultTutorial}
						id="uncontrolled-tab-example"
						className="mb-3"
						activeKey={tut}
						onSelect={(k) => setTut(k)}
					>	
						<Tab eventKey={defaultTutorial} title="Syntax Checker">
							<div className={classes.markdownContainer}>
								WIP
							</div>
						</Tab>
						<Tab eventKey="style" title="Style Checker">
							<div className={classes.markdownContainer}>
								WIP
							</div>
						</Tab>
						<Tab eventKey="semantic" title="Solution Approach Checker">
							<div className={classes.markdownContainer}>
								WIP
							</div>
						</Tab>
						<Tab eventKey="coverage" title="Coverage Checker">
							<div className={classes.markdownContainer}>
								<Markdown 
									maxWidth={maxWidth}
									mdFile={tut_coverage}
									transformLinks={false}/>
							</div>
						</Tab>
						<Tab eventKey="class" title="Class Checker">
							<div className={classes.markdownContainer}>
								<Markdown 
									maxWidth={maxWidth}
									mdFile={tut_class}
									transformLinks={false}/>
							</div>
						</Tab>							
						<Tab eventKey="design" title="Design Checker">
							<div className={classes.markdownContainer}>
								<Markdown 
									maxWidth={maxWidth}
									mdFile={tut_design}
									transformLinks={false}/>
							</div>
						</Tab>
					</Tabs>
				</Tab>
			</Tabs>
    </Fragment>
  );
};

export default App;
