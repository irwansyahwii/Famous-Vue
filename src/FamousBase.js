export default class FamousBase{
    constructor(){
        this.beforeCompile = this.onBeforeCompile
        this.famousObject = null

        this.compiled = this.onCompiled

        this.methods = {
            parseStringPropertyWithComma: this.parseStringPropertyWithComma,
            parseIntPropertyWithComma: this.parseIntPropertyWithComma,
            parseFloatPropertyWithComma: this.parseFloatPropertyWithComma,
            parsePropsValue: this.parsePropsValue,
            doParsePropValue: this.doParsePropValue
        }             

    }
    onBeforeCompile(){}

    onCompiled(){
        this.parsePropsValue()
    }

    doParsePropValue(propName){
        let propInfo = this.$options.props[propName]

        if(typeof propInfo.allowEmpty === 'undefined'){
            propInfo.allowEmpty = false
        }

        if(typeof propInfo.autoAssign === 'undefined'){
            propInfo.autoAssign = true
        }

        if(!propInfo.autoAssign){
            return
        }        

        let propValue = []
        if(propInfo.famousType === 'string'){
            propValue = this.parseStringPropertyWithComma(this[propName], propName, 0)
        }
        if(propInfo.famousType === 'float'){
            propValue = this.parseFloatPropertyWithComma(this[propName], propName, 0, propInfo.allowNull)
        }
        if(propInfo.famousType === 'object'){            
            propValue = this[propName] 
        }
        if(propInfo.assign){
            propInfo.assign.apply(this, [propValue])
        }
        if(propInfo.target){
            let ucasePropName = propName.substr(0, 1).toUpperCase() + propName.substr(1, propName.length - 1)

            let doAssignment = this[propName].length > 0 
            doAssignment = doAssignment || (this[propName].length < 0 && propInfo.allowEmpty)

                                
            if(doAssignment){
                // console.log(`Assigning ${propName} with ${propValue}`)
                if(propValue.length === 1){                        
                    propInfo.target.apply(this)['set' + ucasePropName](propValue[0])    
                }
                if(propValue.length === 2){
                    propInfo.target.apply(this)['set' + ucasePropName](propValue[0], propValue[1])    
                }
                if(propValue.length === 3){
                    propInfo.target.apply(this)['set' + ucasePropName](propValue[0], propValue[1], propValue[2])    
                }

            }
            else{
                // console.log(`Forbid assignment ${propName} with ${propValue}`)
            }

        }        
    }

    parsePropsValue(){            
        for(let propName in this.$options.props){

            this.doParsePropValue(propName)

            this.$watch(propName, function(newVal, oldVal){
                this.doParsePropValue(propName)
            })
        }
    }    

    parseIntPropertyWithComma(propertyValue, propertyName, valueLength, allowNull = false){
        let stringValues = this.parseStringPropertyWithComma(propertyValue, propertyName, valueLength, true)

        for(let i = 0; i < stringValues.length; i++){
            if(stringValues[i] === 'null'){
                if(allowNull){
                    stringValues[i] = null
                }
                else{
                    stringValues[i] = 0
                }
            }
            else{
                stringValues[i] = parseInt(stringValues[i])
            }
        }

        return stringValues

    }

    parseFloatPropertyWithComma(propertyValue, propertyName, valueLength, allowNull = false){
        let stringValues = this.parseStringPropertyWithComma(propertyValue, propertyName, valueLength, true)

        for(let i = 0; i < stringValues.length; i++){
            if(stringValues[i] === 'null'){
                if(allowNull){
                    stringValues[i] = null
                }
                else{
                    stringValues[i] = 0.0
                }
            }
            else{
                stringValues[i] = parseFloat(stringValues[i])    
            }
            
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