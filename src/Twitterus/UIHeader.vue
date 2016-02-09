<template>
    <node size-mode="default, absolute" absolute-size="null,100">
        <node>
            <dom-element :properties="{backgroundColor:'green'}"></dom-element>
            <node v-ref:titleNode>
                <align  :transition="{duration: 1000, curve: 'easeInOut'}" ></align>
                <dom-element :properties="titleProperties">{{title}}</dom-element>
            </node>
        </node>
    </node>
</template>

<script type="text/javascript">


    export default {
        data: function(){
            return {
                title: 'Header Nih',
                titleProperties: {
                    textAlign: 'center',
                    lineHeight: '100px',
                    fontSize: '30px'
                }
            }
        },
        compiled: function(){
            this.$refs.titleNode
        }
    }
</script>