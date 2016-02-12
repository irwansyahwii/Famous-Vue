import famous from "famous"
import GlobalVars from "./GlobalVars"
import FamousBase from './FamousBase'

var DOMElement = famous.domRenderables.DOMElement
var Node = famous.core.Node

export default class DOMElementWithAutoPropsFromFamousObject extends FamousBase{
    constructor(){
        super()
    }

    onInit(){
        this.$options.node = new Node()
        this.$options.famousObject = new DOMElement(this.$options.node)

        this.$options.propsConverter.attribute = (newVal)=>{
            let parsedValue = newVal
            if(typeof newVal === 'string'){
                parsedValue = this.parseStringPropertyWithComma(newVal, 'attribute')
            }

            return parsedValue
        }

        this.$options.propsConverter.id = (newVal)=>{
            let parsedValue = newVal
            if(typeof newVal === 'string'){
                parsedValue = this.parseStringPropertyWithComma(newVal, 'id')
            }

            return parsedValue
        }

        this.$options.propsConverter.content = (newVal)=>{
            let parsedValue = newVal
            if(typeof newVal === 'string'){
                parsedValue = this.parseStringPropertyWithComma(newVal, 'content')
            }

            return parsedValue
        }

        this.$options.props.cssproperties = {
            type: Object,
            coerce: function(newVal){

                if(typeof newVal === 'object'){                    
                    for(let prop in newVal){
                        
                        this.$options.famousObject.setProperty(prop, newVal[prop])
                    }
                }

                return newVal
            }
        }

        this.$options.props.attributes = {
            type: Object,
            coerce: function(newVal){
                if(typeof newVal === 'object'){
                    for(let attribute in newVal){
                        this.$options.famousObject.setAttribute(attribute, newVal[attribute])
                    }
                }

                return newVal
            }
        }

        this.$options.methods.createPropsFromFamousObject.call(this, this.$options.famousObject)        
    }

    onBeforeCompile()
    {   
        super.onBeforeCompile()

        this.$parent.$options.famousObject = this.$parent.$options.famousObject || {}

        if(this.$parent.$options.famousObject.addChild){
            this.$parent.$options.famousObject.addChild(this.$options.node)
        }
        else {
            GlobalVars.settings.rootScene.addChild(this.$options.node)   
        }        
    }    
}