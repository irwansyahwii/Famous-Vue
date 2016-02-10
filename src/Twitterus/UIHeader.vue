<template>
    <node size-mode="default, absolute" absolute-size="null,100">
        <node>
            <dom-element classes="header"></dom-element>
            <node v-ref:title-node align="0,0">
                <dom-element v-ref:title-element :properties="titleProperties">{{title}}</dom-element>
            </node>
        </node>
    </node>
</template>

<script type="text/javascript">


    export default {
        data: function(){
            return {
                titleProperties: {
                    textAlign: 'center',
                    lineHeight: '100px',
                    textWrap: 'none',
                    fontSize: '30px',
                    color: 'white',
                    backgroundColor: 'green'
                }
            }
        },
        computed: {
            title:{
                get: function(){
                    return this._title
                },
                set: function(value){
                    this._title = value
                    this.$refs.titleElement.setContent(this._title)
                }
            }
        },

        beforeCompile: function(){
            this._title = "Header NIh"
        },
        compiled: function(){
                        
        }
    }

</script>