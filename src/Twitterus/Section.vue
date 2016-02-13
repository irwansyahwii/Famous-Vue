<template>
    <node v-ref:main-node>
        <align v-ref:align-section></align>
        <slot></slot>
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
            index: {
                type: Number
            },
            id: {
                type: String
            }
        },
        events: {
            'change-section': function(eventData){
                console.log(eventData)
                console.log(this.$refs)

                if(this.id === eventData.to){
                    this.$refs.alignSection.set(0, 0, 0, {duration: 500})
                }
                else{
                    this.$refs.alignSection.set(1, 0, 0, {duration: 500})
                }
            }
        },        
        data: function(){
            return {
                elProperties: {
                    overflowY: 'scroll',
                    overflowX: 'hidden'                    
                },
                tweetNumber: data.sections[this.index].tweetNumber
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },
    }
</script>