<template>
    <node differential-size="null,-200" position="0,100">
        <node>
            <dom-element v-ref:el classes="swapper" ></dom-element>
            <tweets-section v-for="section in sections" v-bind:id="$index">
                <align v-ref:align-section></align>
            </tweets-section>
        </node>
    </node>
</template>

<script type="text/javascript">
    import data from './Data'

    export default {
        data: function(){
            return {
                currentSection: null,
                sections: data.sections
            }
        },
        events: {
            'change-section': function(){
                console.log('changing section...')
                console.log(this.$refs)
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },
        ready: function(){
        }        
    }
</script>