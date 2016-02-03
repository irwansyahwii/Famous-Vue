import Vue from 'vue'
import FamousVue from './FamousVue'

new Vue({
  el: 'body',
  methods: {
    onImageClicked:function (e, o){
      // alert('onImageClicked')
      console.log(e)
      console.log(o)
    }
  },
  ready: function(){    
    
    var spinner = this.$refs.logo.addComponent({
        onUpdate: (time)=>{
            this.$refs.logo.setRotation(0, time/1000, 0)
            this.$refs.logo.requestUpdateOnNextTick(spinner)
        }
    })

    this.$refs.logo.requestUpdate(spinner)

  }
})

