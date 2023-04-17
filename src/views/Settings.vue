<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Options</h2>


            </div>
        </Sheet>
    </Wrapper>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import Sheet from '../components/Sheet.vue';
import data from '../data/data.json'

export default {
    name: 'Settings',
    data() {
        return {
            categories: data.categories,
        }
    },
    mounted() {
        // GET CATEGORIES
        const categories = localStorage.getItem('flashcards_categories');
        if(!categories) {
            localStorage.setItem('flashcards_categories', JSON.stringify(this.categories));
            categories = localStorage.getItem('flashcards_categories');
        }
        this.categories = JSON.parse(categories);
    },
    methods: {

    },
    components: {
        Wrapper,
        Sheet,
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