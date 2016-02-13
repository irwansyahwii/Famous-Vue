<template>
    <node v-bind:size-mode="sizeMode" v-bind:absolute-size="absoluteSize" v-bind:position="position">
        <dom-element v-ref:el  :cssproperties="elProperties" v-bind:content="randomMessage"></dom-element>
    </node>    
</template>

<script type="text/javascript">
    import data from './Data'
    export default {
        props:{
            sizeMode: {
                type: String
            },
            absoluteSize: {
                type: String
            },
            position: {
                type: Array
            }
        },
        methods: {
            getRandomColor: function(){
                // trick to create a range.
                return '#' + Array.apply(null, Array(6)).map( (_, i)=> {
                    return this.random('0123456789ABCDEF');
                }).join('');                
            },
            random: function(array){
                return array[(Math.random() * array.length)|0];
            }
        },
        init: function(){
            this.$options.famousObject = this.$parent.$options.famousObject
        },        
        data:function(){
            return {
                elProperties: {
                    backgroundColor: this.getRandomColor(),
                    boxSizing: 'border-box',
                    lineHeight: '100px',
                    borderBottom: '1px solid black',
                    fontSize: '12px',                    
                }
            }
        },
        computed:{
            randomMessage: function(){
                return '<b>' + this.random(data.usernames) +
                    ':</b>' + this.random(data.begin) + this.random(data.middle) + this.random(data.end) +
                    ' ' + this.random(data.hashtags) + ' ' + this.random(data.hashtags);
                
            },

        }
    }
</script>