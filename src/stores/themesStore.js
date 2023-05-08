import { defineStore } from 'pinia'
import { useCardStore } from './cardsStore';

const cardStore = useCardStore();

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useThemeStore = defineStore('themes', {
    state: () => {
        return {
            themes:[
                {
                    id: 11,
                    category_id: "1",
                    name: "Seconde Guerre Mondiale",
                    icon: "paratrooper.png"
                },
                {
                    id: 12,
                    category_id: "1",
                    name: "XIXème siècle",
                    icon: "horse.png"
                },
                {
                    id: 22,
                    category_id: "2",
                    name: "Vocabulaire",
                    icon: "dictionary.png"
                },
                {
                    id: 23,
                    category_id: "2",
                    name: "Grammaire",
                    icon: "eng.png"
                },
                {
                    id: 33,
                    category_id: "3",
                    name: "Culture européenne",
                    icon: "euro-union.png"
                },
                {
                    id: 44,
                    category_id: "4",
                    name: "Europe",
                    icon: "europe.png"
                }
            ]
        }
    },
    getters: {
        get() {return (id) => {
            if(typeof(id) != "number") id = parseInt(id);
            return this.themes.find(item => item.id == id)
        }},
        getByCategory() {return (id) => {
            if(typeof(id) != "number") id = parseInt(id);
            return this.themes.filter(item => item.category_id == id)
        }},
        getAll() {
            return this.themes;
        }
    },
    actions: {
        update(theme) {
            let index = this.themes.indexOf(this.themes.find(item => item.id == theme.id));
            this.themes[index] = theme;
        },
        create(newTheme){
            this.themes.push(newTheme);
        },
        delete(id){
            let index = this.themes.indexOf(this.themes.find(item => item.id == id))
            this.themes.splice(index,1);
        },
        deleteByCategory(id){
            for (let index = this.themes.length-1 ; index >= 0; index--) {
                let item = this.themes[index];
                if(item.category_id == id) {
                    console.log("delete");
                    this.themes.splice(index, 1);
                    cardStore.deleteByTheme(item.id)
                }
            }
        }
    },
    persist: {
      enabled: true
    }
  })