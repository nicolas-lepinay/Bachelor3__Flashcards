<script>
    import { useCategoryStore } from '@/stores/categoriesStore';
    import { useThemeStore } from '@/stores/themesStore';
    import { useCardStore } from '@/stores/cardsStore';

    const categoryStore = useCategoryStore();
    const themeStore = useThemeStore();
    const cardStore = useCardStore();

    export default {
        name: 'Reset',
        mounted() {
            categoryStore.$reset();
            themeStore.$reset();
            cardStore.$reset();
            this.$router.push("/settings");
        },
    }

</script>