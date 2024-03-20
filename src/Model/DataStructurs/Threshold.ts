export default class Threshold{
    private min: number;
    private max: number;
    private noMax: boolean;
    private suggestionMin: string;
    private suggestionMax: string;

    constructor(min: number, max: number, noMax: boolean, suggestionMin: string, suggestionMax: string){
        this.min = min;
        this.max = max;
        this.noMax = noMax;
        this.suggestionMin = suggestionMin;
        this.suggestionMax = suggestionMax;
    }

    private getMin(): number{
        return this.min;
    }
    private getMax(): number{
        return this.max;
    }
    private getNoMax(): boolean{
        return this.noMax;
    }
    private getSuggestionMin(): string{
        return this.suggestionMin;
    }
    private getSuggestionMax(): string{
        return this.suggestionMax;
    }


    private setMin(min: number){
        this.min;
    }
    private setMax(max: number){
        this.max = max;
    }
    private setNoMax(noMax: boolean){
        this.noMax = noMax;
    }
    private setSuggestionMin(suggestionMin: string){
        this.suggestionMin = suggestionMin;
    }
    private setSuggestionMax(suggestionMax: string){
        this.suggestionMax = suggestionMax;
    }

}
