<template>
    <node size-mode="default, absolute" absolute-size="null,100">
        <node>
            <dom-element classes="header" :cssproperties="headerProperties"></dom-element>
            <node v-ref:title-node align="0,0" size-mode="absolute,absolute" absolute-size="200,100">
                <dom-element v-ref:title-element :cssproperties="titleProperties" v-bind:content="test" >{{title}}</dom-element>
                <div class="test-div">{{test}}</div>
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
                },
                test: 'haloo'
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
            console.log('before:')
            console.log(this)
            console.log(this.$refs.titleElement)
            console.log(this.headerProperties)
            setTimeout(()=>{                
                this.headerProperties.backgroundColor = 'brown'
                this.test = "berubah"
                // this.headerProperties = {backgroundColor: 'red'}
                console.log('after:')
                console.log(this.$refs.titleElement)
            }, 2500)
        }
    }

</script>