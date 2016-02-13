<template>
    <node v-ref:main-node>
        <resize callback=""></resize>
    </node>
</template>
<script type="text/javascript">
    import famous from 'famous'
    
    const FamousEngine = famous.core.FamousEngine
    const PhysicsEngine = famous.physics.PhysicsEngine

    export default {
        data: function(){
            return {
                currentIndex: 0,
                pageWidth: 0,
                simulation : new PhysicsEngine()
            }
        },
        methods: {
            onMainNodeResized: function(x, y, z){
                this.pageWidth = x
            },
            onUpdate: function(time){
                
            }
        },
        created: function(){
            FamousEngine.requestUpdate(this)
        }
    }
</script>