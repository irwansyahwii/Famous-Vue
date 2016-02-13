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

        this.$options.node = null

        if(this.$parent.$options.famousObject.addChild){
            this.$options.node = this.$parent.$options.famousObject
        }
        else {
            this.$options.node = GlobalVars.settings.rootScene.addChild()   
        }        

        this.$options.famousObject = new DOMElement(this.$options.node)

        this.$options.propsConverter.attribute = (newVal)=>{
            let parsedValue = newVal
            if(typeof newVal === 'string'){
                parsedValue = this.$options.methods.parseStringPropertyWithComma(newVal, 'attribute')
            }

            return parsedValue
        }

        this.$options.propsConverter.id = (newVal)=>{
            let parsedValue = newVal
            if(typeof newVal === 'string'){
                parsedValue = this.$options.methods.parseStringPropertyWithComma(newVal, 'id')
            }

            return parsedValue
        }

        this.$options.propsConverter.content = (newVal)=>{
            let parsedValue = newVal
            if(typeof newVal === 'string'){
                parsedValue = this.$options.methods.parseStringPropertyWithComma(newVal, 'content')
            }

            return (parsedValue || '')
        }

        this.$options.props.classes = {
            type: String,
            coerce: (newVal)=>{
                let parsedValue = newVal
                if(typeof newVal === 'string'){     
                    parsedValue = this.$options.methods.parseStringPropertyWithComma(newVal, 'classes')
                    for(let i = 0; i < parsedValue.length; i++){
                        this.$options.famousObject.addClass(parsedValue[0])
                    }
                }
                return newVal
            }
        }        

        this.$options.props.cssproperties = {
            type: Object,
            coerce: (newVal)=>{

                if(typeof newVal === 'object'){     
                    let isAddWatch = false
                    if(newVal.__ob__){
                        isAddWatch = true

                    }
                    for(let prop in newVal){
                        this.$options.famousObject.setProperty(prop, newVal[prop])

                        if(isAddWatch){
                            let propDescriptor = Object.getOwnPropertyDescriptor(newVal, prop)

                            Object.defineProperty(newVal, prop, {
                                get: propDescriptor.get,
                                set: (the_val)=>{
                                    propDescriptor.set.call(newVal, the_val)
                                    this.$options.famousObject.setProperty(prop, the_val)
                                }
                            })
                            
                        }
                    }
                }

                return newVal
            }
        }

        this.$options.props.attributes = {
            type: Object,
            coerce: function(newVal){
                if(typeof newVal === 'object'){
                    let isAddWatch = false
                    if(newVal.__ob__){
                        isAddWatch = true

                    }

                    for(let attribute in newVal){
                        this.$options.famousObject.setAttribute(attribute, newVal[attribute])

                        if(isAddWatch){
                            let propDescriptor = Object.getOwnPropertyDescriptor(newVal, prop)

                            Object.defineProperty(newVal, prop, {
                                get: propDescriptor.get,
                                set: (the_val)=>{
                                    propDescriptor.set.call(newVal, the_val)
                                    this.$options.famousObject.setAttribute(prop, the_val)
                                }
                            })
                            
                        }                        
                    }
                }

                return newVal
            }
        }

        this.$options.methods.createPropsFromFamousObject.call(this, this.$options.famousObject)        
    }
}