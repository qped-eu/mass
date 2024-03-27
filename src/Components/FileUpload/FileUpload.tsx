
import JSZip from 'jszip';
import './FileHierarchy.css';
import './JSDragDropTree.css';
import './root.css';
import React, { useState, useEffect } from 'react';
import Control_MASS_CheckerCoverage from '../../Controller/Control_MASS_CheckerCoverage';
interface FileUploadProps {
  actualresult: any;
  setActualResult: any; // Define the type of the prop you want to pass
}
const FileUpload: React.FC<FileUploadProps> = (props) => {

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isReplacingOld, setReplacingOld] = useState<boolean>(false);

  useEffect(() => {
    if (currentFile) {
      JSZip.loadAsync(currentFile)
        .then((zip) => {
          buildConfigFromJavaFiles(zip, isReplacingOld);
        });
    }
  }, [currentFile]);


  const buildConfigFromJavaFiles = async (files: any, isReplacingOld: boolean) => {
    var cc: Control_MASS_CheckerCoverage = new Control_MASS_CheckerCoverage();
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
      for (let i = 0; i < fileIndex; i++) {
        if (relativePaths[i].includes("/.") || currentFiles[i].dir) {
          i = i + 1;
        }

        if (i < fileIndex && currentFiles[i].name.endsWith(".java")) {
          let fileContent = await files.file(currentFiles[i].name).async("string");
          cc.buildConfigFromJavaFile(currentFiles[i], fileContent, isStillReplacingOld, props.setActualResult);
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
    <div className="box" id='boundingBox'>
      <div className="title table">
        <div className="table_cell tab_head_title">
          <i className="uil uil-game-structure"></i>
          <span className="text"></span>
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

          <p> You can select a .zip file by</p>
          <p> clicking here</p>
          <p>
            Test Coverage configuration will be generated automatically
          </p>
          <ul id="file-list"></ul>
        </div>
      </label>
      <div className="boxInfos">
        <p className="allowed uil uil-check-circle none">Upload succeed</p>
        <p className="error uil uil-minus-circle none">Upload rejected</p>
      </div>

      <div>
        <h2>{currentFile?.name}</h2>
      </div>
    </div>
  );
};

export default FileUpload;
