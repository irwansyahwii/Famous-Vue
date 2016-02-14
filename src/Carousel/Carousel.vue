<template>
    <node v-ref:root>
        <arrow v-ref:back v-on:click="buttonBackClicked" :direction="-1" size-mode="absolute,absolute" absolute-size="40,40" 
            position="40,0,0" align="0, 0.5, 0" mount-point="0, 0.5, 0"></arrow>

        <arrow v-ref:next v-on:click="buttonNextClicked" :direction="1" size-mode="absolute,absolute" absolute-size="40,40" 
            position="-40,0,0" align="1, 0.5, 0" mount-point="1, 0.5, 0" ></arrow>

        <pager :images="images"></pager>

        <dots :num-pages="images.length"></dots>        


    </node>
</template>

<script type="text/javascript">
    import imageData from './data/imageData'

    export default {
        data: function(){
            return {
                images: imageData,
                currentIndex: 0
            }
        },
        methods: {
            buttonBackClicked: function(event){
                this.buttonArrowClicked(event, -1)
            },
            buttonNextClicked: function(event){
                this.buttonArrowClicked(event, 1)
            },
            buttonArrowClicked: function(event, direction){
                let amount = 1

                let oldIndex = this.currentIndex

                let i = oldIndex + (direction * amount)
                let min = 0
                let max = this.images.length - 1

                let newIndex = i > max ? max : i < min ? min : i

                if(this.currentIndex != newIndex) {
                    this.currentIndex = newIndex
                    this.$broadcast('page-change', oldIndex, this.currentIndex)
                }
            }
        },
        ready: function(){
            this.$broadcast('page-change', -1, this.currentIndex)
        }
    }
</script>

<style type="text/css">
    body{
        background: black
    }
</style>