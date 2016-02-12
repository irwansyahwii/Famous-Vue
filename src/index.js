import Vue from 'vue'
import FamousVue from './FamousVue'
import './Twitterus'

Vue.config.debug = true

new Vue({
  el: 'body',
  ready: function(){    

    this.$refs.mainNode.sizeMode = 'render,absolute,default'
    console.log(this.$refs.mainNode.sizeMode)

    // this.$refs.mainNode.setLocation('adsad')

    window.n = this.$refs.mainNode

    console.log('this.$refs.mainNode.value:')
    console.log(this.$refs.mainNode.value)
    
    console.log('this.$refs.mainNode.children:')
    console.log(this.$refs.mainNode.children)

    console.log('this.$refs.mainNode.parent:')
    console.log(this.$refs.mainNode.parent)

    console.log('this.$refs.mainNode.isMounted:')
    console.log(this.$refs.mainNode.isMounted)

    console.log('this.$refs.mainNode.opacity:')
    console.log(this.$refs.mainNode.opacity)

    console.log('this.$refs.mainNode.align:')
    console.log(this.$refs.mainNode.align)

    console.log('this.$refs.mainNode.origin:')
    console.log(this.$refs.mainNode.origin)

    console.log('this.$refs.mainNode.position:')
    console.log(this.$refs.mainNode.position)

    console.log('this.$refs.mainNode.rotation:')
    console.log(this.$refs.mainNode.rotation)

    console.log('this.$refs.mainNode.scale:')
    console.log(this.$refs.mainNode.scale)

    console.log('this.$refs.mainNode.proportionalSize:')
    console.log(this.$refs.mainNode.proportionalSize)

    this.$refs.mainNode.$set('location', 'adsad')
    console.log('this.$refs.mainNode.location2:')
    console.log(this.$refs.mainNode.location)


    // this.$refs.mainNode.$set('sizeMode', 'render,render,render')
    // console.log(this.$refs.mainNode.sizeMode)

  }
})

