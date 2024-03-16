import {Level} from "../Model/DataStructurs/Level.js";
import MASS_Syntax from "../Model/MASS_Syntax.js";
import MASSHandler from "./MASSHandler.js";

export default class Control_MASS_Syntax extends MASS_Syntax{
    constructor(level?:Level){
        let levelParent = level !== undefined ? level : Level.BEGINNER;
        super(levelParent);
    }

    public updateResult(){
        let resultContainer = document.querySelector(".overview_result textarea.boxContainer") as HTMLTextAreaElement;
        let resultJson = JSON.parse(resultContainer.value);
        resultJson["syntax"]["level"] = Level[super.getLevel()];
        resultContainer.value = new MASSHandler().formatConfigResult(JSON.stringify(resultJson), 1);
    }
}