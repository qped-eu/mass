//@ts-nocheck
import MASSHandler from "./MASSHandler";
import CheckerCoverageFeedback from "../Model/CheckerCoverageFeedback";
import MASS_CheckerCoverage from "../Model/MASS_CheckerCoverage";
import LineRanges from "../Model/DataStructurs/LineRanges.ts";
import { readFile } from "./Helper.js";

interface AssociativeArrayFeedbacks {
  [key: string]: CheckerCoverageFeedback
}

export default class Control_MASS_CheckerCoverage extends MASS_CheckerCoverage{

  constructor(showTestFailures?: boolean, showFullCoverageReport?: boolean, feedback?: AssociativeArrayFeedbacks[]) {
    let showTestFailuresParent = showTestFailures !== undefined ? showTestFailures : true;
    let showFullCoverageReportParent = showFullCoverageReport !== undefined ? showFullCoverageReport : false;
    let feedbackParent = feedback !== undefined ? feedback : [];
    super(showTestFailuresParent, showFullCoverageReportParent, feedbackParent);
  }


  public buildConfigFromJavaFile(file: any, fileContent: any, isReplacingOld: boolean,resultState:any) {
    const keyWordStartCov: string = '@mass_cvStart(';
    const keyWordEndCov: string = '@mass_cvEnd(';

    console.log("resultState1");
      // Split the file content into lines
      const lines = fileContent.split('\n');
      // Iterate through each line
      for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber];
        // Check if the line is a comment ALSO handle comment at the end of the line
        if (line.includes('//')) {
          // Check if the line contains the search strings
          if (line.includes(keyWordStartCov)) {
            let feedbackPart: any[] = this.extractFeedbackPart(lines, line, "//", lineNumber, lineNumber);
            
            // build object for config (check strings formats)
            if(this.feedback[feedbackPart[0] as string] !== undefined){
              this.feedback[feedbackPart[0] as string].lineRanges.push( new LineRanges(feedbackPart[4]) );
            }else{
              this.feedback[feedbackPart[0] as string] = new CheckerCoverageFeedback(
                feedbackPart[0],
                file.name,
                feedbackPart[2],
                [new LineRanges(feedbackPart[4])],
                feedbackPart[1],
                feedbackPart[3]
              );
            }
          }

      console.log("resultState2");
          if (line.includes(keyWordEndCov)) {
            //fetch id
            let startParams = line.substring(line.indexOf(keyWordEndCov));
            startParams = startParams.substring(startParams.indexOf('"') + 1);
            let msgId = startParams.substring(0, startParams.lastIndexOf(')') - 1);
            while (msgId.lastIndexOf(')') >= 0) {
              if (msgId.lastIndexOf(')') != msgId.lastIndexOf('\)') + 1) {
                msgId = msgId.substring(0, msgId.lastIndexOf(')') - 1);
                msgId = msgId.substring(0, msgId.lastIndexOf('"') - 1);
              } else
                break;
            }
            // Find the previous non-empty Java instruction line
            let previousInstructionLine = line.trim().startsWith('//') ? lineNumber : lineNumber + 1;
            while (previousInstructionLine != lineNumber && previousInstructionLine > 0) {
              if (lines[previousInstructionLine].trim() != '')
                break;
              previousInstructionLine--;
            }
            //update CheckerCoverageFeedbacks[msgId]
            if (this.feedback.hasOwnProperty(msgId)) {
              for(let i=(this.feedback[msgId].lineRanges as any).length-1; i>=0; i--){
                if( (this.feedback[msgId].lineRanges)[i].getEnd() == null ){
                  (this.feedback[msgId].lineRanges as any)[i].setEnd(previousInstructionLine);
                  break;
                }
              }
            }
          }
        } else if (line.includes('/*')) {
          //find start and end of comment
          let endCommentLineNumber: number = lineNumber;
          let comment: string = "";
          for (let lookingLineNber = lineNumber; lines.length; lookingLineNber++) {
            comment += lines[lookingLineNber];
            if (lines[lookingLineNber].includes('*/')) {
              endCommentLineNumber = lookingLineNber;
              break;
            }
          }
          comment = comment.substring(comment.indexOf('/*'), comment.lastIndexOf('*/') + 2);
          // Check if the line contains the search strings
          if (comment.includes(keyWordStartCov)) {
            // Add the found strings to the array
            if (comment.includes(keyWordStartCov)) {
              let feedbackPart: any[] = this.extractFeedbackPart(lines, comment, "/*", lineNumber, endCommentLineNumber);
               // build object for config (check strings formats)
              if(this.feedback[feedbackPart[0] as string] !== undefined){
                this.feedback[feedbackPart[0] as string].lineRanges.push( new LineRanges(feedbackPart[4]) );
              }else{
                this.feedback[feedbackPart[0] as string] = new CheckerCoverageFeedback(
                  feedbackPart[0],
                  file.name,
                  feedbackPart[2],
                  [new LineRanges(feedbackPart[4])],
                  feedbackPart[1],
                  feedbackPart[3]
                );
              }
            }
          }
          
          if (comment.includes(keyWordEndCov)) {
            //fetch id
            let startParams = comment.substring(comment.indexOf(keyWordEndCov));
            startParams = startParams.substring(startParams.indexOf('"') + 1);
            let msgId = startParams.substring(0, startParams.lastIndexOf(')') - 1);
            while (msgId.lastIndexOf(')') >= 0) {
              if (msgId.lastIndexOf(')') != msgId.lastIndexOf('\)') + 1) {
                msgId = msgId.substring(0, msgId.lastIndexOf(')') - 1);
                msgId = msgId.substring(0, msgId.lastIndexOf('"') - 1);
              } else
                break;
            }
            // Find the previous non-empty Java instruction line
            let previousInstructionLine = line.trim().startsWith('/*') ? lineNumber : lineNumber + 1;
            while (previousInstructionLine != lineNumber && previousInstructionLine > 0) {
              if (lines[previousInstructionLine].trim() != '')
                break;
              previousInstructionLine--;
            }
            //update CheckerCoverageFeedbacks[msgId]
            if (this.feedback.hasOwnProperty(msgId)) {
              for(let i=(this.feedback[msgId].lineRanges as any).length-1; i>=0; i++){
                if( (this.feedback[msgId].lineRanges)[i].getEnd() == null ){
                  (this.feedback[msgId].lineRanges as any)[i].setEnd(previousInstructionLine);
                  break;
                }
              }
            }
          }
        }
      }

      console.log("resultState3");
      /* Update line ranges
       * For each feedback in this.feedback : Delete next lineRange from array of lineRanges
       * if the end of the current linerange in array of lineranges of current feedback is not null, 
       * and is bigger than the end of linerange of others next linerange in array of lineranges of current feedback which not null,
       * or others next lineRange.start is smaller than current linerange.end
       */
      for (let fbKey in this.feedback) {
        let highestRangesEnds = null; 
        for (let j=0; j<(this.feedback[fbKey].lineRanges as any).length; j++) {
          let currentRangeEnd = ((this.feedback[fbKey]).lineRanges[j]).getEnd();
          let currentRangeStart = ((this.feedback[fbKey]).lineRanges[j]).getStart();
          if(highestRangesEnds!=null){
            if(currentRangeStart <= highestRangesEnds || (currentRangeEnd != null && currentRangeEnd <= highestRangesEnds)){
              (this.feedback[fbKey].lineRanges as any).splice(j,1);
            }
          }else{
            highestRangesEnds = currentRangeEnd;
          }
        }
      }
      console.log("resultState4");
      this.updateResult(isReplacingOld,resultState);
  }

  //1- Build array of syntactic errors & build array of feedback block
  //2- Parse coverage value of config and replace completely with new results
  public async buildConfigFromJavaFiles(files: any, isToUnpack:boolean, isReplacingOld: boolean){
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
        if(i<fileIndex && currentFiles[i].name.endsWith(".java")) {
          let fileContent = await files.file(currentFiles[i].name).async("string");
          cc.buildConfigFromJavaFile(currentFiles[i], fileContent, isStillReplacingOld);
          isStillReplacingOld = true;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public updateResult_testFailures(showTestFailures: boolean,setState) {
    
    let resultContainer = document.querySelector(".overview_result textarea.boxContainer") as HTMLTextAreaElement;
    let resultTxt = JSON.parse(resultContainer.value);
    resultTxt["coverage"]["showTestFailures"] = showTestFailures;
    setState(new MASSHandler().formatConfigResult(JSON.stringify(resultTxt), 1));
    resultContainer.value = new MASSHandler().formatConfigResult(JSON.stringify(resultTxt), 1);
  }


  public updateResult_testFullReport(showFullCoverageReport: boolean,setState) {
    let resultContainer = document.querySelector(".overview_result textarea.boxContainer") as HTMLTextAreaElement;
    let resultTxt = JSON.parse(resultContainer.value);
    resultTxt["coverage"]["showFullCoverageReport"] = showFullCoverageReport;
    setState(new MASSHandler().formatConfigResult(JSON.stringify(resultTxt), 1));
    resultContainer.value = new MASSHandler().formatConfigResult(JSON.stringify(resultTxt), 1);
  }


  public updateResult(isReplacingOld: boolean,setState) {

    let resultTxt = JSON.parse(new MASSHandler().getDefault_massFullConfig());


    if (isReplacingOld) {
      let coverageString = this.getStringCoverageConfig().split("\n").join("");
      coverageString = coverageString.substring(coverageString.indexOf(":") + 1);
      coverageString = coverageString.substring(0, coverageString.lastIndexOf(","));
      coverageString.trim();
      resultTxt["coverage"] = JSON.parse(coverageString);
    } else {
      resultTxt["coverage"]["feedback"].push( JSON.parse(this.getStringFeedbackConfig()) );
    }
    
    resultTxt["coverageSelected"] = true;
    setState(new MASSHandler().formatConfigResult(JSON.stringify(resultTxt), 1));
    console.log("Henaa")
    console.log(new MASSHandler().formatConfigResult(JSON.stringify(resultTxt), 1));
  }

}