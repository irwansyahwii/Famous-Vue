<script type="text/javascript">
    import GlobalVars from './GlobalVars'
    import famous from 'famous'
    import FamousBase from './FamousBase'

    var Align = famous.components.Align

    class AlignVue extends FamousBase{
        constructor(){
            super()

            this.props = {
                value: {
                    type: String,
                    default: '',
                    famousType: 'string',
                    autoAssign: false
                },
                transition: {
                    type: Object,
                    default: function(){
                        return {}
                    }
                },
                callback:{
                    type: Function,
                    default: null
                }

                       
            }

            this.methods.set = this.set
        }

        set(x,y,z, transition, callback){
            let axisValues = this.parseFloatPropertyWithComma(this.value, 'value', 0, true)
            if(typeof x === 'undefined'){
                x = axisValues[0]
            }

            if(typeof y === 'undefined'){
                y = axisValues[1]
            }

            if(typeof z === 'undefined'){
                z = axisValues[2]
            }

            let transitionValue = transition || this.transition
            let callbackValue = callback || this.callback

            this.$options.famousObject.set(x,y,z, transitionValue, callbackValue)
        }

        onBeforeCompile(){
            this.$parent.$options.famousObject = this.$parent.$options.famousObject || {}

            if(this.$parent.$options.famousObject.addChild){
                this.$options.famousObject = new Align(this.$parent.$options.famousObject)
            }
            else {
                throw Error('Align parent is not a Node')
            }            

        }

    }    

    export default new AlignVue()
</script>