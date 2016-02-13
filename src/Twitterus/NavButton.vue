<template>
    <node v-ref:main-node v-bind:proportional-size="proportionalSize" v-bind:align="align">
        <dom-element v-ref:el classes="navigation" :cssproperties="elementProperties" v-bind:content="id"></dom-element>
    </node>
</template>

<script type="text/javascript">
    export default {
        props: {
            proportionalSize: {
                type: Number
            },
            align: {
                type: Number
            },
            id: {
                type: String
            }
        },
        methods: {
            on: function(){
                this.$refs.el.removeClass('off').addClass('on')
            },
            off: function(){
                this.$refs.el.removeClass('on').addClass('off')
            }
        },
        events: {
            'change-section': function(eventData){
                if(eventData.to === this.id){
                    this.on()
                }
                else{
                    this.off()
                }
            }
        },
        data: function(){
            return {
                elementProperties: {
                    textAlign: 'center',
                    lineHeight: '100px',
                    fontSize: '18px',
                    cursor: 'pointer'                
                }

            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject


            // this.$refs.mainNode.addUIEvents('click')
        },
        compiled: function(){
            this.$refs.mainNode.$options.famousObject.getId = ()=>{

                return this.id
            }
            this.$refs.mainNode.addUIEvent('click')

        }
    }
    
</script>