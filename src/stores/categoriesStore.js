import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useCategoryStore = defineStore('categories', {
    state: () => {
        return {
            categories:[
                {
                    id: 1,
                    name: "Histoire",
                    icon: "colonne.png"
                },
                {
                    id: 2,
                    name: "Anglais",
                    icon: "united-kingdom.png"
                },
                {
                    id: 3,
                    name: "Culture",
                    icon: "holy-gate.png"
                },
                {
                    id: 4,
                    name: "Géographie",
                    icon: "globe.png"
                },
                {
                    id: 5,
                    name: "Test",
                    icon: "star.png"
                }
            ]
        }
    },
    getters: {
        get() {return (id) => {
            if(typeof(id) != "number") id = parseInt(id);
            return this.categories.find(item => item.id == id)
        }},
        getAll() {return this.categories},
    },
    actions: {
        update(category) {
            let index = this.categories.indexOf(this.categories.find(item => item.id == category.id));
            this.categories[index] = category;
        },
        create(newCategory){
            this.categories.push(newCategory);
        },
        delete(id){
            let index = this.categories.indexOf(this.categories.find(item => item.id == id))
            this.categories.splice(index,1);
        },
    },
    persist: {
      enabled: true
    }
  })