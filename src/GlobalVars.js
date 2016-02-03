import Settings from "./Settings"

class GlobalVars{
    constructor(){
        this.settings = new Settings()
    }
}

export default new GlobalVars()