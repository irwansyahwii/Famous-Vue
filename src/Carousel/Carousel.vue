<template>
    <node v-ref:root>
        <arrow v-ref:back :direction="-1" size-mode="absolute,absolute" absolute-size="40,40" 
            position="40,0,0" align="0, 0.5, 0" mount-point="0, 0.5, 0"></arrow>

        <arrow v-ref:next :direction="1" size-mode="absolute,absolute" absolute-size="40,40" 
            position="-40,0,0" align="1, 0.5, 0" mount-point="1, 0.5, 0" ></arrow>

        <dots :num-pages="10"></dots>        
    </node>
</template>

<script type="text/javascript">
    import imageData from './data/imageData'
</script>

<style type="text/css">
    body{
        background: black
    }
</style>