<template>
    <node v-ref:main-node v-bind:size-mode="sizeMode" v-bind:absolute-size="absoluteSize" 
        v-bind:position="position" v-bind:align="align" v-bind:mount-point="mountPoint">
        <dom-element v-ref:el :cssproperties="elProperties" v-bind:content="direction === 1 ? '>' : '<' ">
        </dom-element>
    </node>    
</template>

<script type="text/javascript">
    export default {
        props:{
            direction: {
                type: Number
            },
            init: function(){
                this.$options.famousObject = this.$parent.$options.famousObject
                this.$refs.mainNode.addUIEvent('click')
            },            
            sizeMode:{
                type: String
            },
            absoluteSize: {
                type: String
            },
            position: {
                type: String
            },
            align: {
                type: String
            },
            mountPoint: {
                type: String
            }
        },
        data: function(){
            return {
                elProperties: {
                    fontSize: '40px',
                    lineHeight: '40px',
                    cursor: 'pointer',
                    textHighlight: 'none',
                    'zIndex': '2',
                    color: 'white'
                }
            }
        },
    }
</script>