<template>
    <slot></slot>    
</template>

<script type="text/javascript">
    import famous from "famous"
    import GlobalVars from "./GlobalVars"

    var FamousEngine = famous.core.FamousEngine

    // var famousObject = FamousEngine.createScene()


    var sceneVue = {
        famousObject: null,
        famousObjectType: "scene",
        props: {
            name: {
                type: String
            }
        },
        beforeCompile: function(){
            this.$options.famousObject = FamousEngine.createScene()

            if(GlobalVars.settings.rootSceneVue === null){
                GlobalVars.settings.rootSceneVue = this
                FamousEngine.init()
                // console.log("GlobalVars.settings.rootSceneVue:")
                // console.log(GlobalVars.settings.rootSceneVue)
            }
        },
        compiled: function(){
            
        }        
    }

    export default sceneVue
</script>