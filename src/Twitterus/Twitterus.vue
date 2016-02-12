<template>
    <node v-ref:main-node v-on:on-mount="mainNodeOnMount">
        <ui-header></ui-header>
        <swapper></swapper>
        <ui-footer></ui-footer>
    </node>
</template>
<script type="text/javascript">
    import data from './Data'

    /*
        We still have to handle the navbutton onclick event in this class
    */
    export default {
        data: function(){
            return {
                currentSection: data.sections[0].id
            }
        },
        methods:{
            mainNodeOnMount: function(path){       
                // let mainNodeLocation = this.$refs.mainNode.$options.famousObject.getLocation()

                // if(mainNodeLocation === path){
                //     this.$broadcast('change-section', {
                //         from: null,
                //         to: this.currentSection
                //     })                    
                // }
            }
        },
        compiled: function(){
        },
        ready: function(){
            this.$broadcast('change-section', {
                from: null,
                to: this.currentSection
            })
        }
    }
</script>