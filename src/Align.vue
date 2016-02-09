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
                    default: {}
                },
                callback:{
                    type: Function,
                    default: null
                }
            }

            this.methods.set = this.set
        }

        set(x,y,z, transition, callback){
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

        onCompiled(){
            super.onCompiled()

            let setValues = this.parseFloatPropertyWithComma(this.value, 'value', 0, true)
            let transitionValue = this.transition
            let callbackValue = this.callback

            if(setValues.length === 3){
                this.$options.famousObject.set(setValues[0], setValues[1], setValues[2], transitionValue, callbackValue)    
            }
            
        }
    }    

    export default new AlignVue()
</script>