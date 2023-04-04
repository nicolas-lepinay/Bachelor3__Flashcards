<template>
    <div class="wrapper">
        <div class="backdrop" @click="$emit('close')"></div>
        <div class='modal'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import Sheet from '../components/Sheet.vue';
import SquareList from '../components/SquareList.vue';
import data from '../data/data.json'

export default {
    name: 'Modal',
    data() {
        return {
            showModal: false
        }
    },
}

</script>

<style lang="scss" scoped>
.modal {
    background-color: rgba(255, 255, 255, 0.9);
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    height: 90vh;
    margin: auto;
    max-width: 50vw;
    min-height: 700px;
    padding: 1rem 2rem;
    position: absolute;
    top: 0px;
    left: 100px;
    width: 300px;
    animation: slide-in 0.4s;
}

.backdrop {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 35px;
    left: 0;
    height: 90vh;
    margin: auto;
    max-width: 100vw;
    min-height: 700px;
    position: absolute;
    top: 0;
    width: 400px;
}

.wrapper {
    animation: fade-in 0.3s;
}

@keyframes fade-in {
    from { 
        opacity: 0; 
    }
    to { 
        opacity: 1; 
    }
}

@keyframes slide-in {
    from { 
        left: 400px;
    }
    to { 
        left: 100px;
    }
}
</style>