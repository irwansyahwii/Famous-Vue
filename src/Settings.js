export default class Settings{
    constructor(){
        this.rootSceneVue = null
    }

    get isRootSceneExists(){
        return this.rootSceneVue !== null
    }
}