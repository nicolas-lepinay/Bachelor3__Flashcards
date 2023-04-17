<template>
    <div class="container d-flex g-2">
        <div 
            v-for="item in items" 
            v-bind:key="item.id" 
            class="square-wrapper"
            @click="go(item.id)"
        >
            <div class="square-btn">
                <img :src="require(`../assets/icons/${item.icon}`)" />
            </div>
            <p>{{ item.name }}</p>
        </div>
        <Spacer height="50"/>
    </div>
</template>

<script>
import Spacer from './Spacer.vue';

export default {
    name: 'SquareList',
    props: ["items"],
    methods: {
        go: function(itemId) {
            this.$emit('choose', itemId)
        }
    },
    components: {
        Spacer
    }
}
</script>

<style lang="scss" scoped>

.container {
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
}

</style>