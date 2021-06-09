<template>
    <section class="product">
        <Loader v-if="!product" />
        <div class="product__content" v-else>
            <div class="product__information">
                <div class="product__images">
                    <Gallery>
                        <img v-for="image in product.images" :key="image" :src="env === 'production' ? '@/assets/without_ssl.jpg' : image" @error="changeImage">
                    </Gallery>
                </div>
                <div class="product__details">
                    <div class="product__business-type">{{ product.pricingInfos.businessType === 'SALE' ? 'COMPRAR' : 'ALUGAR' }}</div>
                    <div class="product__address">{{ product.address.neighborhood + ' - ' + product.address.city }}</div>
                    <div class="product__price">{{ product.pricingInfos.businessType === 'SALE' ? formatPrice(product.pricingInfos.price) : formatPrice(product.pricingInfos.rentalTotalPrice) }}</div>
                    <div class="product__features">
                        <ul class="product__list">
                            <li class="product__list-item">
                                <span class="product__list-title">Área construída</span>
                                <span class="product__list-value">{{ product.usableAreas }} m²</span>
                            </li>
                            <li class="product__list-item">
                                <span class="product__list-title">Quarto(s)</span>
                                <span class="product__list-value">{{ product.bedrooms }}</span>
                            </li>
                            <li class="product__list-item">
                                <span class="product__list-title">Banheiro(s)</span>
                                <span class="product__list-value">{{ product.bathrooms }}</span>
                            </li>
                            <li class="product__list-item">
                                <span class="product__list-title">Vaga(s)</span>
                                <span class="product__list-value">{{ product.parkingSpaces }}</span>
                            </li>
                            <li class="product__list-item" v-if="product.pricingInfos.hasOwnProperty('monthlyCondoFee') && product.pricingInfos.monthlyCondoFee !== '0'">
                                <span class="product__list-title">Condomínio</span>
                                <span class="product__list-value"><strong>{{ formatPrice(product.pricingInfos.monthlyCondoFee) }}</strong></span>
                            </li>
                            <li class="product__list-item" v-if="product.pricingInfos.businessType === 'RENTAL'">
                                <span class="product__list-title">Preço c/ condomínio</span>
                                <span class="product__list-value"><strong>{{ formatPrice(product.pricingInfos.rentalTotalPrice) }}</strong></span>
                            </li>
                            <li class="product__list-item" v-if="product.pricingInfos.hasOwnProperty('yearlyIptu') && product.pricingInfos.yearlyIptu !== '0'">
                                <span class="product__list-title">IPTU</span>
                                <span class="product__list-value">{{ formatPrice(product.pricingInfos.yearlyIptu) }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loader from '@/components/Loader.vue';
    import Gallery from '@/components/Gallery.vue';

    export default {
        name: 'Product',
        components: {
            Loader,
            Gallery
        },
        data() {
            return {
                product: null,
                env: process.env.NODE_ENV
            }
        },
        created() {
            if(this.$store.state.products.length) {
                this.filterProduct();
            } else {
                this.$store.dispatch('getProducts');
            }
        },
        watch: {
            '$store.state.products'() {
                this.filterProduct();
            }
        },
        methods: {
            filterProduct: function() {
                this.product = this.$store.state.products.find(product => product.id === this.$route.params.id);
            }
        }
    };
</script>

<style scoped lang="scss">
    .product {
        height: 100%;

        &__content {
            padding: 30px;
        }

        &__information {
            .product {
                &__images {
                    img {
                        height: 100%;
                    }
                }

                &__details {
                    padding: 15px;
                    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, .15);
                    font-family: sans-serif;
                    font-size: 12px;
                    line-height: 1.5;
                    color: #6f6f6f;

                    .product {
                        &__address {
                            font-size: 14px;
                            color: #444;
                        }

                        &__price {
                            font-size: 28px;
                            font-weight: 700;
                            line-height: 2;
                            color: #444;
                        }

                        &__features {
                            border: 1px solid #d8d8d8;
                            border-radius: 5px;
                            font-size: 14px;

                            .product__list {
                                padding: 15px;

                                &-item {
                                    display: flex;
                                    justify-content: space-between;
                                }

                                &-value {
                                    strong {
                                        color: #212121;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 767px) {
        .product {
            &__information {
                .product__images {
                    margin-bottom: 30px;
                }
            }
        }
    }

    @media (min-width: 768px) {
        .product {
            &__information {
                display: flex;

                .product {
                    &__images {
                        flex-basis: 50%;
                        margin-right: 15px;
                    }

                    &__details {
                        flex-basis: 50%;
                        margin-left: 15px;

                        .product__features  {
                            width: 300px;
                        }
                    }
                }
            }
        }
    }
</style>