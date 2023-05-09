<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Gestion</h2>
                <GestionList :baseItems="this.items" @choose="handler" @toEdit="handlerAction"></GestionList>
            </div>
            <button class="add-btn" @click="createItem()">+</button>
        </Sheet>

        <ModalSheet 
            :height="'35'"
            v-if="showAddModal" 
            @close="showAddModal = false"
        >
            <p class="fs-19 fw-800">{{ modalTitle }}</p>

            <input v-model="item_name" :placeholder=placeholder class="my-1" />

            <button 
                class="btn my-2" 
                :class="{ inactive: this.item_name === ''}"
                @click="addItem"
            >
                Confirmer
            </button>
        </ModalSheet>
        <ModalSheet 
            :height="'35'"
            v-if="showEditModal" 
            @close="showEditModal = false"
        >
            <p class="fs-19 fw-800">{{ actionTitle }} {{ modalTitle }}</p>

            <input v-model="editItem.name" :placeholder=placeholder class="my-1" />

            <button 
                class="btn my-2" 
                :class="{ inactive: editItem.name === ''}"
                @click="editItemFn"
            >
                Confirmer
            </button>
        </ModalSheet>
        <ModalSheet 
            :height="'45'"
            v-if="showEditCardModal" 
            @close="showEditCardModal = false"
        >
            <p class="fs-19 fw-800">{{ actionTitle }} une carte</p>

            <input v-model="editItem.question" placeholder="Insérer la question..." class="my-1" />
            <input v-model="editItem.answer" placeholder="Insérer la réponse..." class="my-1" />

            <button 
                class="btn my-2" 
                :class="{ inactive: editItem.name === ''}"
                @click="editItemFn"
            >
                Confirmer
            </button>
        </ModalSheet>
    </Wrapper>
</template>

<script>
    import Wrapper from '../components/Wrapper.vue';
    import Sheet from '../components/Sheet.vue';
    import GestionList from '../components/GestionList.vue';
    import ModalSheet from '../components/ModalSheet.vue';
    import { useCategoryStore } from '@/stores/categoriesStore';
    import { useThemeStore } from '@/stores/themesStore';
    import { useCardStore } from '@/stores/cardsStore';

    const categoryStore = useCategoryStore();
    const themeStore = useThemeStore();
    const cardStore = useCardStore();

    export default {
        name: 'Settings',
        data() {
            return {
                categories: [],
                themes: [],
                items: [],
                item_name: "",
                page: "la catégorie",
                showAddModal: false,
                showEditModal: false,
                showEditCardModal: false,
                placeholder: "Nom de la catégorie",
                modalTitle: "une catégorie", 
                actionTitle: "Ajouter",
                editItem: {},
                categoryId: "",
                themeId: ""
            } 
        },
        mounted() { 
            setTimeout(() => {
                this.loadData();
                this.updateVars();
            }, 250);
        },
        methods: {
            handler(itemId) {
                if(!this.categoryId && !this.themeId){
                    this.$router.push(`/settings/${itemId}`) 
                }else if(this.categoryId && !this.themeId){
                    this.$router.push(`/settings/${this.categoryId}/${itemId}`) 
                }else{
                    this.$router.push(`/settings/${this.categoryId}/${this.themeId}/${itemId}`) 
                }

                setTimeout(() => {
                    this.loadData();
                    this.updateVars();
                }, 100);
            },
            loadData(){
                this.categoryId = this.$route.params.categoryId;
                this.themeId = this.$route.params.themeId;

                // GET items
                if(!this.categoryId && !this.themeId){
                    this.items = categoryStore.getAll;
                }else if(this.categoryId && !this.themeId){
                    this.items = themeStore.getByCategory(this.categoryId);
                }else{
                    this.items = cardStore.getByTheme(this.themeId);
                }
            },
            updateVars(){
                // SET variables
                if(!this.categoryId && !this.themeId){
                    this.placeholder = "Nom de la catégorie";
                    this.modalTitle = "une catégorie";
                }else if(this.categoryId && !this.themeId){
                    this.placeholder = "Nom du thème";
                    this.modalTitle = "un thème";
                }
            },
            handlerAction(toEdit, id) {
                console.log(toEdit, id);
                let type = !this.categoryId && !this.themeId ? 
                    "categories" : this.categoryId && !this.themeId ? 
                        "themes" : "cards"; 

                this.actionTitle = toEdit ? "Modifier" : "Ajouter";
                                
                if(type == "cards" && toEdit){
                    this.showEditCardModal = true
                    this.editItem = this.items.find((item) => item.id == id)
                }else if(toEdit){
                    this.showEditModal = true
                    this.editItem = this.items.find((item) => item.id == id)
                }else{
                    switch (type) {
                        case "categories":
                            themeStore.deleteByCategory(id);
                            categoryStore.delete(id);
                            break;
                        case "themes":
                            cardStore.deleteByTheme(id)
                            themeStore.delete(id);
                            break;
                        case "cards":
                            cardStore.delete(id);
                            break;
                    
                        default:
                            break;
                    }
                }
                

                setTimeout(() => {
                    this.loadData();
                    this.updateVars();
                }, 100);
            },
            editItemFn() {
                if(!this.editItem.id) this.appendItem()
                else{
                    let type = !this.categoryId && !this.themeId ? 
                        "categories" : this.categoryId && !this.themeId ? 
                            "themes" : "cards";
                    
                    switch (type) {
                        case "categories":
                            categoryStore.update(this.editItem);
                            break;
                        case "themes":
                            themeStore.update(this.editItem);
                            break;
                        case "cards":
                            cardStore.update(this.editItem);
                            break;
                    
                        default:
                            break;
                    }
                }
                setTimeout(() => {
                    this.showEditModal = false;
                    this.showEditCardModal = false;
                    this.loadData();
                    this.updateVars();
                }, 100);
            },
            createItem(){
                let type = !this.categoryId && !this.themeId ? 
                    "categories" : this.categoryId && !this.themeId ? 
                        "themes" : "cards"; 

                this.editItem = {};
                this.actionTitle = "Créer"
                if(type == "cards")
                    this.showEditCardModal = true;
                else
                    this.showEditModal = true;
            },
            appendItem(){
                let type = !this.categoryId && !this.themeId ? 
                    "categories" : this.categoryId && !this.themeId ? 
                        "themes" : "cards";
                
                this.editItem.id = Date.now();
                
                switch (type) {
                        case "categories":
                            this.editItem.icon = "star.png";
                            categoryStore.create(this.editItem);
                            break;
                        case "themes":
                            this.editItem.icon = "star.png";
                            this.editItem.category_id = this.categoryId;
                            themeStore.create(this.editItem);
                            break;
                        case "cards":
                            this.editItem.theme_id = this.themeId;
                            cardStore.create(this.editItem);
                            break;
                    
                        default:
                            break;
                    }
                setTimeout(() => {
                    this.loadData();
                    this.updateVars();
                }, 100);
            }
        },
        components: {
            Wrapper,
            Sheet,
            GestionList,
            ModalSheet,
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

    .add-btn{
        bottom: unset;
        top: 30px;
        right: 30px;
    }
</style>