<template>
    <node differential-size="null,-200" position="0,100">
        <node v-ref:sections-node>
            <dom-element v-ref:el classes="swapper" ></dom-element>
            <tweets-section v-for="section in sections" v-bind:id="section.id" v-bind:index="$index">
                
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
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },
        ready: function(){
        }        
    }
</script>