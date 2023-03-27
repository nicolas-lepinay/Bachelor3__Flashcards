<template>
    <div class="d-flex g-2">
        <div 
            v-for="item in items" 
            v-bind:key="item.id" 
            class="square-wrapper"
        >
            <div class="square-btn">
                <img :src="require(`../assets/icons/${item.icon}`)" />
            </div>
            <p>{{ item.name }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SquareList',
    props: ["items"]
}
</script>