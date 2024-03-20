import {CoverageMiss} from "./DataStructurs/CoverageMiss";
import LineRanges from "./DataStructurs/LineRanges.js";

export default class CheckerCoverageFeedback{
    public ID: string = "";
    public filename: string = "";
    public showFor: CoverageMiss = CoverageMiss.PARTIALLY_MISSED;
    public lineRanges: [LineRanges] | null = null;
    public messages: string = "";
    public suppresses: string[] = [];

    constructor(ID?:string, filename?:string, showFor?:CoverageMiss, lineRages?:[LineRanges]|null, messages?:string, suppresses?:string[]){
        this.ID = ID !== undefined ? ID : "";
        this.filename = filename !== undefined ? filename : "";
        this.showFor = showFor !== undefined ? showFor : CoverageMiss.PARTIALLY_MISSED;
        this.lineRanges = lineRages !== undefined ? lineRages : null;
        this.messages = messages !== undefined ? messages : "";
        this.suppresses = suppresses !== undefined ? suppresses : [];
    }

    public buildPartFeedbackBlock() : string{
        let lineRangeValue = '';
        if(this.lineRanges){
            for(let i=0; i<this.lineRanges.length; i++){
                lineRangeValue += this.lineRanges[i].printLineRange();
                lineRangeValue += i+1 < this.lineRanges.length ? ',' : '';
            } 
        }
        let lineRangeKeyValue = this.lineRanges == null ? '"lineRanges": "",\n        ' : '"lineRanges": "'+ lineRangeValue + '",\n        ';
        let supKeyValue = this.suppresses.length == 0 ? "" : '"suppresses": "'+ this.suppresses.join() +'"\n      ';
        let fName =  this.suppresses.length == 0 ? '"fileName": "'+ this.filename +'"\n      ' : '"fileName": "'+ this.filename +'",\n        ';
        return '{\n        ' +
                '"ID": "'+ this.ID + '",\n        ' +
                lineRangeKeyValue+
                '"message": "'+ this.messages + '",\n        ' +
                '"showFor": "' + CoverageMiss[this.showFor] + '",\n        ' +
                fName +
                supKeyValue +
                '}';
    }

    public buildPartFeedbackBlock_empty() : string{
        return '{}';
    }
    
}