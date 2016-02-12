<template>
    <node size-mode="default, absolute" absolute-size="null,100">
        <node>
            <dom-element classes="header" :cssproperties="headerProperties"></dom-element>
            <node v-ref:title-node align="0,0" size-mode="absolute,absolute" absolute-size="200,100">
                <dom-element v-ref:title-element :cssproperties="titleProperties" content="title" ></dom-element>
            </node>
        </node>
    </node>
</template>

<script type="text/javascript">


    export default {
        events:{
            'change-section': function(){
                console.log('receiving changeSection event')
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
                    color: 'white',
                    backgroundColor: 'red'
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
                    // this.$refs.titleElement.setContent(this._title)
                }
            }
        },

        beforeCompile: function(){
            this._title = "Header NIh"
        },
        compiled: function(){
            console.log(this.$refs.titleNode.sizeMode)
            setTimeout(()=>{
                this.$refs.titleElement.content = "berubah"
            }, 2500)
        }
    }

</script>