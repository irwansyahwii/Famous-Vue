<script type="text/javascript">
    import famous from "famous"
    import GlobalVars from "./GlobalVars"
    import FamousBase from './FamousBase'

    var DOMElement = famous.domRenderables.DOMElement
    var Node = famous.core.Node

    class Resize extends FamousBase{
        constructor(){
            super()

            this.props = {
                callback: {
                    type: Function,
                    default: null
                }
            }
        }

        onInit(){

            this.$options.node = null

            if(this.$parent.$options.famousObject.addChild){
                this.$options.node = this.$parent.$options.famousObject
            }
            else {
                this.$options.node = GlobalVars.settings.rootScene.addChild()   
            }        

            this.$options.famousObject = {
                onSizeChange: (x, y, z)=>{                    
                    if(this.callback !== null){
                        this.callback(x, y, z)
                    }
                    
                }                
            }

            this.$options.node.addComponent(this.$options.famousObject)
        }    
    }

    export default new Resize()
</script>