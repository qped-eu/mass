import * as React from 'react';
import {useState, useMemo} from 'react';
import { JsonForms } from '@jsonforms/react';
import { createAjv } from '@jsonforms/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import schema from './mass.schema.json';
import uischema from './mass.uischema.json';
import './Configurator.css';
import {
	materialCells,
	materialRenderers,
  } from '@jsonforms/material-renderers';
import FileUpload from '../../Components/FileUpload';

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


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


function Configurator() {
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
     "coverage":{
      "feedback": [
      ],
      "showFullCoverageReport": false,
      "showTestFailures": true
    } ,
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
   

    const [updatedMessageOpen, setUpdatedMessageOpen] = React.useState(false);
    const [coverageResult,setCoverageResult]= useState(JSON.stringify(initialData));
    const [updateFailedMessageOpen, setUpdateFailedMessageOpen] = React.useState(false);

    const [data, setData] = useState(initialData);
   
    const [combinedResult,setCombinedResult]=useState(JSON.stringify(initialData, null, 2));

    React.useEffect(()=>
    {
      let res=data;
      let cov=JSON.parse(coverageResult);

      res.coverage.feedback=cov.coverage.feedback;
      res.coverageSelected=cov.coverageSelected;
      console.log(res.coverage.feedback);
      
      setCombinedResult(JSON.stringify(res, null, 2));
    },[data,coverageResult])
    const [storedData, setStoredData] = useState<string | undefined>(undefined);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [usedInput, setUsedInput] = useState<string | undefined>(undefined);

    const clearData = () => {
        setStoredData(undefined);
        var lastUserVersion = JSON.stringify(data, null, 2);
        setUpdateFailedMessageOpen(false);
        setData(initialData);
        setCombinedResult(JSON.stringify(initialData,null,2));
        setTimeout(() => {
            setStoredData(lastUserVersion);
         
            setUpdatedMessageOpen(true);
        }, 50);
    };

    const copyData = () => {
        navigator.clipboard.writeText("qf.mass = " + combinedResult);
    };

    const pasteData = () => {
        setStoredData(undefined)
        var lastUserVersion = JSON.stringify(combinedResult, null, 2)
        setUpdateFailedMessageOpen(false);
        navigator.clipboard
            .readText()
            .then((clipText) => {
                var jsonStartIndex = clipText.indexOf("{")
                if (jsonStartIndex < 0) {
                    jsonStartIndex = 0
                }
                var jsonEndIndex = clipText.lastIndexOf("}")
                if (jsonEndIndex < 0) {
                    jsonEndIndex = clipText.length
                } else {
                    jsonEndIndex++
                }
                var input = clipText.substring(jsonStartIndex, jsonEndIndex)
                
                try {
                    setCombinedResult(input)
                    setTimeout(() => {
                        setStoredData(lastUserVersion)
                        setUpdatedMessageOpen(true)
                    }, 50);
                } catch (error) {
                    if (error instanceof Error) {
                        setErrorMessage(error.message)
                        setUsedInput(input);
                        setUpdateFailedMessageOpen(true)
                    }
                }
            });
    };

    const performUndo = () => {
        if (storedData) {
            setCombinedResult(storedData);
            setStoredData(undefined)
        }
        setUpdatedMessageOpen(false);
    };



    const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);

    const handleDialogClose = () => {
        setErrorDialogOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (errorDialogOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [errorDialogOpen]);
    const showErrorDetails = () => {
        if (errorMessage !== undefined) {
            setErrorDialogOpen(true);
        }
    };

  return (
    <Grid
		container
		justifyContent={'left'}
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
					onChange={({ errors, data }) => {setData(data); if(storedData !== undefined) setUpdatedMessageOpen(false)}}
					config={config}
					ajv={handleDefaultsAjv}
				/>
            <FileUpload actualresult={coverageResult} setActualResult={setCoverageResult}></FileUpload>
			</div>
		</Grid>
        <Grid item xs>
            <Box sx={{ width: '100%' }}>
               <Collapse in={updatedMessageOpen}>
                  <Alert
                     action={
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" size="small" onClick={performUndo}>
                               UNDO
                            </Button>
                            <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                  setUpdatedMessageOpen(false);
                               }}
                            >
                               <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Stack>
                     }
                     sx={{ mb: 2 }}
                  >
                     Configuration data updated successfully.
                  </Alert>
               </Collapse>
            </Box>
            <Box sx={{ width: '100%' }}>
               <Collapse in={updateFailedMessageOpen}>
                  <Alert
                     severity="error"
                     action={
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" size="small" onClick={showErrorDetails}>
                               Details
                            </Button>
                            <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                  setUpdateFailedMessageOpen(false);
                               }}
                            >
                               <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Stack>
                     }
                     sx={{ mb: 2 }}
                  >
                     Failed to update data.
                  </Alert>
               </Collapse>
            </Box>
            <div>
               <Dialog
                  open={errorDialogOpen}
                  onClose={handleDialogClose}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
               >
                  <DialogTitle id="scroll-dialog-title">Error Importing Data from Clipboard</DialogTitle>
                  <DialogContent dividers={true}>
                     <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                     >
                     <Typography gutterBottom>
                        The data you pasted was not a well-formed JSON object. The  error message was:
                     </Typography>
                     <Typography gutterBottom>
                        <pre className='preformatted'>
                            {errorMessage}
                        </pre>
                     </Typography>                     
                     <Typography gutterBottom>
                        From the data on the clipboard, only the text between the first opening brace ('{"{"}')
                        and the last closing brace ('{"}"}') is used. Thus, the text that was attempted to be
                        parsed as a JSON object from your clipboard was:
                     </Typography>
                     <Typography gutterBottom>
                        <pre className='preformatted'>
                        {usedInput}
                        </pre>
                     </Typography>
                     </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleDialogClose}>OK</Button>
                  </DialogActions>
               </Dialog>
            </div>
            <ElevationScroll>
               <AppBar position="static" color='secondary'>
                  <Toolbar>
                     <Typography variant={'h6'} className='title' component="div" sx={{ flexGrow: 1 }}>
                        Configuration Data
                     </Typography>
                     <Tooltip title="Copy data to clipboard.">
                        <Button
                            className='actionButton'
                            onClick={copyData}
                            color='inherit'
                            startIcon={<ContentCopyIcon />}
                        >
                        </Button>
                     </Tooltip>
                     <Tooltip title="Paste data from clipboard.">
                        <Button
                            className='actionButton'
                            onClick={pasteData}
                            color='inherit'
                            startIcon={<ContentPasteIcon />}
                        >
                        </Button>
                     </Tooltip>
                     <Tooltip title="Reset data to default.">
                        <Button
                            className='actionButton'
                            onClick={clearData}
                            color='inherit'
                            startIcon={<RestartAltIcon />}
                        >
                        </Button>
                     </Tooltip>
                  </Toolbar>
               </AppBar>
            </ElevationScroll>
            <Box component="main" className='dataContent'>
               <Typography>
                  <pre id='boundData' style={{ width: '0' }}>{combinedResult}</pre>
               </Typography>
            </Box>

        </Grid>
	</Grid>

  )
}

export default Configurator;
