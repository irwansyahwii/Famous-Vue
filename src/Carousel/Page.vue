<template>
    <node v-ref:main-node size-mode="absolute, absolute, absolute" absolute-size="500,500,0"
        align="0.5,0.5" mount-point="0.5,0.5" origin="0.5,0.5">
        
        <dom-element v-ref:el :cssproperties="elProperties"></dom-element>
    </node>    
</template>

<script type="text/javascript">
    import famous from 'famous'

    const FamousEngine = famous.core.FamousEngine
    const PhysicsEngine = famous.physics.PhysicsEngine
    const Box = famous.physics.Box
    const Spring = famous.physics.Spring
    const RotationalSpring = famous.physics.RotationalSpring
    const RotationalDrag = famous.physics.RotationalDrag
    const Quaternion = famous.math.Quaternion
    const Vec3 = famous.math.Vec3

    export default {
        props:{
            imageUrl: {
                type: String
            },
            index: {
                type: Number
            },
            simulation:{
                type: PhysicsEngine
            },
            pageWidth: {
                type: Number
            }
        },
        events: {
            'page-change': function(oldIndex, newIndex){
                if(oldIndex < newIndex){
                    if(this.index === oldIndex){
                        this.anchor.set(-1, 0, 0)
                        this.quaternion.fromEuler(0, Math.PI/2, 0)
                    }
                    if(this.index === newIndex){
                        this.anchor.set(0, 0, 0)
                        this.quaternion.fromEuler(1, 0, 0)                        
                    }
                }
                else{
                    if(this.index === oldIndex){
                        this.anchor.set(1, 0, 0)
                        this.quaternion.fromEuler(0, -Math.PI/2, 0)
                    }
                    if(this.index === newIndex){
                        this.anchor.set(0, 0, 0)
                        this.quaternion.fromEuler(1, 0, 0)                        
                    }                    
                }
            }
        },
        data: function(){
            return {
                elProperties:{
                    backgroundImage: 'url(' + this.imageUrl + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                },
                pageWidth: 0,
                box: new Box({mass: 100, size: [100, 100, 100]}),
                anchor: null,
                spring: null,
                quaternion: null,
                rotationalSpring: null
            }
        },
        methods:{
            // onMainNodeResized: function(x, y, z){
            //     this.pageWidth = x
            // },            
            onUpdate: function(time){
                this.simulation.update(time)

                let physicsTransform = this.simulation.getTransform(this.box)

                let p = physicsTransform.position
                let r = physicsTransform.rotation

                this.$refs.mainNode.position = [p[0] * this.pageWidth, 0, 0]
                this.$refs.mainNode.rotation = [r[0], r[1], r[2]]

                FamousEngine.requestUpdateOnNextTick(this)
            }            
        },
        created: function(){
            this.$options.famousObject = this.$parent.$options.famousObject

            this.anchor = this.index === 0 ? new Vec3(0, 0, 0) : new Vec3(1, 0, 0)            
            this.spring = new Spring(null, this.box, {period: 0.6, dampingRatio: 0.5, anchor: this.anchor})

            this.quaternion = this.index === 0 ? new Quaternion() : new Quaternion().fromEuler(0, -Math.PI/2, 0)
            this.rotationalSpring = new RotationalSpring(null, this.box, {
                period: 1,
                dampingRatio: 0.2,
                anchor: this.quaternion
            })

            this.simulation.add(this.box, this.spring, this.rotationalSpring)


            FamousEngine.requestUpdate(this)
        }
    }
</script>