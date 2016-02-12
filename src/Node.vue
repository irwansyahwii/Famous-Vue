<template>
    <i style="display:none">
        <slot></slot>
    </i>
</template>
<script type="text/javascript">
    import NodeVue from './NodeWithAutoPropsFromFamousObject'

    export default new NodeVue()
</script>