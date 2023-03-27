<template>
    <div 
        class='wrapper' 
        :class="`bg-${$attrs.color}`"
        v-bind="$attrs" 
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Wrapper',
}
</script>

<style lang="scss" scoped>
.wrapper {
    border-radius: 40px;
    box-shadow: rgba(23, 17, 61, 0.13) 0px 48px 100px 0px;
    cursor: pointer;
    height: 90vh;
    margin: auto;
    max-width: 100vw;
    min-height: 700px;
    position: relative;
    width: 400px;
}

</style>