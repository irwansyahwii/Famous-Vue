<template>
    <node v-ref:main-node size-mode="absolute,absolute" :position="position" :absolute-size="[width, width]">
        <dom-element v-ref:el :cssproperties="elProperties"></dom-element>
    </node>
</template>

<script type="text/javascript">
    export default {
        props:{
            width: {
                type: Number
            },
            position:{
                type: Array
            }
        },
        data: function(){
            return {
                elProperties: {
                    borderRadius: '5px',
                    border: '2px solid white',
                    boxSizing: 'border-box',
                    backgroundColor: 'transparent'
                }
            }
        },
        methods: {
            select: function(){
                this.elProperties.backgroundColor = 'white'
            },
            deselect: function (argument) {
                this.elProperties.backgroundColor = 'transparent'
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },        
    }
</script>