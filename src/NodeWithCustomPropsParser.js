import GlobalVars from './GlobalVars'
import famous from 'famous'
import FamousBase from './FamousBase'

var Node = famous.core.Node

export default class NodeVue extends FamousBase{
    constructor(){
        super()
        this.props = {
            sizeMode: {
                type: String,
                default: '',
                famousType: 'string',
                allowEmpty: false,
                target: function(){
                    return this.$options.famousObject
                },
                get: function(){
                    return this.$options.famousObject.getSizeMode()
                }                   
            },
            absoluteSize: {
                type: String,
                default: '',
                famousType: 'float',
                allowNull: true,
                target: function(){
                    return this.$options.famousObject
                }
            },
            differentialSize: {
                type: String,
                default: '',
                famousType: 'float',
                target: function(){
                    return this.$options.famousObject
                }
            },
            position: {
                type: String,
                default: '',
                famousType: 'float',
                target: function(){
                    return this.$options.famousObject
                }
            },
            mountPoint: {
                type: String,
                default: '',
                famousType: 'float',                    
                target: function(){
                    return this.$options.famousObject
                }
            },
            origin: {
                type: String,
                default: '',
                famousType: 'float',
                target: function(){
                    return this.$options.famousObject
                }
            },                
            align: {
                type: String,
                default: '',
                famousType: 'float',
                target: function(){
                    return this.$options.famousObject
                }
            },
        }

        this.methods.requestUpdate = this.requestUpdate
        this.methods.requestUpdateOnNextTick = this.requestUpdateOnNextTick
        this.methods.setRotation = this.setRotation            
    }

    onBeforeCompile(){

        this.$parent.$options.famousObject = this.$parent.$options.famousObject || {}

        this.$options.famousObject = new Node()
        this.$options.famousObject.onMount = (path)=>{
            this.$dispatch('on-mount', path)
        }
    }


    onReady(){
        if(this.$parent.$options.famousObject.addChild){
            this.$parent.$options.famousObject.addChild(this.$options.famousObject)
        }
        else {
            GlobalVars.settings.rootScene.addChild(this.$options.famousObject)   
        }                        
    }

    addComponent(obj){
        return this.$options.famousObject.addComponent(obj)
    }

    requestUpdate(obj){
        this.$options.famousObject.requestUpdate(obj)
    }

    requestUpdateOnNextTick(obj){
        this.$options.famousObject.requestUpdateOnNextTick(obj)
    }
}