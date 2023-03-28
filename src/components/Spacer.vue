<template>
    <div 
        :style="customStyle"
        class='w-100' 
    >
    </div>
</template>

<script>
export default {
    name: 'Spacer',
    props: {
        height: String
    },
    computed: {
        customStyle() {
            return {
                "height": `${this.height}px`,
            }
        }
    }
}
</script>
