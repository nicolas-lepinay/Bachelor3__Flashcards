<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Je veux réviser...</h2>
                <SquareList :items="categories" @choose="handler" class="pt-2" ></SquareList>
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
    import { useCategoryStore } from '@/stores/categoriesStore';

    const categoryStore = useCategoryStore();

    export default {
        name: 'Home',
        data() {
            return {
                categories: [],
                showModal: false,
                category_name: ''
            }
        },
        mounted() {
            this.categories = categoryStore.getAll;
        },
        methods: {
            addCategory: function() {
                this.appendCategory();
                this.categories = categoryStore.getAll;
                this.category_name = "";
                this.showModal = false;
            },
            handler(categoryId) {
                this.$router.push(`/${categoryId}`)
            },
            appendCategory() {
                let newCategory = {
                    "id": parseInt(Date.now()),
                    "name": this.category_name,
                    "icon": "star.png"
                }
                categoryStore.create(newCategory);
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
</style>flashcards_categories