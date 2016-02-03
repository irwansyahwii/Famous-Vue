<template>
    <i style="display:none">
        <slot v-ref:child-slot></slot>
    </i>
    
</template>

<script type="text/javascript">
    import famous from "famous"
    import GlobalVars from "./GlobalVars"

    var DOMElement = famous.domRenderables.DOMElement

    class DOMElementVue{
        constructor(){
            this.compiled = this.onCompiled
            this.famousObject = null
            this.famousObjectType = 'node'

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
        }

        onCompiled(){            
            let parentNode = null
            
            if(this.$parent.$options.famousObjectType === 'node'){
                parentNode = this.$parent.$options.famousObject

            }
            else{
                if(GlobalVars.settings.isRootSceneExists){
                    parentNode = GlobalVars.settings.rootSceneVue.$options.famousObject.addChild()                    
                }
            }            

            this.$options.famousObject = new DOMElement(parentNode, {
                tagName: this.tagName,
                attributes: this.attributes,
                property: this.properties
            })

            this.$options.famousObject._node.addUIEvent('click')
            this.$options.famousObject.on('click', (e, o)=>{                
                this.$dispatch('click', e, o)
            })

            if(this.$el.children.length > 0){
                this.$options.famousObject.setContent(this.$el.children[0].outerHTML)    
            }


            
        }
    }

    export default new DOMElementVue()
</script>