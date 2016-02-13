export default class VueComponentBase{
    constructor(){        
        this.methods = {}

        if(this.onInit){
            this.init = this.onInit
            this.methods.onInit = this.onInit
        }
        if(this.onCreated){
            this.created = this.onCreated
            this.methods.onCreated = this.onCreated
        }
        if(this.onBeforeCompile){
            this.beforeCompile = this.onBeforeCompile    
            this.methods.onBeforeCompile = this.onBeforeCompile
        }
        if(this.onCompiled){
            this.compiled = this.onCompiled
            this.methods.onCompiled = this.onCompiled
        }
        if(this.onReady){
            this.ready = this.onReady
            this.methods.onReady = this.onReady
        }
        if(this.onAttached){
            this.attached = this.onAttached
            this.methods.onAttached = this.onAttached
        }
        if(this.onDetached){
            this.detached = this.onDetached
            this.methods.onDetached = this.onDetached
        }
        if(this.onDestroy){
            this.destroy = this.onDestroy
            this.methods.onDestroy = this.onDestroy
        }
        if(this.onDestroyed){
            this.destroyed = this.onDestroyed
            this.methods.onDestroyed = this.onDestroyed
        }
    }
}