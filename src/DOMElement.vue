<template>
    <i style="display:none">
        <slot v-ref:child-slot></slot>
    </i>
    
</template>

<script type="text/javascript">
    import famous from "famous"
    import GlobalVars from "./GlobalVars"
    import FamousBase from './FamousBase'

    var DOMElement = famous.domRenderables.DOMElement
    var GestureHandler = famous.components.GestureHandler

    class DOMElementVue extends FamousBase{
        constructor(){
            super()

            this.props = {
                tagName: {
                    type: String,
                    default: 'div',
                    famousType: 'string',
                    assign: function(value){
                        this.$options.famousObject._tagName = value
                    }
                },
                attributes: {
                    type: Object,
                    default: {},
                    famousType: 'object',
                    assign: function(value){

                        for (let key in value){
                            this.$options.famousObject.setAttribute(key, value[key]);
                        }
                    }
                },
                properties: {
                    type: Object,
                    default: {},
                    famousType: 'object',
                    assign: function(value){
                        for (let key in value){
                            this.$options.famousObject.setProperty(key, value[key]);
                        }
                    }
                },
                content: {
                    type: String,
                    default: '',
                    famousObject: 'string',
                    assign: function(value){
                        if(this.$el.children.length > 0){
                            this.$options.famousObject.setContent(this.$el.children[0].outerHTML)    
                        }            
                        else{
                            let innerHTMLValue = this.$el.innerHTML
                            if(innerHTMLValue.length > 0){
                                this.$options.famousObject.setContent(innerHTMLValue)        
                            }
                            else{
                                this.$options.famousObject.setContent(value)
                            }
                        }                        
                    }
                }
            }

            this.methods.setContent = this.setContent
        }

        setContent(content){
            this.$options.famousObject.setContent(content)
        }

        onBeforeCompile(){
            let parentNode = null
            
            if(this.$parent.$options.famousObject && this.$parent.$options.famousObject.addChild){
                parentNode = this.$parent.$options.famousObject
            }
            else{
                parentNode = GlobalVars.settings.rootScene.addChild()       

            }                        

            this.$options.famousObject = new DOMElement(parentNode)
        }

        onCompiled(){            
            super.onCompiled()

        }
    }

    export default new DOMElementVue()
</script>