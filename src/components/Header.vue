<template>
    <header class="header">
        <div class="header__logo">
            <router-link to="/"><Logo /></router-link>
        </div>
    </header>
</template>

<script>
    import Logo from '@/assets/svg/grupo-zap.svg?inline';

    export default {
        name: 'Header',
        components: {
            Logo
        }
    };
</script>

<style scoped lang="scss">
    .header {
        padding: 15px 40px;
        box-shadow: rgba(0, 0, 0, .25) 0px 2px 8px 0px;

        &__logo {
            svg {
                height: 40px;
            }
        }
    }

    @media (max-width: 768px) {
        .header {
            &__logo {
                text-align: center;
            }
        }
    }
</style>