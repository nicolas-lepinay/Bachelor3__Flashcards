<template>
    <Wrapper :color="'primary'" >
        <Sheet :color="'light'" :height="'85'">
            <div class="px-2 pt-3">
                <h2 class="primary fw-600">Je veux réviser...</h2>
                <SquareList :items="categories" class="pt-2"></SquareList>
            </div>
        </Sheet>
    </Wrapper>
</template>

<script>
import Wrapper from '../components/Wrapper.vue';
import Sheet from '../components/Sheet.vue';
import SquareList from '../components/SquareList.vue';
import data from '../data/data.json'

export default {
    name: 'Home',
    data() {
        return {
            categories: data.categories
        }
    },
    mounted() {
        // const categories = localStorage.getItem('flashcards_categories');
        // if(!categories) {
        //     const categoriesData = [

        //     ]
        // }
    },
    components: {
        Wrapper,
        Sheet,
        SquareList
    }
}

</script>