import famous from 'famous'
var FamousEngine = famous.core.FamousEngine

export default class Settings{
    constructor(){
        this._rootScene = null
    }

    get isRootSceneExists(){
        return this._rootScene !== null
    }

    get rootScene(){
        if(this._rootScene === null){
            FamousEngine.init()
            this._rootScene = FamousEngine.createScene()
            
        }

        return this._rootScene
    }
}