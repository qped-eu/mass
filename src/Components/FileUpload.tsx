import { readFile } from 'fs';
import JSZip from 'jszip';
import React, { useState, useEffect } from 'react';
import Control_MASS_CheckerCoverage from '../Controller/Control_MASS_CheckerCoverage';
const FileUpload: React.FC = () => {

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isReplacingOld, setReplacingOld] = useState<boolean>(false);
  
  useEffect(() => {
    if (currentFile) {
      JSZip.loadAsync(currentFile) 
      .then((zip) => {
          console.log(zip)
          buildConfigFromJavaFiles(zip, isReplacingOld);
          });      
    }
  }, [currentFile]);
  const [result,setResult]= useState(null);


 const buildConfigFromJavaFiles = async (files: any, isReplacingOld: boolean) => {
    var cc : Control_MASS_CheckerCoverage = new Control_MASS_CheckerCoverage();
    var isStillReplacingOld = isReplacingOld;
    var relativePaths: String[] = [];
    var currentFiles: any = [];
    var fileIndex = 0;
    try {
      // Iterate through each file
      files.forEach((relativePath: string, currentFile: File) => {
        relativePaths.push(relativePath);
        currentFiles.push(currentFile);
        fileIndex++;
      });
      for(let i=0; i<fileIndex; i++){
        if(relativePaths[i].includes("/.") || currentFiles[i].dir) {
          i=i+1;
        }

      console.log("resultState");
        if(i<fileIndex && currentFiles[i].name.endsWith(".java")) {
          let fileContent = await files.file(currentFiles[i].name).async("string");
          cc.buildConfigFromJavaFile(currentFiles[i], fileContent, isStillReplacingOld,setResult);
          isStillReplacingOld = true;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };


  return (
    <div className="box">
      <div className="title table">
        <div className="table_cell tab_head_title">
          <i className="uil uil-game-structure"></i>
          <span className="text">PROJECT STRUCTURE</span>
        </div>
        <div className="table_cell tab_head_options">
          <a title="Add a folder in project">
            <i className="uil uil-folder-plus"></i>
          </a>
          <a title="Upload a file in project root">
            <i className="uil uil-file-upload"></i>
          </a>
          <div className="none">
            <input
              type="file"
              name="othersProjectFile1"
              id="othersProjectFile1"
              className="othersProjectFile none"
              accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
              onChange={onSelectFile}
            />
          </div>
        </div>
      </div>
      <div className="inputSearch">
        <input type="url" id="searchUrlZip" placeholder="Enter URL to download project files" />
        <i className="uil uil-search-plus"></i>
      </div>
      <label htmlFor="projectFile">
        <div className="boxUpload">
          <input 
            type="file" 
            name="projectFile" 
            id="projectFile" 
            className="none"               
            onChange={onSelectFile}
            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
          />
          <i className="uil uil-upload"></i>
          <p>
            {' '}
            <b>Drop a file or a zip-archive here</b>{' '}
          </p>
          <p> Alternatively, you can select a file by</p>
          <p> clicking here</p>
          <ul id="file-list"></ul>
        </div>
      </label>
      <div className="boxContainer none">
        
        <ul id="filehierarchy_tree" className="filehierarchy_tree">{result}</ul>
      </div>
      <div className="boxInfos">
        <p className="allowed uil uil-check-circle none">Upload succeed</p>
        <p className="error uil uil-minus-circle none">Upload rejected</p>
      </div>
      <div>
        <h1>Result</h1>
        <h2>{result}</h2>
      </div>
    </div>
  );
};

export default FileUpload;
