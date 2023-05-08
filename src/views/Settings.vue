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
                editItem: {}
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
                console.log("handle");
                let categoryId = this.$route.params.categoryId;
                let themeId = this.$route.params.themeId;

                if(!categoryId && !themeId){
                    this.$router.push(`/settings/${itemId}`) 
                }else if(categoryId && !themeId){
                    this.$router.push(`/settings/${categoryId}/${itemId}`) 
                }else{
                    this.$router.push(`/settings/${categoryId}/${themeId}/${itemId}`) 
                }

                setTimeout(() => {
                    this.loadData();
                    this.updateVars();
                }, 100);
            },
            loadData(){
                let categoryId = this.$route.params.categoryId;
                let themeId = this.$route.params.themeId;

                // GET items
                if(!categoryId && !themeId){
                    this.items = JSON.parse(localStorage.getItem('flashcards_categories'));

                }else if(categoryId && !themeId){
                    let themes = JSON.parse(localStorage.getItem('flashcards_themes'))
                    this.items = themes.filter(theme => theme.category_id === categoryId);

                }else{
                    let cards = JSON.parse(localStorage.getItem('flashcards_cards'))
                    this.items = cards.filter(card => {
                        return card.theme_id == themeId
                    });
                }
            },
            updateVars(){
                let categoryId = this.$route.params.categoryId;
                let themeId = this.$route.params.themeId;

                // GET items

                if(!categoryId && !themeId){
                    this.placeholder = "Nom de la catégorie";
                    this.modalTitle = "une catégorie";
                }else if(categoryId && !themeId){
                    this.placeholder = "Nom du thème";
                    this.modalTitle = "un thème";
                }
            },
            handlerAction(toEdit, id) {
                let categoryId = this.$route.params.categoryId;
                let themeId = this.$route.params.themeId;
                let type = !categoryId && !themeId ? 
                    "categories" : categoryId && !themeId ? 
                        "themes" : "cards"; 

                this.actionTitle = toEdit ? "Modifier" : "Ajouter";
                                
                if(type == "cards" && toEdit){
                    this.showEditCardModal = true
                    this.editItem = this.items.find((item) => item.id == id)
                }else if(toEdit){
                    this.showEditModal = true
                    this.editItem = this.items.find((item) => item.id == id)
                }else{
                    
                    let baseItems = JSON.parse(localStorage.getItem(`flashcards_${type}`));
                    let index = baseItems.indexOf(
                        baseItems.find(item =>{ 
                            return item.id == id
                        })
                    );
                    baseItems.splice(index, 1);

                    localStorage.setItem(`flashcards_${type}`, JSON.stringify(baseItems));

                    if(type == "categories"){
                        let themes = JSON.parse(localStorage.getItem(`flashcards_themes`));
                        
                        for (let index = themes.length - 1; index >= 0 ; index--) {
                            let theme = themes[index];
                            if(theme.category_id == id) {
                                themes.splice(index, 1);

                                let cards = JSON.parse(localStorage.getItem(`flashcards_cards`));
                                
                                for (let index = cards.length - 1; index >= 0 ; index--) {
                                    let card = cards[index];
                                    if(card.theme_id == theme.id) cards.splice(index, 1);
                                }
                                
                                localStorage.setItem(`flashcards_cards`, JSON.stringify(cards));
                            }
                        }
                        console.log("themes - ", themes);
                        localStorage.setItem(`flashcards_themes`, JSON.stringify(themes));
                    }else if(type == "themes"){
                        let cards = JSON.parse(localStorage.getItem(`flashcards_cards`));
                        
                        for (let index = cards.length - 1; index >= 0 ; index--) {
                            let card = cards[index];
                            if(card.theme_id == id) cards.splice(index, 1);
                        }

                        localStorage.setItem(`flashcards_cards`, JSON.stringify(cards));
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
                    let categoryId = this.$route.params.categoryId;
                    let themeId = this.$route.params.themeId;
                    let type = !categoryId && !themeId ? 
                        "categories" : categoryId && !themeId ? 
                            "themes" : "cards";
                    
                    let baseItems = JSON.parse(localStorage.getItem(`flashcards_${type}`));
    
                    let index = baseItems.indexOf(
                        baseItems.find(item =>{ 
                            return item.id == this.editItem.id
                        })
                    );
                        
                    baseItems[index] = this.editItem;
                    this.items = baseItems;
    
                    localStorage.setItem(`flashcards_${type}`, JSON.stringify(baseItems));
                }
                setTimeout(() => {
                    this.showEditModal = false;
                    this.showEditCardModal = false;
                    this.loadData();
                    this.updateVars();
                }, 100);
            },
            createItem(){
                let categoryId = this.$route.params.categoryId;
                let themeId = this.$route.params.themeId;
                let type = !categoryId && !themeId ? 
                    "categories" : categoryId && !themeId ? 
                        "themes" : "cards"; 

                this.editItem = {};
                this.actionTitle = "Créer"
                if(type == "cards")
                    this.showEditCardModal = true;
                else
                    this.showEditModal = true;
            },
            appendItem(){
                let categoryId = this.$route.params.categoryId;
                let themeId = this.$route.params.themeId;
                let type = !categoryId && !themeId ? 
                    "categories" : categoryId && !themeId ? 
                        "themes" : "cards";
                
                console.log(this.editItem);
                let baseItems = JSON.parse(localStorage.getItem(`flashcards_${type}`));
                this.editItem.id = Date.now();
                if(type != "cards") this.editItem.icon = "star.png";

                if(type == "themes"){
                    this.editItem.category_id = categoryId;
                }else if(type == "cards"){
                    this.editItem.theme_id = themeId;
                }
                console.log(this.editItem);

                baseItems.push(this.editItem)
                localStorage.setItem(`flashcards_${type}`, JSON.stringify(baseItems));

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