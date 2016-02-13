<template>
    <node v-ref:main-node size-mode="default, absolute" absolute-size="null,100">
        <node>
            <dom-element v-ref:el classes="header"></dom-element>
            <node v-ref:title  :cssproperties="titleProperties">
                <align v-ref:title-align></align>
                <dom-element v-ref:title-el :cssproperties="titleProperties" ></dom-element>
            </node>
        </node>
    </node>
</template>

<script type="text/javascript">
    export default {        
        events:{
            'change-section': function(eventData){
                this.$refs.titleAlign.set(0, -1, 0, {duration: 250}, ()=>{
                    this.$refs.titleEl.content = eventData.to
                    this.$refs.titleAlign.set(0,0,0, {duration:250})
                })
            }
        },
        data: function(){
            return {
                headerProperties: {
                    backgroundColor: 'green'
                },
                titleProperties: {
                    textAlign: 'center',
                    lineHeight: '100px',
                    textWrap: 'none',
                    fontSize: '30px',
                },
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        }
    }

</script>