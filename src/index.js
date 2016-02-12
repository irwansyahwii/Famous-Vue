import Vue from 'vue'
import FamousVue from './FamousVue'
import './Twitterus'

Vue.config.debug = true

new Vue({
  el: 'body',
  ready: function(){    

    // this.$refs.mainNode.$set('sizeMode', 'render,render,render')
    // console.log(this.$refs.mainNode.sizeMode)

  }
})

