import VueComponentBase from './VueComponentBase'

export default class FamousBase extends VueComponentBase{
    constructor(){
        super()
        this.famousObject = null

        this.propsConverter = {}
        this.customSetter = {}
        this.props = {}

        this.methods.createFamousProperty = this.createFamousProperty
        this.methods.createFamousMethods = this.createFamousMethods    
        this.methods.createPropsFromFamousObject = this.createPropsFromFamousObject    
        
        this.methods.parseStringPropertyWithComma = this.parseStringPropertyWithComma
        this.methods.parseIntPropertyWithComma = this.parseIntPropertyWithComma
        this.methods.parseFloatPropertyWithComma = this.parseFloatPropertyWithComma
        this.methods.parsePropsValue = this.parsePropsValue
        this.methods.doParsePropValue = this.doParsePropValue
        this.methods.getRealFamousObject = this.getRealFamousObject
    }

    getRealFamousObject(){
        return (this.$options && this.$options.famousObject) || this.famousObject
    }

    createFamousProperty(propName, propInfo){
        let ucasePropName = propName.substr(0, 1).toUpperCase() + propName.substr(1, propName.length - 1)
        let famousObject = this.famousObject || this.$options.famousObject        
            
        if(propInfo.coerce){
            propInfo.set = propInfo.coerce.bind(this)            
        }else{
            let famousObject = this.famousObject || this.$options.famousObject
            let prefix = 'set'
            let famousSetter = famousObject[prefix + ucasePropName]

            if(famousSetter){
                propInfo.set = function(newVal){                    
                    famousSetter.apply(famousObject, [newVal])
                }
            }
        }

        let prefix = 'get'
        if(propInfo.noGetPrefix){
            prefix = ''
        }
        let famousGetter = famousObject[prefix + ucasePropName]

        if(famousGetter && !propInfo.get){
            propInfo.get = function(){

                return famousGetter.call(famousObject)
            }                
        }

        if(propInfo.set || propInfo.get){
            Object.defineProperty(this, propName, propInfo)    
        }                
    }

    createFamousMethods(methodName){
        this[methodName] = function(){
            let method = this.$options.famousObject[methodName]

            return method.apply(this.$options.famousObject, arguments)
        }.bind(this)
    }

    createPropsFromFamousObject(famousObject){        
        for(let memberName in famousObject){
            if(memberName.indexOf('get') === 0 || memberName.indexOf('set') === 0 ){
                

                let propName = ''
                if(memberName.indexOf('get') === 0){
                    propName = memberName.replace('get', '')
                }
                else{
                    propName = memberName.replace('set', '')
                }
                
                let ucasePropName = propName.substr(0, 1).toUpperCase() + propName.substr(1, propName.length - 1)
                let lcasePropName = propName.substr(0, 1).toLowerCase() + propName.substr(1, propName.length - 1)
                let propInfo = {}

                

                this.$options.props[lcasePropName] = propInfo

                let setter = famousObject['set'+ucasePropName]

                if(setter){                    
                    propInfo.coerce = (newVal)=>{

                        let converter = this.$options.propsConverter[lcasePropName]
                        if(converter){
                            newVal = converter(newVal)
                        }
                        else{
                            if(typeof newVal === 'string'){
                                let convertedValue = this.$options.methods.parseFloatPropertyWithComma(newVal, lcasePropName)
                                newVal = convertedValue                                
                            }
                        }

                        let customSetter = this.$options.customSetter[lcasePropName]
                        if(customSetter){
                            customSetter(newVal)
                        }
                        else{
                            if(typeof newVal === 'object'){
                                if(newVal.length === 1){
                                    setter.call(famousObject, newVal[0])    
                                }
                                if(newVal.length === 2){
                                    setter.call(famousObject, newVal[0], newVal[1])    
                                }                                
                                if(newVal.length === 3){
                                    setter.call(famousObject, newVal[0], newVal[1], newVal[2])    
                                }                                
                            }
                            else{
                                setter.call(famousObject, newVal)    
                            }
                            
                        }
                        

                        return newVal
                    }
                }
            }
        }        
    }

    onBeforeCompile()
    {        
        for(let memberName in this.$options.famousObject){
            if(memberName.indexOf('_') < 0 && memberName.indexOf('get') < 0 && memberName.indexOf('set') < 0){
                this.createFamousMethods(memberName)
            }
            
        }

        for(let propName in this.$options.props){
            let propInfo = this.$options.props[propName]
            this.createFamousProperty(propName, propInfo)        
        }
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