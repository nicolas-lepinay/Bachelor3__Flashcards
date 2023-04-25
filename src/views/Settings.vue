<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Gestion</h2>
                <GestionList :baseItems="this.items" @choose="handler"></GestionList>
            </div>
        </Sheet>
    </Wrapper>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import Sheet from '../components/Sheet.vue';
import GestionList from '../components/GestionList.vue';
import data from '../data/data.json'

export default {
    name: 'Settings',
    data() {
        return {
            categories: [],
            themes: [],
            items: []
        }
    },
    mounted() {
            setTimeout(() => {
                this.loadData();
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
            }, 100);
        },
        loadData(){
            let categoryId = this.$route.params.categoryId;
            let themeId = this.$route.params.themeId;

            // GET items

            if(!categoryId && !themeId){
                console.log("categories");
                this.items = JSON.parse(localStorage.getItem('flashcards_categories'));
            }else if(categoryId && !themeId){
                console.log("themes");
                let themes = JSON.parse(localStorage.getItem('flashcards_themes'))
                this.items = themes.filter(theme => theme.category_id === categoryId);
            }else{
                console.log("cards");
                let cards = JSON.parse(localStorage.getItem('flashcards_cards'))
                console.log(cards);
                this.items = cards.filter(card => {
                    console.log(card.theme_id, themeId, card.theme_id == themeId);
                    return card.theme_id == themeId
                });
            }
        }
    },
    components: {
        Wrapper,
        Sheet,
        GestionList,
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