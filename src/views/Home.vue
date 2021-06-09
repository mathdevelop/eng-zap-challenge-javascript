<template>
    <section class="home">
        <div class="home__links">
            <router-link class="home__link home__link--viva" to="/catalog/viva-real"><VivaRealLogo /></router-link>
            <router-link class="home__link home__link--zap" to="/catalog/zap-imoveis"><ZapImoveisLogo /></router-link>
        </div>
    </section>
</template>

<script>
    import VivaRealLogo from '@/assets/svg/viva-real.svg?inline';
    import ZapImoveisLogo from '@/assets/svg/zap-imoveis.svg?inline';

    export default {
        name: 'Home',
        components: {
            VivaRealLogo,
            ZapImoveisLogo
        }
    };
</script>

<style scoped lang="scss">
    .home {
        &__links {
            display: flex;

            .home__link {
                display: flex;
            }
        }
    }
    
    @media (max-width: 767px) {
        .home {
            &__links {
                flex-wrap: wrap;
                padding: 0 40px;

                .home__link {
                    justify-content: center;
                    flex-basis: 100%;
                    margin-top: 15px;
                    padding: 15px 0;
                    border-radius: 15px;
                    background-color: #c8d419;

                    svg {
                        height: 30px;
                    }
                }
            }
        }
    }

    @media (min-width: 768px) {
        .home {
            height: 100%;

            &__links {
                height: 100%;

                .home__link {
                    align-items: center;
                    justify-content: center;
                    flex-basis: 50%;
                    filter: grayscale(1);
                    transition: filter 0.5s;

                    &:hover {
                        filter: grayscale(0);
                    }

                    &--viva {
                        background-image: url(~@/assets/sao-paulo.jpg);
                    }

                    &--zap {
                        background-image: url(~@/assets/rio-de-janeiro.jpg);
                    }
                }

                svg {
                    width: 300px;
                    height: 300px;
                }
            }
        }
    }
</style>