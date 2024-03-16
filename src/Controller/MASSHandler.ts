import MASS_Syntax from "../Model/MASS_Syntax";
import MASS_CheckerStyle from "../Model/MASS_CheckerStyle";
import MASS_CheckerSemantic from "../Model/MASS_CheckerSemantic";
import MASS_CheckerCoverage from "../Model/MASS_CheckerCoverage";
import MASS_CheckerClass from "../Model/MASS_CheckerClass";
import MASS_CheckerMetric from "../Model/MASS_CheckerMetric";
import {isCorrectJsonSkeleton} from "./Helper";


export default class MASSHandler{

    styleSelected: boolean = false;
    semanticSelected: boolean = false;
    coverageSelected: boolean = true;
    classSelected: boolean = false;
    metricsSelected: boolean = false;


    constructor(styleSelected?: boolean, semanticSelected?: boolean, coverageSelected?: boolean, classSelected?: boolean, metricsSelected?: boolean){
        this.styleSelected = styleSelected !== undefined ? styleSelected : false;
        this.semanticSelected = semanticSelected !== undefined ? semanticSelected : false;
        this.coverageSelected = coverageSelected !== undefined ? coverageSelected : true;
        this.classSelected = classSelected !== undefined ? classSelected : false;
        this.metricsSelected = metricsSelected !== undefined ? metricsSelected : false;
    }


    public getDefault_massFullConfig(): string{
        let syntax : MASS_Syntax = new MASS_Syntax(); 
        let style : MASS_CheckerStyle = new MASS_CheckerStyle(); 
        let semantic : MASS_CheckerSemantic = new MASS_CheckerSemantic(); 
        let coverage : MASS_CheckerCoverage = new MASS_CheckerCoverage(); 
        let checkerclass : MASS_CheckerClass = new MASS_CheckerClass(); 
        let metric : MASS_CheckerMetric = new MASS_CheckerMetric(); 
        
        return '{'+
                syntax.getDefault_massSyntax() + 
                this.getDefault_massSelected() + 
                style.getDefault_massStyle() + 
                semantic.getDefault_massSemantic() + 
                coverage.getStringCoverageConfig() + 
                checkerclass.getDefault_massClass() + 
                metric.getDefault_massMetric() +
            '}';
    }


    public getDefault_massSelected(): string{
        return '\n  "styleSelected": '+this.styleSelected.toString()+',\n  "semanticSelected": '+this.semanticSelected.toString()+',\n  "coverageSelected": '+this.coverageSelected.toString()+',\n  "classSelected": '+this.classSelected.toString()+',\n  "metricsSelected": '+this.metricsSelected.toString()+',';
    }


    public isCorrectConfigSkeleton(configTxt: string): boolean{
        return isCorrectJsonSkeleton(configTxt, this.getDefault_massFullConfig());
    }


    public formatConfigResult(configTxt: string, numberSpaces: number, isSpaceStart:boolean = false): string{
        //default space between key and container rand
        let space_default = ' ';

        //variable space between key and container rand depending on numberSpaces : number of childs in object's value
        let space = ' ';
        for(let i=0; i<numberSpaces; i++){
            space += space;
        }

        //Cast @param configTxt in json object
        let jsonConfig = JSON.parse(configTxt);
        const keysConfig = Object.keys(jsonConfig);

        //Add opening brace, which represent the start of the object
        var result =  isSpaceStart ? space.substring(space_default.length) + '{' : '{';
        
        //index of current key in [keysConfig] array of found keys
        let indexParam = 1;

        //Iterate through array of keys in constructed json object from given @param configTxt
        for (let key of keysConfig) {
            let commaParam = indexParam < keysConfig.length ? ',' : '';
            result += '\n'+ space + '"' + key + '": ';
            const currObjValue = jsonConfig[key];

            //if the value from the key is an array
            if (Array.isArray(currObjValue)) {
                result += '[\n';
                if(typeof currObjValue[0] == "object"){
                    let indexParamArr = 1;
                    for (let arrKey in currObjValue) {
                        commaParam = indexParamArr < currObjValue.length ? ',\n' : '';
                        result += this.formatConfigResult(JSON.stringify(currObjValue[arrKey]), numberSpaces+1, true) + commaParam;
                        indexParamArr++;
                    }
                }
                result += '\n' + space + '],';
            } 
            //if the value from the key is an object
            else if (typeof currObjValue === "object") {
                result += this.formatConfigResult(JSON.stringify(currObjValue), numberSpaces+1) + commaParam;
            } 
            // if the value from the key is a string
            else if (typeof currObjValue === "string"){
                result += '"'+ currObjValue.split('"').join('\'') +'"' + commaParam;
            }
            // if the value from the key is a boolean
            else if (typeof currObjValue === "boolean"){
                result += (currObjValue ? 'true' : 'false') + commaParam;
            }
            // if the value from the key is a boolean
            else if (typeof currObjValue === "number"){
                result += currObjValue + commaParam;
            }
            //anything else : numbers, enums etc...
            else {
                result += '"'+ currObjValue.toString() +'"' + commaParam ;
            }
            indexParam++;
        }

        //Add closing brace, which represent the end of the object
        return result + (keysConfig.length > 0 ? '\n' + space.substring(space_default.length) + '}': '}');
    }



}