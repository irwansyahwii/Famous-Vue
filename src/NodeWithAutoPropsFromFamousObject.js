import GlobalVars from './GlobalVars'
import famous from 'famous'
import FamousBase from './FamousBase'
import VueComponentBase from './VueComponentBase'

var Node = famous.core.Node

export default class NodeWithAutoPropsFromFamousObject extends FamousBase{
    constructor(){
        super()

        this.famousObject = new Node()

        this.createPropsFromFamousObject(this.famousObject)

        this.props.sizeMode.get = function(){
            let famousObject = this.famousObject || this.$options.famousObject
            let currentSizeMode = famousObject.getSizeMode()

            let mappings = {
                0: 'relative',
                1: 'absolute',
                2: 'render',                
            }

            return [mappings[currentSizeMode[0]], mappings[currentSizeMode[1]], mappings[currentSizeMode[2]]]
        }

        this.props.sizeMode.coerce =  function(val){
            let famousObject = this.famousObject || this.$options.famousObject

            let parsedValue = val
            if(typeof val ===  'string'){
                parsedValue = this.parseStringPropertyWithComma(val, 'sizeMode')

            }
            if(parsedValue.length > 0){
                famousObject.setSizeMode.apply(famousObject, parsedValue)
            }                        

            return famousObject.getSizeMode()                                        
        }.bind(this)

    }

    onBeforeCompile()
    {        

        super.onBeforeCompile()

        this.$options.famousObject.onMount = (path)=>{
            this.location = this.$options.famousObject.getLocation()
            this.id = this.location
            this.$dispatch('on-mount', path)
        }

        this.$parent.$options.famousObject = this.$parent.$options.famousObject || {}

        if(this.$parent.$options.famousObject.addChild){
            this.$parent.$options.famousObject.addChild(this.$options.famousObject)
        }
        else {
            GlobalVars.settings.rootScene.addChild(this.$options.famousObject)   
        }        
    }
}