<template>
    <node v-ref:main-node size-mode="default,absolute" absolute-size="null,100" mount-point="0,1" align="0,1">
        <node>
            <dom-element :cssproperties="{backgroundColor:'black'}"></dom-element>
            <nav-button v-for="section in sections" v-bind:id="section.id" v-bind:proportional-size="1/numSections" v-bind:align="$index/numSections"></nav-button>
        </node>
    </node>    
</template>
<script type="text/javascript">

    import data from './Data'

    export default {
        data: function(){
            return {
                buttons: {},
                numSections: data.sections.length,
                sections: data.sections

            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        }
    }
    
</script>