<template>
    <node v-ref:main-node align="0.5, 0.5, 0" mount-point="0.5, 0.5, 0">
        <resize :callback="onMainNodeResized"></resize>
        <page v-for="image in images" :image-url="image" :page-width="pageWidth" :index="$index" :simulation="simulation"></page>
    </node>
</template>
<script type="text/javascript">
    import famous from 'famous'
    
    const FamousEngine = famous.core.FamousEngine
    const PhysicsEngine = famous.physics.PhysicsEngine

    export default {
        props:{
            images: {
                type: Array
            }
        },
        data: function(){
            return {
                currentIndex: 0,                
                simulation : new PhysicsEngine(),
                pageWidth: 0
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },                
        methods: {
            onMainNodeResized: function(x, y, z){
                this.pageWidth = x
            },                        
            onUpdate: function(time){
                // this.simulation.update(time)
            },
        },
        created: function(){
            // FamousEngine.requestUpdate(this)
        }
    }
</script>