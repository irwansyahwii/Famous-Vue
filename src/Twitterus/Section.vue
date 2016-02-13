<template>
    <node v-ref:main-node>
        <dom-element v-ref:el :cssproperties="elProperties">
        </dom-element>
        <tweet v-for="i in tweetNumber" size-mode="default, absolute" absolute-size="null, 100" 
            v-bind:position="[0, 100 * i]" ></tweet>

    </node>
</template>

<script type="text/javascript">
    import data from './Data'

    export default{
        props: {
            id: {
                type: Number
            }
        },
        data: function(){
            return {
                elProperties: {
                    overflowY: 'scroll',
                    overflowX: 'hidden'                    
                },
                tweetNumber: data.sections[this.id].tweetNumber
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },
    }
</script>