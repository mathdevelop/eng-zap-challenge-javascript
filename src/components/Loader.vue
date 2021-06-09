<template>
    <div class="loader">
        <div class="loader__icon loader__icon--search"><SearchIcon /></div>
        <div class="loader__icon loader__icon--loading"><LoadingIcon /></div>
    </div>
</template>

<script>
    import SearchIcon from '@/assets/svg/search.svg?inline';
    import LoadingIcon from '@/assets/svg/loading.svg?inline';

    export default {
        name: 'Loader',
        components: {
            SearchIcon,
            LoadingIcon
        }
    };
</script>

<style scoped lang="scss">
    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
    }
</style>