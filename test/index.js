import Vue from 'vue'
import FamousVue from '../src/FamousVue'
import '../src/Twitterus'
import assert from 'assert'

Vue.config.debug = true

new Vue({
  el: 'body',
  methods:{
    testNode: function(){
        this.$refs.testNode.sizeMode = 'render,absolute,default'    
        assert.equal(this.$refs.testNode.sizeMode[0], 'render', 'sizeMode[0] failed')
        assert.equal(this.$refs.testNode.sizeMode[1], 'absolute')
        assert.equal(this.$refs.testNode.sizeMode[2], 'relative')

        assert.equal(this.$refs.testNode.location, 'body/0', 'get location failed')
        assert.equal(this.$refs.testNode.id, 'body/0', 'get id failed')

        assert.equal(typeof this.$refs.testNode.emit, 'function', 'emit is not a function')

        assert.equal(typeof this.$refs.testNode.value, 'object', 'value doesnt return an object')

        assert.equal(this.$refs.testNode.children.length, 0, 'children is not empty')

        assert.equal(typeof this.$refs.testNode.parent, 'object', 'parent is not an object')
        assert.equal(this.$refs.testNode.parent.constructor.name, 'Scene')

        assert.equal(typeof this.$refs.testNode.requestUpdate, 'function')        
        assert.equal(typeof this.$refs.testNode.requestUpdateOnNextTick, 'function')

        assert.equal(this.$refs.testNode.isMounted(), true)

        assert.equal(this.$refs.testNode.isShown(), true)

        this.$refs.testNode.opacity = 0.7
        assert.equal(this.$refs.testNode.opacity, 0.7)

        this.$refs.testNode.mountPoint = "0,1,1"
        assert.equal(this.$refs.testNode.mountPoint[0], 0)
        assert.equal(this.$refs.testNode.mountPoint[1], 1)
        assert.equal(this.$refs.testNode.mountPoint[2], 0.5)

        this.$refs.testNode.mountPoint = [1,0,0]
        assert.equal(this.$refs.testNode.mountPoint[0], 1)
        assert.equal(this.$refs.testNode.mountPoint[1], 0)
        assert.equal(this.$refs.testNode.mountPoint[2], -0.5)

        let currentAlignt = this.$refs.testNode.align
        this.$refs.testNode.align = "1"
        assert.equal(this.$refs.testNode.align[0], 1)
        assert.equal(this.$refs.testNode.align[1], currentAlignt[1])
        assert.equal(this.$refs.testNode.align[2], currentAlignt[2])

        currentAlignt = this.$refs.testNode.align
        this.$refs.testNode.align = "0.5,1"
        assert.equal(this.$refs.testNode.align[0], 0.5)
        assert.equal(this.$refs.testNode.align[1], 1)
        assert.equal(this.$refs.testNode.align[2], currentAlignt[2])

        this.$refs.testNode.align = "0,0.5,1"
        assert.equal(this.$refs.testNode.align[0], 0)
        assert.equal(this.$refs.testNode.align[1], 0.5)
        assert.equal(this.$refs.testNode.align[2], 0.5)

        this.$refs.testNode.align = [1, 0, 0]
        assert.equal(this.$refs.testNode.align[0], 1)
        assert.equal(this.$refs.testNode.align[1], 0)
        assert.equal(this.$refs.testNode.align[2], -0.5)

        let currentPosition = this.$refs.testNode.position
        this.$refs.testNode.position = "400"
        assert.equal(this.$refs.testNode.position[0], 400)
        assert.equal(this.$refs.testNode.position[1], currentPosition[1])
        assert.equal(this.$refs.testNode.position[2], currentPosition[2])

        currentPosition = this.$refs.testNode.position
        this.$refs.testNode.position = "700,200"
        assert.equal(this.$refs.testNode.position[0], 700)
        assert.equal(this.$refs.testNode.position[1], 200)
        assert.equal(this.$refs.testNode.position[2], currentPosition[2])

        this.$refs.testNode.position = "900,100,300"
        assert.equal(this.$refs.testNode.position[0], 900)
        assert.equal(this.$refs.testNode.position[1], 100)
        assert.equal(this.$refs.testNode.position[2], 300)

        this.$refs.testNode.position = [20, 800, 98]
        assert.equal(this.$refs.testNode.position[0], 20)
        assert.equal(this.$refs.testNode.position[1], 800)
        assert.equal(this.$refs.testNode.position[2], 98)

        this.$refs.testNode.position = [77, 11]
        assert.equal(this.$refs.testNode.position[0], 77)
        assert.equal(this.$refs.testNode.position[1], 11)
        assert.equal(this.$refs.testNode.position[2], 98)
    }
  },
  ready: function(){    

    this.testNode()


    console.info('End of tests')
  }
})

