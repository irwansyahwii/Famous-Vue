<template>
    <node differential-size="null,-200" position="0,100">
        <node>
            <dom-element :cssproperties="scrollerDivProperties">
                <div v-for="tweet in tweets">{{tweet.text}}</div>
            </dom-element>
        </node>
    </node>
</template>

<script type="text/javascript">
    export default {
        data: function(){
            return {
                scrollerDivProperties: {
                    backgroundColor: 'blue',
                    overflow: 'auto'                    
                },
                tweets: []
            }
        },
        ready: function(){
            for(let i = 1; i <= 100; i++){
                this.tweets.push({text: `Tweet ${i}`})
            }
        }        
    }
</script>