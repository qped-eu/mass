//@ts-nocheck
//require module JSZIP in  index.html
import Notifier from "./Notifier.js";
import JSDragDropTree from "./JSDragDropTree.js";
import Control_MASS_CheckerCoverage from "./Control_MASS_CheckerCoverage.js";
import MASSHandler from "./MASSHandler.js";
import Control_MASS_Syntax from "./Control_MASS_Syntax.js";
import {Level} from "../Model/DataStructurs/Level.js";
import {calculateTxtFileWeight} from "./Helper.js";
import {getParsedDate} from "./Helper.js";
import {downloadZipFile} from "./Helper.js";
import {isEqualJSON} from "./Helper.js";

interface AssociativeArray {
    [key: string]: string
}

export default class Autoconfig {
    
    private DEFAULT_RESULT: string;
    private subfolder: AssociativeArray[] = [];

    constructor() {
        this.DEFAULT_RESULT = new MASSHandler().getDefault_massFullConfig();
    }


    //-[GENERATED CONFIGURATION]------------------------------------------------------------

    public initConfigResult(): void {
        const resultContainer: HTMLTextAreaElement = document.querySelector(".overview_result textarea.boxContainer") as HTMLTextAreaElement;
        resultContainer.value = this.DEFAULT_RESULT;
    }

    public saveResultToClipboard() {
        const resultContainer: HTMLTextAreaElement = document.querySelector(".overview_result textarea.boxContainer") as HTMLTextAreaElement;
        navigator.clipboard.writeText("qf.mass = " + (resultContainer.value).split("\n").join(""))
            .then(() => {
                if (resultContainer.value == this.DEFAULT_RESULT) {
                    new Notifier().notif("<h2>Configurations Copy</h2> <p>The default configuration was copied to the clipboard without modification.</p>");
                } else {
                    new Notifier().notif("<h2>Configurations Copy</h2> <p>The generated Configuration was copied to clipboard.</p>");
                }
            })
            .catch((error) => {
                console.error(`Could not paste text from clipboard : ${error}`);
            });
    }


    public addResultFromClipboard(){
        const resultContainer: HTMLTextAreaElement = document.querySelector(".overview_result textarea.boxContainer") as HTMLTextAreaElement;
        navigator.clipboard.readText()
            .then((text) => {
                const CONFIG_OBJECT_NAME = "qf.mass";
                let massHandler = new MASSHandler();

                //remove special spaces in text for the extraction of configuration
                let parsedConfig = (text.trim() as string).split("\n").join("");
                    parsedConfig = (text.trim() as string).split("\t").join("");
                    parsedConfig = (text.trim() as string).split("\r").join("");
    
                //remove the object name qf.mass from the string for config's extraction
                if(parsedConfig.startsWith(CONFIG_OBJECT_NAME)){
                    parsedConfig = text.substring(parsedConfig.indexOf("=")+1);
                    parsedConfig = parsedConfig.trim();
                }
                
                //cast extraction's string and default string to json
                let jsonParsedConfig = JSON.parse(parsedConfig);
                let jsonDefault = JSON.parse( massHandler.getDefault_massFullConfig() );

                //check if pasting element have a correct config form
                if( massHandler.isCorrectConfigSkeleton(parsedConfig) ){
                    // extract current coverage config string
                    let currentConfig = resultContainer.value;
                    let jsonCurrentConfig = JSON.parse(currentConfig);

                    //add extracted coverage checker's value in the one in parsedConfig
                    jsonParsedConfig["syntax"] = jsonCurrentConfig["syntax"];
                    jsonParsedConfig["coverageSelected"] = true;
                    jsonParsedConfig["coverage"] = jsonCurrentConfig["coverage"];

                    //Update the config's result on GUI
                    resultContainer.value = massHandler.formatConfigResult( JSON.stringify(jsonParsedConfig), 1);
                    
                    //Update config's informations
                    new Autoconfig().updateResultWeight();
                    if (isEqualJSON(jsonParsedConfig,jsonDefault)) {
                        new Notifier().notif("<h2>Configurations Paste</h2> <p>The pasting configuration is the default configuration</p>");
                    } else {
                        new Notifier().notif("<h2>Configurations Paste</h2> <p>The generated Configuration was partially copied from clipboard. </p>");
                    }
                } else {
                    new Notifier().notif("<h2>Error</h2> <p>The text copied in clipboard is not a valid text for the configurator. </p>");
                }
            })
            .catch((error) => {
                new Notifier().notif(`<h2>Error</h2> <p> Could not paste configuration.</p><p> ${error} </p>`);
            });

    }


    public downloadConfig(){
        try {

            let textareaResult = document.querySelector("textarea.boxContainer") as HTMLTextAreaElement;

            // Create a Blob object from the textarea value
            const blob = new Blob([textareaResult.value], { type: "application/json" });

            // Generate a download link for the file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "massConfig.json";

            // Trigger the download
            link.click();

        } catch (error) {
            console.error(`Download failed : ${error}`);
        }
    }


    //-[AUTOCONFIGURATOR]------------------------------------------------------------
    public resetAutoConfigurator() {
        //reset values of fields of type input file
        const inputFields: any = document.querySelectorAll("input[type=file]");
        inputFields.forEach((input: any) => {
            input.value = '';
        });
        //reset "Level"
        (document.getElementById("syntaxLevel") as HTMLInputElement).value =  Level[Level.BEGINNER];

        //onchange "Show Test Failures"
        (document.getElementById("test_failures") as HTMLInputElement).checked = true;

        //onchange "Show Full Coverage Report"
        (document.getElementById("test_full_report") as HTMLInputElement).checked = false;

        //reset class variables
        this.subfolder = [];
        this.DEFAULT_RESULT = new MASSHandler().getDefault_massFullConfig();
    }


    //-[PROJECT STRUCTUR]------------------------------------------------------------

    //- HTML File Upload using Drag & Drop
    // TODO : Create another input file, after uploading first files and change label

    public updateAllStates() {
        //update file structur
        //build config
    }

    public updateStatesFromSpecInput(specInput: HTMLInputElement, isToUnpack: boolean, isReplacingOld:boolean) {
        var autoconfig = new Autoconfig();
        autoconfig.updateFileStructurFromSpecInput(specInput, isToUnpack);
        if(isToUnpack){
            if (specInput.files[0].name.endsWith('.zip')) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const data = event.target.result;
                    JSZip.loadAsync(data).then( (zipData) => {
                        autoconfig.buildConfig(zipData, isToUnpack, isReplacingOld);
                    });
                };
                reader.readAsArrayBuffer(specInput.files[0]);
            }
        } else {
            autoconfig.buildConfig(specInput.files, isToUnpack, isReplacingOld);
        }
    }

    // Function to unzip archive
    public unpackArchive(file: File) {
        var folderStructure = document.getElementById('filehierarchy_tree');
        var autoconfig = new Autoconfig();
        if (file.name.endsWith('.zip')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const data = event.target.result;
                JSZip.loadAsync(data).then(zipData => {
                    autoconfig.displayFolderStructure(zipData, folderStructure);
                });
            };
            reader.readAsArrayBuffer(file);
        } else {
            new Notifier().notif('<h2>File Upload</h2> <p>Please select a Zip file.</p>');
        }
    }

    
    public displayFolderStructure(folder, parentElement) {
        folder.forEach((relativePath, file) => {
            if(relativePath.includes("/.")) {
                return;
            }
            let trueParent = parentElement;
            //create directories and append files | ignore folders when directory already created
            let folderPrepared = relativePath.endsWith("/") ? relativePath.substring(0, relativePath.length - 1) as string : relativePath;
            let lastIndexSlash = folderPrepared.lastIndexOf("/");
            let folderName = lastIndexSlash > -1 ? folderPrepared.substring(lastIndexSlash + 1) : folderPrepared as string;
            let folderParent = lastIndexSlash > -1 ? folderPrepared.substring(0, lastIndexSlash + 1) : "" as string;
            if (folderParent != "" && this.subfolder[folderParent] !== undefined) {
                trueParent = document.getElementById(this.subfolder[folderParent as string]).getElementsByTagName("ul")[0];
            }
           //fetch folder parent
           //save folder parent in array of folder parents
           //append each new file and folder in foud folder parent
            if (file.dir) { //folder
                const folderElement = document.createElement('li');
                let folderId = "node" + Date.now().toString() + "_" + Math.round(Math.random() * 100);
                folderElement.id = folderId;
                let listItemAnchor = document.createElement("a");
                listItemAnchor.innerText = folderName;
                folderElement.appendChild(listItemAnchor);
                let subFolderElement = document.createElement('ul');
                folderElement.appendChild(subFolderElement);
                this.subfolder[relativePath as string] = folderId;
                trueParent.appendChild(folderElement);
            } else { //file
                const fileElement = document.createElement('li');
                const fileElementAnchor = document.createElement("a");
                fileElement.id = "node" + Date.now().toString();
                fileElement.classList.add("filehierarchy_endNode");
                fileElement.setAttribute("noDrag", "false");
                fileElement.setAttribute("noSiblings", "false");
                fileElement.setAttribute("noDelete", "false");
                fileElement.setAttribute("noRename", "false");
                fileElement.setAttribute("noChildren", "true");
                fileElementAnchor.innerText = relativePath.substring(relativePath.lastIndexOf("/") + 1);
                fileElement.appendChild(fileElementAnchor);
                trueParent.appendChild(fileElement);
            }
        });
        var treeObj = new JSDragDropTree();
        treeObj.setTreeId('filehierarchy_tree');
        treeObj.setMaximumDepth(7);
        treeObj.setMessageMaximumDepthReached('Maximum depth reached');
        treeObj.initTree();
    }

    //TODO Function to update or create file the whole structur
    public updateAllFileStructur() {

    }

    //TODO Function to update or create file from a specific file-input field structur
    public updateFileStructurFromSpecInput(specInput: HTMLInputElement, isToUnpack: boolean) {
        var autoconfig = new Autoconfig();
        //hide box upload if not hidden
        const dropBox = document.querySelector("div.overview_form div.boxUpload");
        const fileStructureBox = document.querySelector("div.overview_form div.boxContainer");
        const fileTreeTop = document.getElementById("filehierarchy_tree") as HTMLUListElement;
        dropBox.classList.add("none");
        fileStructureBox.classList.remove("none");
        //append files on in root of file structure
        if (isToUnpack) {
            //unzip and add files and folders
            autoconfig.unpackArchive(specInput.files[0]);
        } else {
            //Add files on file-structure without unpack
            for (let i = 0; i < specInput.files.length; i++) {
                const listItem = document.createElement("li");
                const listItemAnchor = document.createElement("a");
                listItem.id = "node" + Date.now().toString();
                listItem.classList.add("filehierarchy_endNode");
                listItem.setAttribute("noDrag", "false");
                listItem.setAttribute("noSiblings", "false");
                listItem.setAttribute("noDelete", "false");
                listItem.setAttribute("noRename", "false");
                listItem.setAttribute("noChildren", "true");
                listItemAnchor.innerText = specInput.files[i].name;
                listItem.appendChild(listItemAnchor);
                fileTreeTop.appendChild(listItem);
            }
        }
        var treeObj = new JSDragDropTree();
        treeObj.setTreeId('filehierarchy_tree');
        treeObj.setMaximumDepth(7);
        treeObj.setMessageMaximumDepthReached('Maximum depth reached');
        treeObj.initTree();
    }

    // Function to generate the configuration
    public async buildConfig(files: FileList, isToUnpack: boolean, isReplacingOld:boolean=true) {
        var autoconfig = new Autoconfig();
        //1- Build Feedbacks Block (always from all input fields)
        //2- Also show syntactic errors in keywords parameters
        //3- Build file structure > correct files parents
        new Control_MASS_CheckerCoverage().buildConfigFromJavaFiles(files, isToUnpack, isReplacingOld).then(autoconfig.updateResultWeight);
    }

    // TODO function which build config from all uploaded files
    public buildConfigWholeConfig() {

    }


    //Function of the first step to build the configuration after an upload
    public async startFirstStepUpload(currentInputFile: HTMLInputElement, isReplacingOld:boolean) {
        var autoconfig = new Autoconfig();
        const files: FileList = currentInputFile.files;

        if(isReplacingOld){
            //reset config result
            autoconfig.resetResult();
        }
        if (files.length == 1 && files[0].name.endsWith('.zip')) {
            var notifier = new Notifier();
            let prepNotif: string = '<h3> Archive Upload </h3> ' +
                '<p> Does the archive file need to be unzipped before adding to the project? </p> <br/> ' +
                '<p> <button id="btnUnzipUploading">yes</button> <button id="btnKeepUploading">no</button> </p> ';
            notifier.notif(prepNotif);

            const btnUnzip = document.getElementById("btnUnzipUploading");
            btnUnzip.addEventListener("click", () => {
                autoconfig.updateStatesFromSpecInput(currentInputFile, true, isReplacingOld);
                notifier.removeNotif(true);
            });

            const btnOnlyUpload = document.getElementById("btnKeepUploading");
            btnOnlyUpload.addEventListener("click", () => {
                autoconfig.updateStatesFromSpecInput(currentInputFile, false, isReplacingOld);
                notifier.removeNotif(true);
            });
            return;
        }
        autoconfig.updateStatesFromSpecInput(currentInputFile, false, isReplacingOld);
    }


    //Function to handle autoconfig from external url of a zip-file
    public configFromUrl(){
        const inputSearchUrl = document.getElementById("searchUrlZip") as HTMLInputElement;
        if(inputSearchUrl.value == ""){
            inputSearchUrl.focus();
            return;
        }
        const inputFieldId = "projectFile";
        const inputField = document.getElementById(inputFieldId) as HTMLInputElement;
        downloadZipFile(inputSearchUrl.value, inputFieldId)
            .then(() => {
                new Autoconfig().startFirstStepUpload( inputField, true);
            })
            .catch(error => {
                new Notifier().notif(`<h3> ERROR </h3> <p> ${error} </p> <br/>`);
            });
    }

    // Function to handle file drop event
    public handleFileDrop(event: DragEvent) {
        event.preventDefault();
        var autoconfig = new Autoconfig();
        const dropArea = document.querySelector(".overview_form .boxUpload");
        const currentInputFile = document.getElementById("projectFile") as HTMLInputElement;

        // Highlight the drop area
        dropArea.classList.add("highlight");

        // Get the files from the event
        const files: FileList = event.dataTransfer.files;
        currentInputFile.files = files;
        autoconfig.startFirstStepUpload(currentInputFile, true).then( autoconfig.updateResultWeight );
    }

    // Function to handle file dragover event
    public handleFileDragOver(event: DragEvent) {
        event.preventDefault();
    }

    // Function to handle file dragleave event
    public handleFileDragLeave(event: DragEvent) {
        const dropArea = document.querySelector(".overview_form .boxUpload");
        // Remove the highlight from the drop area
        dropArea.classList.remove("highlight");
    }

    public resetProjectStructur() {
        //remove all elements from the file structure
        document.getElementById("filehierarchy_tree").innerHTML = "";
        //add class .none to container of file structure | remove class .none drop box
        let dropBoxP = document.querySelector("div.overview_form div.boxUpload");
        let fileStructureBoxP = document.querySelector("div.overview_form div.boxContainer");
        fileStructureBoxP.classList.add("none");
        dropBoxP.classList.remove("none");
    }


    //-[APP]------------------------------------------------------------
    public updateResultWeight(){
        const textareaResult = document.querySelector("textarea.boxContainer") as HTMLTextAreaElement;
        const resultWeightHtml = document.getElementById("resultWeight") as HTMLUListElement;
        if(textareaResult.value == new MASSHandler().getDefault_massFullConfig()){
            resultWeightHtml.innerHTML = "<li> <em> Default Configuration </em> </li>";
        } else {
            resultWeightHtml.innerHTML = 
                "<li><em> Updated at: " + getParsedDate() + " </em></li>"+ 
                "<li><em> File weight: " + calculateTxtFileWeight(textareaResult.value, 2) + " Ko </em></li>";
        }
    }


    //Function to reset config result
    public resetResult(isConservingConfig:boolean=true) {
        var autoconfig = new Autoconfig();

        //free file structure
        autoconfig.resetProjectStructur();
        
        //reset class variables
        this.subfolder = [];
        this.DEFAULT_RESULT = new MASSHandler().getDefault_massFullConfig();
    
        //free config result
        autoconfig.initConfigResult();

        if(isConservingConfig){
            //update config result corresponding to manual parameters
            //update syntax
            let selectLevel = document.getElementById("syntaxLevel") as HTMLInputElement;
            let syntaxLevel: Level = selectLevel.value == "ADVANCED" ? Level.ADVANCED : Level.BEGINNER;
            new Control_MASS_Syntax(syntaxLevel).updateResult();

            let mass_CheckerCoverage = new Control_MASS_CheckerCoverage();

            //update "Show Test Failures"
            let selectTestFailures = document.getElementById("test_failures") as HTMLInputElement;
            mass_CheckerCoverage.updateResult_testFailures(selectTestFailures.checked);
            
            //update "Show Full Coverage Report"
            let selectFullCovReport = document.getElementById("test_full_report") as HTMLInputElement;
            mass_CheckerCoverage.updateResult_testFullReport(selectFullCovReport.checked);
        }else{
            autoconfig.resetAutoConfigurator();
        }
        autoconfig.updateResultWeight();
    }


    public resetApp() {
        var autoconfig = new Autoconfig();
        autoconfig.resetProjectStructur();
        autoconfig.resetAutoConfigurator();
        autoconfig.initConfigResult();
        autoconfig.updateResultWeight();
        new Notifier().notif("<h2>Reset Configurator</h2> <p>The Configurator have been reseted </p>");
    }


    public refreshAppp(){
        var autoconfig = new Autoconfig();
        autoconfig.updateAllFileStructur();
        autoconfig.buildConfigWholeConfig();
        new Notifier().notif("<h2>Update Results</h2> <p>The results are now up to date </p>");
    }

    //-[DOM LOADED]------------------------------------------------------------
    public initApp() {

        window.addEventListener("DOMContentLoaded", (event) => {

            this.initConfigResult();

            // Add event listeners to the drop area
            const dropArea = document.querySelector(".overview_form .boxUpload");
            dropArea.addEventListener("drop", this.handleFileDrop);
            dropArea.addEventListener("dragover", this.handleFileDragOver);
            dropArea.addEventListener("dragleave", this.handleFileDragLeave);

            //Onclick button to add single file
            document.querySelector(".overview_form .uil-file-upload").addEventListener('click', ()=>{
                document.getElementById("projectFile").click();
            });

            //Onclick button to add single folder
            document.querySelector(".overview_form .uil-folder-plus").addEventListener('click', ()=>{
                document.getElementById("othersProjectFile1").click();
            });

            //onclick button reset : resetApp()
            document.querySelector("div.overview_result div.buttons button.reset").addEventListener('click', this.resetApp);
            
            //onclick button refresh results (usefull if an error occured on browser while generating previous config)
            document.querySelector(".overview_result .tab_head_options .uil-refresh").addEventListener('click', this.refreshAppp);

            //Copy the result when the button is clicked: Save the result to the clipboard
            document.querySelector(".overview_result .tab_head_options .uil-copy").addEventListener('click', this.saveResultToClipboard);

            //Copy the result when the button is clicked: Save the result to the clipboard
            document.querySelector(".overview_result .tab_head_options .uil-file-edit").addEventListener('click', this.addResultFromClipboard);

            //Generate json-file of the result then download it
            document.querySelector("#downloadConfig").addEventListener('click', this.downloadConfig);

            //onchange principal input file
            const inputFile0 = document.getElementById("projectFile") as HTMLInputElement;
            inputFile0.addEventListener("change", () => {
                this.startFirstStepUpload(inputFile0, true);
            });

            //onchange folder
            const inputFileFolder = document.getElementById("othersProjectFile1") as HTMLInputElement;
            inputFileFolder.addEventListener("change", () => {
                this.startFirstStepUpload(inputFileFolder, true);
            });

            //onchange "Level"
            const selectLevel = document.getElementById("syntaxLevel") as HTMLInputElement;
            selectLevel.addEventListener("change", () => {
                let syntaxLevel: Level = selectLevel.value == "ADVANCED" ? Level.ADVANCED : Level.BEGINNER;
                 new Control_MASS_Syntax(syntaxLevel).updateResult();
                 this.updateResultWeight();
            });

            //onchange "Show Test Failures"
            const selectTestFailures = document.getElementById("test_failures") as HTMLInputElement;
            selectTestFailures.addEventListener("change", () => {
                new Control_MASS_CheckerCoverage().updateResult_testFailures(selectTestFailures.checked);
                this.updateResultWeight();
            });

            //onchange "Show Full Coverage Report"
            const selectFullCovReport = document.getElementById("test_full_report") as HTMLInputElement;
            selectFullCovReport.addEventListener("change", () => {
                new Control_MASS_CheckerCoverage().updateResult_testFullReport(selectFullCovReport.checked);
                this.updateResultWeight();
            });

            //Onclick button to search zip using external url
            document.querySelector(".overview_form .uil-search-plus").addEventListener('click', this.configFromUrl);
            
            // Execute a function when the user presses a key on the keyboard
            const inputSearchUrl = document.getElementById("searchUrlZip");
            inputSearchUrl.addEventListener("keypress", function(event) {
                // If the user presses the "Enter" key on the keyboard
                if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                new Autoconfig().configFromUrl();
                }
            });

        });
    }
}