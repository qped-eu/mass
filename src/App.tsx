import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.png';
import './App.css';
import schema from './mass.schema.json';
//import uischema from './uischema.json';
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

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>();
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  
  const copyData = () => {
	navigator.clipboard.writeText(JSON.stringify(data));
  };

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the QPED-project's configurator</h1>
          <p className='App-intro'>Easily configure our checkers for Quarterfall.</p>
        </header>
      </div>

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
              schema={schema}
           //   uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
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
				Clear data
			</Button>
			</Grid>
		  </Grid>
        </Grid>
        
      </Grid>
    </Fragment>
  );
};

export default App;
