<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Plus précisement...</h2>
                <SquareList :items="themes" @choose="handler" class="pt-2"></SquareList>
            </div>
            <button class="add-btn" @click="showModal = true">+</button>
        </Sheet>

        <ModalSheet 
            :height="'35'"
            v-if="showModal" 
            @close="showModal = false"
        >
            <p class="fs-19 fw-800">Ajouter un thème</p>

            <input v-model="theme_name" placeholder="Nom du thème" class="my-1" />

            <button 
                class="btn my-2" 
                :class="{ inactive: this.theme_name === ''}"
                @click="addTheme"
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
    name: 'Themes',
    data() {
        return {
            themes: data.themes,
            showModal: false,
            theme_name: ''
        }
    },
    mounted() {
        let themes = localStorage.getItem('flashcards_themes');
        if(!themes) {
            localStorage.setItem('flashcards_themes', JSON.stringify(this.themes));
            themes = localStorage.getItem('flashcards_themes');
        }
        this.themes = themes;
    },
    methods: {
        addTheme: function() {
            this.showModal = false;
        },
        handler(themeId) {
            this.$router.push(`/${this.$route.params.categoryId}/${themeId}`) // ROUTER.PUSH MAIS ROUTE.PARAMS (SANS R)
        },
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