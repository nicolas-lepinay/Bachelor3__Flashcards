<template>
    <div class="wrapper">
        <div class="backdrop" @click="$emit('close')" :class="`d-${$attrs.backdrop}`"></div>
        <div class='modal' :class="`h-${$attrs.height}`" >
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
            isBackdrop: true,
            showModal: false
        }
    },
}

</script>

<style lang="scss" scoped>
.modal {
    background-color: rgba(255,255,255, 1); // Default colour
    border-radius: 30px;
    bottom: 0;
    flex-wrap: wrap;
    margin: 0;
    overflow-y: auto;
    padding: 1rem 2rem;
    overflow-x: hidden;
    position: absolute;
    width: 100%;
    white-space: normal; 
    animation: slide-up 0.4s;
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

@keyframes slide-up {
    from { 
        bottom: -100px;
    }
    to { 
        bottom: 0;
    }
}
</style>