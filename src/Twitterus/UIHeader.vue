<template>
    <node size-mode="default, absolute" absolute-size="null,100">
        <node>
            <dom-element :properties="{backgroundColor:'green'}"></dom-element>
            <node v-ref:title-node>
                <align v-ref:title-node-align-transition :transition="{duration: 1000, curve: 'easeInOut'}" ></align>
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
                    fontSize: '30px'
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
            
            

            setTimeout(()=>{
                console.log(this.$refs.titleNodeAlignTransition)
                // this.$refs.titleNodeAlignTransition.set = '1,1,0'
                // this.$refs.titleNodeAlignTransition.set(1,1,0, {duration: 3000, curve: 'easeIn'})

                // console.log(this)

                this.title = "heloo"

                // this.$data.title = "HELOOO"
            }, 2500)

        }
    }

</script>