<template>
    <node v-ref:main-node>
        <ui-header></ui-header>
        <swapper></swapper>
        <ui-footer v-on:nav-button-clicked="onNavButtonClicked"></ui-footer>
    </node>
</template>
<script type="text/javascript">
    import data from './Data'

    /*
        We still have to handle the navbutton onclick event in this class
    */
    export default {
        data: function(){
            return {
                currentSection: data.sections[0].id
            }
        },
        methods: {
            onNavButtonClicked: function(id){
                let to = id
                this.$broadcast('change-section', {
                    from: this.currentSection,
                    to: to
                })

                this.currentSection = to

            }
        },
        ready: function(){
            this.$broadcast('change-section', {
                from: null,
                to: this.currentSection
            })
        }
    }
</script>