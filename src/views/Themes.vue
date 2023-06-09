<template>
    <Wrapper :color="'primary'" >
        <Sheet v-if="this.themes.length > 0" :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Plus précisement...</h2>
                <SquareList :items="themes" @choose="handler" class="pt-2"></SquareList>
            </div>
            <button class="add-btn" @click="showModal = true">+</button>
        </Sheet>

        <!-- 🚫 AUCUN THÈME DISPONIBLE -->
        <ModalSheet v-else
            :height="'80'"
            :backdrop="'none'"
        >
            <div class="container">
                <h1 class="fs-48">🤡</h1>
                <h2 class="fs-32">Oops...</h2>
                <p>Aucun thème n'est disponible pour cette catégorie. Des thèmes peuvent être ajoutés dans le menu <span class="highlight" @click="this.$router.push(`/settings`)">Options</span> ou en cliquant sur le bouton ci-dessous.</p>
                <button
                    class="btn mt-4"
                    @click="showModal = true"
                >
                    Ajouter un thème
                </button>

                <button
                    class="btn btn-secondary mt-2"
                    @click="this.$router.push(`/`)"
                >
                    Retour
                </button>
            </div>
        </ModalSheet>

        <!-- ➕ AJOUTER UN NOUVEAU THÈME -->
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
    import { useThemeStore } from '@/stores/themesStore';

    const themeStore = useThemeStore();

    export default {
        name: 'Themes',
        data() {
            return {
                themes: [],
                showModal: false,
                theme_name: ''
            }
        },
        mounted() {
            this.themes = themeStore.getByCategory(this.$route.params.categoryId);
        },
        methods: {
            addTheme: function() {
                this.appendTheme();
                this.themes = themeStore.getByCategory(this.$route.params.categoryId)
                this.theme_name = "";
                this.showModal = false;
            },
            handler(themeId) {
                this.$router.push(`/${this.$route.params.categoryId}/${themeId}`) // ROUTER.PUSH MAIS ROUTE.PARAMS (SANS R)
            },
            appendTheme() {
                let newTheme = {
                    "id": parseInt(Date.now()),
                    "category_id": parseInt(this.$route.params.categoryId),
                    "name": this.theme_name,
                    "icon": "star.png"
                }
                themeStore.create(newTheme);
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
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

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

.btn {
    background-color: #4F42D8;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
}

.btn-secondary {
    background-color: transparent;
    border: 3px solid #4F42D8;
    color: #4F42D8;
    font-weight: bold;
    text-transform: uppercase;
    min-width: 178px;
}

</style>