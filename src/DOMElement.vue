<template>
    <i style="display:none">
        <slot v-ref:child-slot></slot>
    </i>
    
</template>

<script type="text/javascript">
    import famous from "famous"
    import GlobalVars from "./GlobalVars"

    var DOMElement = famous.domRenderables.DOMElement
    var GestureHandler = famous.components.GestureHandler

    class DOMElementVue{
        constructor(){
            this.compiled = this.onCompiled
            this.famousObject = null

            this.props = {
                tagName: {
                    type: String,
                    default: 'div'
                },
                attributes: {
                    type: Object,
                    default: {}
                },
                properties: {
                    type: Object,
                    default: {}
                },
                content: {
                    type: String,
                    default: ''
                }
            }

            this.methods = {}

            this.methods.setContent = this.setContent
        }

        setContent(content){
            this.$options.famousObject.setContent(content)
        }

        onCompiled(){            
            let parentNode = null

            
            if(this.$parent.$options.famousObject && this.$parent.$options.famousObject.addChild){
                parentNode = this.$parent.$options.famousObject
            }
            else{
                parentNode = GlobalVars.settings.rootScene.addChild()       

            }            

            this.$options.famousObject = new DOMElement(parentNode, {
                tagName: this.tagName,
                attributes: this.attributes,
                properties: this.properties
            })


            if(this.$el.children.length > 0){
                this.$options.famousObject.setContent(this.$el.children[0].outerHTML)    
            }            
            else{
                this.$options.famousObject.setContent(this.$el.innerHTML)    
                // this.$options.famousObject.setContent(this.content)    
            }
        }
    }

    export default new DOMElementVue()
</script>