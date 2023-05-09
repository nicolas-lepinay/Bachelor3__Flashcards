import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useCardStore = defineStore('cards', {
    state: () => {
        return {
            cards:[
                {
                    id: "11_1",
                    theme_id: 11,
                    question: "En quelle année a débuté la Seconde Guerre Mondiale ?",
                    answer: "1939",
                    date: "",
                    level: -1,
                    image: "X.png"
                },
                {
                    id: "11_2",
                    theme_id: 11,
                    question: "Quel est le nom de l'opération militaire ayant conduit à l'invasion de l'URSS par le IIIème Reich ?",
                    answer: "Opération Barbarossa",
                    date: "",
                    level: -1,
                    image: "X.png"
                },
                {
                    id: "12_1",
                    theme_id: 12,
                    question: "En quelle année a eu lieu la bataille de Waterloo ?",
                    answer: "1815",
                    date: "",
                    level: -1,
                    image: "X.png"
                },
                {
                    id: "12_2",
                    theme_id: 12,
                    question: "Quel est le nom de l'égyptologue français ayant déchiffré les hiéroglyphes grâce à la pierre de Rosette ?",
                    answer: "Jean-François Champollion",
                    date: "",
                    level: -1,
                    image: "X.png"
                },
                {
                    id: "12_3",
                    theme_id: 12,
                    question: "À quelle occasion et en quelle année la Tour Eiffel a-t-elle été construite ?",
                    answer: "L'exposition universelle de 1899",
                    date: "",
                    level: -1,
                    image: "X.png"
                },
                {
                    id: "22_1",
                    theme_id: 22,
                    question: "ENG",
                    answer: "ENG",
                    date: "",
                    level: -1,
                    image: "X.png"
                }
            ]
        }
    },
    getters: {
        get() {return (id) => this.cards.find(item => item.id == id)},
        getByTheme() {return (id) => {
            if(typeof(id) != "number") id = parseInt(id);
            return this.cards.filter(item => item.theme_id == id)
        }},
        getAll(){return this.cards}
    },
    actions: {
        update(card) {
            let index = this.cards.indexOf(this.cards.find(item => item.id == card.id));
            this.cards[index] = card;
        },
        create(newCard){
            this.cards.push(newCard);
        },
        delete(id){
            let index = this.cards.indexOf(this.cards.find(item => item.id == id))
            this.cards.splice(index,1);
        },
        deleteByTheme(id){
            for (let index = this.cards.length-1 ; index >= 0; index--) {
                let item = this.cards[index];
                if(item.theme_id == id) this.cards.splice(index, 1);
            }
        }
    },
    persist: {
      enabled: true
    }
  })