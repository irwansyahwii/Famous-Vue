<template>
    <i style="display:none">
        <slot></slot>
    </i>
    
</template>

<script type="text/javascript">
    import DOMElementVue from './DOMElementWithAutoPropsFromFamousObject'

    export default new DOMElementVue()
</script>