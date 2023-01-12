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
  "syntax": {
    "level": "BEGINNER"
  },
  "styleSelected": false,
  "semanticSelected": false,
  "coverageSelected": false,
  "classSelected": false,
  "metricsSelected": false,
  "style": {
    "basisLevel": "BEGINNER",
    "complexityLevel": "BEGINNER",
    "namesLevel": "BEGINNER",
    "classLength": -1,
    "methodLength": -1,
    "cyclomaticComplexity": -1,
    "fieldsCount": -1,
    "variableNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodParameterNamePattern": "[a-z][a-zA-Z0-9]*",
    "classNamePattern": "[A-Z][a-zA-Z0-9_]*"
  },
  "semantic": {},
  "coverage": {
    "feedback": [
      {
        "lineRanges": "",
        "message": "",
        "showFor": "PARTIALLY_MISSED",
        "fileName": ""
      }
    ],
    "showFullCoverageReport": false,
    "showTestFailures": true
  },
  "classes": {},
  "metrics": {
    "amcThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "Increase your average method size, e.g. by joining multiple methods with mostly the same functionalities from over-engineering.",
      "suggestionMax": "Decrease your average method size, e.g. by delegating functionalities to other newly created methods."
    },
    "caThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class is used by too few other classes. Is this class even necessary? Can you implement this class's functionalities into already existing classes?",
      "suggestionMax": "This class is used by too many other classes. Can you outsource some functionalities into already existing or new classes?"
    },
    "camThreshold": {
      "min": 0,
      "max": 1,
      "noMax": false,
      "suggestionMin": "This class and their methods are or are close to being un-cohesive. Assimilate methods in your class in order to increase readability and decrease complexity at once.",
      "suggestionMax": "This class and their methods are too cohesive. Your implemented methods are too close to being the same methods."
    },
    "cbmThreshold": {
      "min": 0,
      "max": 5,
      "noMax": false,
      "suggestionMin": "The methods in this class are not or are hardly coupled, which means they have (close to) no interdependencies. Is this reasonable for your class?",
      "suggestionMax": "The methods in this class are coupled to high, which means too many interdependencies, coordination and information flow between them. Try to minimize these dependencies between your methods."
    },
    "cboThreshold": {
      "min": 0,
      "max": 5,
      "noMax": false,
      "suggestionMin": "The sum of all class couplings in this class is (close to) zero, which means they have (close to) no interdependencies to other classes. Is this reasonable for your class? Also, refer to afferent/efferent coupling metric.",
      "suggestionMax": "The sum of all class couplings in this class is too high, which means too many interdependencies, coordination and information flow between them. Try to minimize these dependencies from this class to other classes. Also, refer to afferent/efferent coupling metric."
    },
    "ccThreshold": {
      "min": 1,
      "max": 100,
      "noMax": true,
      "suggestionMin": "This method in the given class has very few different paths to take. It would be allowed to increase its complexity.",
      "suggestionMax": "This method in the given class is too complex, too many paths are taken (ite-statements). Try to decrease the complexity by delegating functionalities into other methods or classes."
    },
    "ceThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class is using too few other classes. Can some functionalities be implemented into other classes and be used?",
      "suggestionMax": "This class is using too many other classes. Can some functionalities be joined by other classes or even be implemented in this specific class?"
    },
    "damThreshold": {
      "min": 0,
      "max": 1,
      "noMax": false,
      "suggestionMin": "This class contains very few private (protected) attributes compared to to the total number of attributes. Try to encapsulate your class (make fields private, only access them by methods contained in this specific class if possible).",
      "suggestionMax": "This class contains many private (protected) attributes compared to to the total number of attributes. Encapsulation is important, but sometimes over-engineering. Is this reasonable?"
    },
    "ditThreshold": {
      "min": 1,
      "max": 6,
      "noMax": false,
      "suggestionMin": "This class has very few superclasses or only one superclass (Object.java). Is inheritance a possible option?",
      "suggestionMax": "This class has many superclasses. Is this much inheritance possible over-engineering? Do certain subclasses have too similar or too few functionalities?"
    },
    "icThreshold": {
      "min": 0,
      "max": 6,
      "noMax": false,
      "suggestionMin": "This class is coupled to few or no parent classes. Overriding parent methods could be a suitable option here.",
      "suggestionMax": "This class is coupled to many parent classes. Overriding parent methods makes sense, but is not always necessary."
    },
    "lcomThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "The modularisation of this class is too low. Too many methods operate on different attributes.",
      "suggestionMax": "The modularisation of this class is quite high. You could think about the necessity if your class is very small."
    },
    "lcom3Threshold": {
      "min": 0,
      "max": 2,
      "noMax": false,
      "suggestionMin": "The modularisation of this class is too low. Too many methods operate on different attributes.",
      "suggestionMax": "The modularisation of this class is quite high. You could think about the necessity if your class is very small."
    },
    "locThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class contains very few lines of code. Is it even necessary to put these functionalities into a separate class?",
      "suggestionMax": "This class contains too many lines of code, it could be considered as a \"God Class\". Try to keep only the main functionality in this class, others should be implemented into other (new) classes."
    },
    "mfaThreshold": {
      "min": 0,
      "max": 1,
      "noMax": false,
      "suggestionMin": "The functional abstraction of this class ist quite low. If possible, try to let his class inherit some methods.",
      "suggestionMax": "The functional abstraction of this class is very high. Consider refactoring this class into an abstract class if this is not yet the case."
    },
    "moaThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class contains too few class fields. In order to increase class aggregation, also increase the number of fields or merge this class into another.",
      "suggestionMax": "This class contains too many class fields. Try to inline fields or extract functionalities into other classes."
    },
    "nocThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class has very few or no immediate descendants. Would extending this class be reasonable?",
      "suggestionMax": "This class has too much immediate descendants. Consider using multiple inheritance, i.e. creating subclasses of a subclass."
    },
    "npmThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class uses few or no public methods. Is this intended?",
      "suggestionMax": "This class uses mostly public methods. Try to decrease their visibility to force the information hiding principle."
    },
    "rfcThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class has too few or zero (in-)directly executable methods. Is this class even necessary then?",
      "suggestionMax": "This class is able to (in-)directly execute too many methods. This is a typical smell for a god class. Does your class have one main functionality? Can some functionalities be extracted into other existing or new classes?"
    },
    "wmcThreshold": {
      "min": 0,
      "max": 100,
      "noMax": false,
      "suggestionMin": "This class contains too few or zero methods. Is this class even necessary then?",
      "suggestionMax": "This class contains too many methods. This is a typical smell for a god class. Does your class have one main functionality? Can some functionalities be extracted into other existing or new classes?"
    },
    "includeCallsToJdk": false,
    "includeOnlyPublicClasses": false
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
