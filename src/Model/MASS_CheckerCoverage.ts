import { CoverageMiss } from "../Model/DataStructurs/CoverageMiss";
import CheckerCoverageFeedback from "../Model/CheckerCoverageFeedback";

interface AssociativeArrayFeedbacks {
  [key: string]: CheckerCoverageFeedback
}

export default class MASS_CheckerCoverage {
  public showTestFailures: boolean = true;
  public showFullCoverageReport: boolean = false;
  public feedback: AssociativeArrayFeedbacks[] = [];


  constructor(showTestFailures?: boolean, showFullCoverageReport?: boolean, feedback?: AssociativeArrayFeedbacks[]) {
    this.showTestFailures = showTestFailures !== undefined ? showTestFailures : true;
    this.showFullCoverageReport = showFullCoverageReport !== undefined ? showFullCoverageReport : false;
    this.feedback = feedback !== undefined ? feedback : [];
  }


  public getStringCoverageConfig(): string {
    let sFCR = this.showFullCoverageReport ? "true" : "false";
    let sTF = this.showTestFailures ? "true" : "false";
    let coverageString = '\n  "coverage": {\n    ' +
      '"feedback": [\n      ' +
      this.getStringFeedbackConfig() +
      '\n    ],\n    ' +
      '"showFullCoverageReport": ' + sFCR + ',\n    ' +
      '"showTestFailures": ' + sTF + '\n  },';
    return coverageString;
  }


  public getStringFeedbackConfig(): string {
    let fbKeys = Object.keys(this.feedback);
    var buildedFeedback = fbKeys.length > 0 ? "" : new CheckerCoverageFeedback().buildPartFeedbackBlock_empty();
    for (let fbKey in this.feedback) {
      //@ts-ignore 
      buildedFeedback += this.feedback[fbKey as string].buildPartFeedbackBlock();
      buildedFeedback += fbKey == fbKeys[fbKeys.length - 1] ? "" : ",\n    ";
    }
    return buildedFeedback;
  }


  protected extractFeedbackPart(lines: any, line: any, commentStartString: any, kwFirstCharLineNumber: any, kwLastCharLineNumber: any): any[] {
    const keyWordStartCov: string = '@mass_cvStart(';
    //fetch parameters
    let startParams = line.substring(line.indexOf(keyWordStartCov));
    startParams = startParams.substring(startParams.indexOf('"') + 1);
    let params = startParams.substring(0, startParams.lastIndexOf('"'));
    let paramsConcat = params;
    let currPartConcatParam = "";
    let arrayParams: any[] = [];
    while (paramsConcat.indexOf('",') >= 0) {
      currPartConcatParam += paramsConcat.substring(0, paramsConcat.indexOf('",'));
      if ((paramsConcat.indexOf('\",') != -1 && (paramsConcat.indexOf('",') == paramsConcat.indexOf('\",') + 1)) || (paramsConcat.indexOf('\\",') != -1 && (paramsConcat.indexOf('",') == paramsConcat.indexOf('\\",') + 2))) {
        paramsConcat = paramsConcat.substring(paramsConcat.indexOf('",') + 2);
      } else {
        arrayParams.push(currPartConcatParam);
        paramsConcat = paramsConcat.substring(paramsConcat.indexOf('",') + 2);
        paramsConcat = paramsConcat.substring(paramsConcat.indexOf('"') + 1);
        currPartConcatParam = "";
      }
    }
    arrayParams.push(paramsConcat);
    //TODO if array bigger than 4 elements, save errors. else
    //id : arrayParams[0]
    arrayParams[0] = arrayParams[0].replaceAll(/\s/g, '');
    //message : arrayParams[1];
    //coverageMiss : arrayParams[2] 
    arrayParams[2] = arrayParams[2].replaceAll(/\s/g, '') == CoverageMiss.FULLY_MISSED.toString() ? CoverageMiss.FULLY_MISSED : CoverageMiss.PARTIALLY_MISSED;
    //supMessages : arrayParams[3]
    arrayParams[3] = arrayParams[3].replaceAll(/\s/g, '').split(',');
    // Find the next non-empty Java instruction line
    let nextInstructionLine: number = line.trim().startsWith(commentStartString) ? kwLastCharLineNumber + 2 : kwLastCharLineNumber + 1;
    while (nextInstructionLine != kwLastCharLineNumber && nextInstructionLine < lines.length) {
      if (lines[nextInstructionLine].trim() != '')
        break;
      nextInstructionLine++;
    }
    arrayParams.push(nextInstructionLine);
    return arrayParams;
  }

}