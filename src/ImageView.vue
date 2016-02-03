<template>
    <scene v-if="!rootSceneExists">

        <dom-element v-ref:dom-element  tag-name="img">
            
        </dom-element>

    </scene>
    <template v-if="rootSceneExists">
        <dom-element v-ref:dom-element tag-name="img">
            
        </dom-element>
    </template>
</template>

<script type="text/javascript">

    import GlobalVars from './GlobalVars'

    class ImageViewVue {
        constructor(){
            this.data = ()=>{
                return {
                    
                }
            }

            this.props = {
                src:{
                    type: String,
                    default: '',
                    famousType: 'string',
                    assign: function(val){
                        this.$options.famousDOMElement.setAttribute('src', val)
                    }
                },
                sizeMode: {
                    type: String,
                    default: '',
                    famousType: 'string',
                    target: function(){
                        return this.$options.famousDOMElement._node
                    }                    
                },
                absoluteSize: {
                    type: String,
                    default: '',
                    famousType: 'float',
                    target: function(){
                        return this.$options.famousDOMElement._node
                    }
                },
                align: {
                    type: String,
                    default: '',
                    famousType: 'float',
                    target: function(){
                        return this.$options.famousDOMElement._node
                    }                    
                },
                origin: {
                    type: String,
                    default: '',
                    famousType: 'float',
                    target: function(){
                        return this.$options.famousDOMElement._node
                    }                    
                },
                mountPoint: {
                    type: String,
                    default: '',
                    famousType: 'float',
                    target: function(){
                        return this.$options.famousDOMElement._node
                    }                    
                }
            }

            this.beforeCompile = function(){
            }

            this.compiled = function(){
                this.$options.famousDOMElement = this.$refs.domElement.$options.famousObject;

                this.parsePropsValue()

            }

            this.computed = {
                rootSceneExists: ()=>{
                    return GlobalVars.settings.isRootSceneExists
                }
            }

            this.methods = {
                parseStringPropertyWithComma: this.parseStringPropertyWithComma,
                parseIntPropertyWithComma: this.parseIntPropertyWithComma,
                parseFloatPropertyWithComma: this.parseFloatPropertyWithComma,
                parsePropsValue: this.parsePropsValue,
                addComponent: this.addComponent,
                requestUpdate: this.requestUpdate,
                requestUpdateOnNextTick: this.requestUpdateOnNextTick,
                setRotation: this.setRotation,
                onClicked: this.onClicked
            }
        }

        onClicked(e, o){
            this.$dispatch('click', e, o)
        }

        setRotation(x, y, z){
            this.$options.famousDOMElement._node.setRotation(x, y, z)
        }

        addComponent(obj){
            return this.$options.famousDOMElement._node.addComponent(obj)
        }

        requestUpdate(obj){
            this.$options.famousDOMElement._node.requestUpdate(obj)
        }

        requestUpdateOnNextTick(obj){
            this.$options.famousDOMElement._node.requestUpdateOnNextTick(obj)
        }

        parsePropsValue(){            
            for(let propName in this.$options.props){
                let propInfo = this.$options.props[propName]

                let propValue = []
                if(propInfo.famousType === 'string'){
                    propValue = this.parseStringPropertyWithComma(this[propName], propName, 0)
                }
                if(propInfo.famousType === 'float'){
                    propValue = this.parseFloatPropertyWithComma(this[propName], propName, 0)
                }
                if(propInfo.assign){
                    propInfo.assign.apply(this, [propValue])
                }
                if(propInfo.target){
                    let ucasePropName = propName.substr(0, 1).toUpperCase() + propName.substr(1, propName.length - 1)

                    if(propValue.length === 2){
                        propInfo.target.apply(this)['set' + ucasePropName](propValue[0], propValue[1])    
                    }
                    if(propValue.length === 3){
                        propInfo.target.apply(this)['set' + ucasePropName](propValue[0], propValue[1], propValue[2])    
                    }

                }
            }
        }


        parseIntPropertyWithComma(propertyValue, propertyName, valueLength){
            let stringValues = this.parseStringPropertyWithComma(propertyValue, propertyName, valueLength, true)

            for(let i = 0; i < stringValues.length; i++){
                stringValues[i] = parseInt(stringValues[i])
            }

            return stringValues

        }

        parseFloatPropertyWithComma(propertyValue, propertyName, valueLength){
            let stringValues = this.parseStringPropertyWithComma(propertyValue, propertyName, valueLength, true)

            for(let i = 0; i < stringValues.length; i++){
                stringValues[i] = parseFloat(stringValues[i])
            }

            return stringValues

        }

        parseStringPropertyWithComma(propertyValue, propertyName, valueLength, trim = true){
            let propertyValues = propertyValue.split(',')

            if(trim){
                for(let i = 0; i < propertyValues.length; i++){
                    propertyValues[i] = propertyValues[i].trim()
                }
            }

            return propertyValues;
        }

    }

    export default new ImageViewVue()
    
</script>