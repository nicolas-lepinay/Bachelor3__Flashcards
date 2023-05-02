<template>
    <Wrapper :color="'primary'">
        <Sheet v-if="this.cards.length > 0" :color="'light'" :height="'85'">
            <div class="px-2 pt-2 text-center pos-relative">
                <button v-if="this.cards.length > 0" class="add-btn add-btn__top" @click="showNewCardModal = true">+ Ajouter</button>
                <h2 class="text-muted fw-500">{{ this.index + 1 }} / {{ this.cards.length }}</h2>
                <Card :card="this.cards[index]" @changeLevel="changeLevel"/>
            </div>
        </Sheet>
        
        <!-- 🚫 AUCUNE CARTE DISPONIBLE -->
        <ModalSheet v-if="this.cards.length == 0 && !showAllClearModal"
            :height="'80'"
            :backdrop="'none'"
        >
            <div class="container">
                <h1 class="fs-48">🤡</h1>
                <h2 class="fs-32">Oops...</h2>
                <p>Aucune carte n'est disponible pour ce thème. Des cartes peuvent être ajoutées dans le menu <span class="highlight" @click="this.$router.push(`/settings`)">Gestion</span> ou en cliquant sur le bouton ci-dessous.</p>
                <button
                    class="btn mt-4"
                    @click="showNewCardModal = true"
                >
                    Ajouter une carte
                </button>

                <button
                    class="btn btn-secondary mt-2"
                    @click="this.$router.push(`/`)"
                >
                    Retour
                </button>
            </div>
        </ModalSheet>

        <!-- ➕ AJOUTER UNE NOUVELLE CARTE -->
        <ModalSheet 
            :height="'45'"
            v-if="showNewCardModal" 
            @close="showNewCardModal = false"
        >
            <p class="fs-19 fw-800">Ajouter une carte</p>

            <input v-model="card_question" placeholder="Insérer la question..." class="my-1" />
            <input v-model="card_answer" placeholder="Insérer la réponse..." class="my-1" />

            <button 
                class="btn my-2" 
                :class="{ inactive: this.card_question === '' || this.card_answer === '' }"
                @click="addCard"
            >
                Confirmer
            </button>
        </ModalSheet>

        <!-- 🎉 ÉCRAN DE FÉLICITATIONS -->
        <ModalSheet 
            :height="'60'"
            v-if="showModal" 
        >
            <div class="container">
                <h1 class="fs-48">🎉</h1>
                <h2 class="fs-32">Félicitations !</h2>
                <p>Vous avez terminé vos révisions de <span class="link" @click="this.$router.push(`/${this.category.id}`)">{{ this.category.name }}</span> › {{ this.theme.name }}</p>
                <button
                    class="btn mt-3"
                    @click="this.$router.push(`/`)"
                >
                    Retour
                </button>
            </div>
        </ModalSheet>

        <!-- ÉCRAN DE DÉJA RÉVISÉ -->
        <ModalSheet 
            :height="'80'"
            v-if="showAllClearModal" 
        >
            <div class="container">
                <h1 class="fs-48">⏱️</h1>
                <h2 class="fs-32">C'est fini !</h2>
                <p>Vous n'avez plus de révisions prévues aujourd'hui pour le thème <strong>{{ this.theme.name }}</strong>.</p>
                <button
                    class="btn mt-3"
                    @click="this.$router.push(`/`)"
                >
                    Retour
                </button>
            </div>
        </ModalSheet>
    </Wrapper>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import Sheet from '../components/Sheet.vue';
import Card from '../components/Card.vue';
import ModalSheet from '../components/ModalSheet.vue';

import data from '../data/data.json'

export default {
    name: 'Cards',
    data() {
        return {
            cards: data.cards,
            index: 0,
            showModal: false,
            showNewCardModal: false,
            showAllClearModal: false,
            card_question: '',
            card_answer: '',
            category: {},
            theme: {}
        }
    },
    mounted() {
        // GET ALL CARDS
        let cards = localStorage.getItem('flashcards_cards');
        if(!cards) {
            localStorage.setItem('flashcards_cards', JSON.stringify(this.cards));
            cards = localStorage.getItem('flashcards_cards');
        }

        let finished = false;
        this.cards = JSON.parse(cards).filter((card) => {
            if(card.theme_id !== this.$route.params.themeId) return false;

            let today = new Date().setHours(0, 0, 0, 0);
            let date = new Date(card.date).setHours(0, 0, 0, 0);
            let days = parseInt(card.level);

            if(days == -1){
                return true;
            }else if(date + days + 1 >= today){
                return true;
            }else {
                finished = true;
                return false;
            }
        });
        this.showAllClearModal = finished;

        // SET CURRENT THEME NAME
        let themeId = this.$route.params.themeId;
        const themes = localStorage.getItem('flashcards_themes');
        const theme = JSON.parse(themes).filter(theme => theme.id === themeId)[0];
        this.theme = theme;

        // SET CURRENT CATEGORY NAME
        let categoryId = this.$route.params.categoryId;
        const categories = localStorage.getItem('flashcards_categories');
        const category = JSON.parse(categories).filter(cat => cat.id === categoryId)[0];
        this.category = category;
    },
    methods: {
        next: function() {
            setTimeout(() => {
                if(this.index < this.cards.length - 1) {
                    this.index = this.index + 1; // Passe à la carte suivante
                } else {
                    this.showModal = true; // Affiche la modal de success
                }
            }, "300");
        },
        addCard: function() {
            let themeId = this.$route.params.themeId;
            this.appendCard(themeId);
            this.card_question = "";
            this.card_answer = "";
            this.showNewCardModal = false;
        },
        appendCard(themeId){
            let newCard = {
                "id": `${Date.now()}`,
                "theme_id": `${themeId}`,
                "question": this.card_question,
                "answer": this.card_answer,
                "date": "",
                "level": -1,
                "image": "X.png"
            }
            
            let cards = localStorage.getItem('flashcards_cards');
            this.cards = JSON.parse(cards);
            cards = JSON.parse(cards);
            for (const item of cards)
                if(newCard.id <= parseInt(item.id))
                    newCard.id = parseInt(item.id) + 1;
                    
            cards.push(newCard);
            console.log(cards);

            this.cards = cards.filter(card => card.theme_id === this.$route.params.themeId);
            let json = JSON.stringify(cards);
            localStorage.setItem('flashcards_cards', json);
        },
        changeLevel(validate){
            let baseCards = JSON.parse(localStorage.getItem('flashcards_cards'));
            let actualCard = baseCards.find(card => card.id == this.cards[this.index].id)
            let index = baseCards.indexOf(actualCard);

            if(validate){
                if(baseCards[index].level == -1)
                    baseCards[index].level = 1
                else
                    baseCards[index].level = baseCards[index].level + 1;
            }else{
                baseCards[index].level = 0;
            }
            baseCards[index].date = `${Date.now()}`;
            
            let json = JSON.stringify(baseCards);
            localStorage.setItem('flashcards_cards', json);
            this.next();
        }
    },
    computed:{
        nextable: {
            get() {
                return this.index < this.cards.length - 1;
            }
        },
    },
    components: {
        Wrapper,
        Sheet,
        Card,
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
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
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