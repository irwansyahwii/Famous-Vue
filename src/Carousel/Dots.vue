<template>
    <node v-ref:main-node size-mode="absolute,absolute" absolute-size="null, 20" 
        position="0,-50,0" align="0.5, 1,0" mount-point=".5, 1,0">
        <resize :callback="onResize"></resize>
        <dot v-for="i in numPages" :position="getDotPosition($index)" :width="dotWidth"></dot>
    </node>
</template>

<script type="text/javascript">
    export default {
        props:{
            dots: {
                type: Array
            },
            dotWidth:{
                type: Number,
                default :10
            },
            spacing:{
                type: Number,
                default: 5
            },
            numPages:{
                type: Number,
                default: 0
            }
        },        
        data: function(){
            return {
                mainSize: [0,0,0]
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },        
        methods: {
            onResize: function(x,y, z){
                this.mainSize = [x, y, z]
            },
            getDotPosition: function(index){                
                let totalDotSize = this.dotWidth * this.numPages + this.spacing * (this.numPages - 1)
                let start = (this.mainSize[0] - totalDotSize)/2

                
                return [start + (this.dotWidth + this.spacing) * index, 0, 0]
            }
        }
    }
</script>