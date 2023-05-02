<template>
    <div class="list-container">
        <div 
            v-for="item in items" 
            v-bind:key="item.id" 
            @click="go(item.id)">
            <img class="item-icon" v-if="item.icon" :src="require(`../assets/icons/${item.icon}`)"/>
            <p>{{ item.name ? item.name : item.question }}</p>
            <div class="actions">
                <button class="action-btn mr-1" @click="action($event, item.id)">
                    <img src="../assets/icons/edit.png"/>
                </button>
                <button class="action-btn del" @click="action($event, item.id)">
                    <img class="del" src="../assets/icons/trash.png"/>
                </button>
            </div>
        </div>
    </div>
    
    <!--  -->
</template>

<script>

export default {
    name: 'GestionList',
    props: ["baseItems"],
    data() {
        return {
            actionState: false
        }
    },
    methods: {
        go: function(itemId) {
            if(this.actionState) return;
            let categoryId = this.$route.params.categoryId;
            let themeId = this.$route.params.themeId;
            if(!categoryId || !themeId)
                this.$emit('choose', itemId)
        },
        action(ev, id) {
            this.actionState = true
            ev.preventDefault();
            this.$emit('toEdit', !ev.target.classList.contains("del"), id)
            setTimeout(() => {
                this.actionState = false
            }, 250);
        }
    },
    computed: {
        items(){
            let tab = this.baseItems.map((item) => {
                return item;
            })
            return tab
        }
    }
}
</script>

<style lang="scss" scoped>
    .list-container{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        // background-color: blue;
        gap: 15px;
    }
    .list-container > * {
        width: 100%;
        height: 75px;
        background-color: rgba(245, 245, 245, 1); // Default color
        border-radius: 15px;
        margin: 0;
        width: 100%;
        white-space: normal; 
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem
    }
    .list-container p {
        width: 100%;
        padding: 0 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: "...";
    }

    .item-icon {
        height: 40px;
        width: 40px;
        padding: 0;
        margin: 0;
    }

    button > img {
        height: 20px;
        opacity: 0.6;
        width: 20px;
    }
    
    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    .action-btn {
        /* background: linear-gradient(to top, #ceff08 0%, #ffdd99 100%); */
        background: transparent;
        border: none;
        border-radius: 100px;
        color: ivory;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        height: 40px;
        width: 40px;
        outline: none;
        text-transform: uppercase;
        z-index: 1;
    }
    .action-btn.del {
        /* background: linear-gradient(to top, #ff0844 0%, #ffb199 100%); */
    }
</style>