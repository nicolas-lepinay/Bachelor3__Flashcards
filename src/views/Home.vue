<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Je veux réviser...</h2>
                <SquareList :items="categories" class="pt-2"></SquareList>
            </div>
            <button class="add-btn" @click="showModal = true">+</button>
        </Sheet>

        <ModalSheet 
            :height="'35'"
            v-if="showModal" 
            @close="showModal = false"
        >
            <p class="fs-19 fw-800">Ajouter une catégorie</p>

            <input v-model="category_name" placeholder="Nom de la catégorie" class="my-1" />

            <button 
                class="btn my-2" 
                :class="{ inactive: this.category_name === ''}"
                @click="addCategory"
            >
                Confirmer
            </button>
        </ModalSheet>

    </Wrapper>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import Sheet from '../components/Sheet.vue';
import SquareList from '../components/SquareList.vue';
import ModalSheet from '../components/ModalSheet.vue';

import data from '../data/data.json'

export default {
    name: 'Home',
    data() {
        return {
            categories: data.categories,
            showModal: false,
            category_name: ''
        }
    },
    mounted() {
        let categories = localStorage.getItem('flashcards_categories');
        if(!categories) {
            localStorage.setItem('flashcards_categories', JSON.stringify(this.categories));
            categories = localStorage.getItem('flashcards_categories');
        }
        this.categories = categories;
    },
    methods: {
        addCategory: function() {
            this.showModal = false;
        }
    },
    components: {
        Wrapper,
        Sheet,
        SquareList,
        ModalSheet
    }
}

</script>

<style lang="scss" scoped>

input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    font-size: 16px;
    outline: none;
    padding: 5px 20px 5px 0;
    width: 85%;
}
input:focus {
    border-bottom: 2px solid #4F42D8;
}

button {
    background-color: #4F42D8;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
}
</style>