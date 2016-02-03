<script type="text/javascript">
    import GlobalVars from './GlobalVars'
    import famous from 'famous'

    var Node = famous.core.Node

    class NodeVue{
        constructor(){
            this.beforeCompile = this.onBeforeCompile
            this.famousObject = null
            this.famousObjectType = 'node'
        }

        onBeforeCompile(){
            
            if(this.$parent.$options.famousObjectType === 'scene'){
                this.$options.famousObject = this.$parent.$options.famousObject.addChild()                
            }
            else if(GlobalVars.settings.isRootSceneExists){
                this.$options.famousObject = GlobalVars.settings.rootSceneVue.famousObject.addChild()   
            }
            else{
                this.$options.famousObject = new Node()
            }
            
        }
    }

    export default new NodeVue()
</script>