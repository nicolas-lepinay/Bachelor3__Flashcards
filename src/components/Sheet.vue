<template>
    <div 
        class='sheet' 
        :class="`bg-${$attrs.color} h-${$attrs.height}`"
        v-bind="$attrs" 
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Sheet',
}
</script>

<style lang="scss" scoped>
.sheet {
    background-color: white; // Default colour
    border-radius: 30px;
    bottom: 0;
    flex-wrap: wrap;
    margin: 0;
    position: absolute;
    width: 100%;
    white-space: normal; 
}
</style>