<template>
    <main id="app">
        <Header />
        <router-view/>
    </main>
</template>

<script>
    import Header from './components/Header.vue';

    export default {
        name: 'App',
        components: {
            Header
        }
    };
</script>

<style lang="scss">
    * {
        min-width: 0;
        min-height: 0;
    }

    html,
    body {
        height: 100%;
    }

    body {
        margin: 0;
        line-height: 0;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    #app {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
