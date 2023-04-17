<template>
    <div 
        class='wrapper' 
        :class="`bg-${$attrs.color}`"
        v-bind="$attrs" 
    >
        <div class="header">
            <div class="d-flex aic" @click="this.$router.push('/')">
                <img class="mr-1" src="../assets/icons/home.png"/>
                <p class="fw-900">Accueil</p>
            </div>

            <div class="d-flex aic" @click="this.$router.push('/settings')">
                <p class="fw-900">Options</p>
                <img class="ml-1" src="../assets/icons/setting.png"/>
            </div>
        </div>
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
    height: 90vh;
    margin: auto;
    max-width: 100vw;
    min-height: 700px;
    position: relative;
    width: 400px;
}

.header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 40px 40px;
    & img {
        height: 30px;
        width: 30px;
    }
    & p {
        color: white;
        font-size: 12px;
        text-transform: uppercase;
    }
}

</style>