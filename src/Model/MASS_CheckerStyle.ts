import {Level} from "./DataStructurs/Level";

export default class MASS_CheckerStyle{
    basisLevel: Level = Level.BEGINNER;
    complexityLevel: Level = Level.BEGINNER;
    namesLevel: Level = Level.BEGINNER;
    classLength:number = -1;
    methodLength:number = -1;
    cyclomaticComplexity:number = -1;
    fieldsCount:number = -1;
    variableNamePattern:string = "[a-z][a-zA-Z0-9]*";
    methodNamePattern:string = "[a-z][a-zA-Z0-9]*";
    methodParameterNamePattern:string = "[a-z][a-zA-Z0-9]*";
    classNamePattern:string = "[A-Z][a-zA-Z0-9_]*";

    public getDefault_massStyle(): string{
        return '\n  "style": {\n    "basisLevel": "BEGINNER",\n    "complexityLevel": "BEGINNER",\n    "namesLevel": "BEGINNER",\n    "classLength": -1,\n    "methodLength": -1,\n    "cyclomaticComplexity": -1,\n    "fieldsCount": -1,\n    "variableNamePattern": "[a-z][a-zA-Z0-9]*",\n    "methodNamePattern": "[a-z][a-zA-Z0-9]*",\n    "methodParameterNamePattern": "[a-z][a-zA-Z0-9]*",\n    "classNamePattern": "[A-Z][a-zA-Z0-9_]*"\n  },';
    }

}