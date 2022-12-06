import {useState, useMemo} from 'react';
import { JsonForms } from '@jsonforms/react';
import { createAjv } from '@jsonforms/core';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import schema from './mass.schema.json';
import uischema from './mass.uischema.json';
import './Configurator.css';
import {
	materialCells,
	materialRenderers,
  } from '@jsonforms/material-renderers';

const renderers = [
	...materialRenderers
	//register custom renderers
  ];

  const config = {
	restrict: false,
 	trim: false,
 	showUnfocusedDescription: true,
 	hideRequiredAsterisk: false
  }

const handleDefaultsAjv = createAjv({useDefaults: true});
const initialData = {
	"styleSelected": false,
	"semanticSelected": false,
	"coverageSelected": false,
	"classSelected": false,
	"metricsSelected": false,
	"syntax": {
	  "level": "BEGINNER"
	}
  };

function Configurator() {
	const [data, setData] = useState<any>(initialData);
	const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

	const clearData = () => {
		setData(initialData);
	};
  
	const copyData = () => {
		navigator.clipboard.writeText("qf.mass = " + JSON.stringify(data, null, 2));
	};

	window.setInterval(() => {console.log(document.getElementById('LeContainer')?.offsetTop);}, 1000)
	
  return (
    <Grid
		container
		justifyContent={'center'}
		spacing={2}
		className='container'
		id='LeContainer'
	>
		<Grid item xs={8}>
			<Typography variant={'h4'} className='title'>
				Configuration Editor
			</Typography>
			<div className='demoform'>
				<JsonForms
					renderers={renderers}
					schema={schema}
					uischema={uischema}
					data={data}
					cells={materialCells}
					onChange={({ errors, data }) => setData(data)}
					config={config}
					ajv={handleDefaultsAjv}
				/>
			</div>
		</Grid>
		<Grid item xs>
			<Typography variant={'h4'} className='title'>
				Configuration Data
			</Typography>
			<div className='dataContent'>
				<pre id='boundData'>{stringifiedData}</pre>
			</div>
			<Grid
				container
				justifyContent={'center'}
				className='container'
				spacing={2}
			>
				<Grid item xs>
					<Button
						className='actionButton'
						onClick={copyData}
						color='primary'
						variant='contained'
					>
						Copy to clipboard
					</Button>
				</Grid>
				<Grid item xs>
					<Button
						className='actionButton'
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
  )
}

export default Configurator;
