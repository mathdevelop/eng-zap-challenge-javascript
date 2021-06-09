<template>
    <div class="card">
        <div class="card__images">
            <Gallery>
                <img v-for="image in product.images" :key="image" :src="env === 'production' ? withoutSSL : image" @error="changeImage">
            </Gallery>
        </div>
        <div class="card__details">
            <div class="card__business-type">{{ product.pricingInfos.businessType === 'SALE' ? 'COMPRAR' : 'ALUGAR' }}</div>
            <div class="card__link">
                <router-link :to="{ name: 'product', params: { id: product.id } }">
                    <span>{{ product.address.neighborhood + ' - ' + product.address.city }}</span>
                </router-link>
            </div>
            <div class="card__price">{{ product.pricingInfos.businessType === 'SALE' ? formatPrice(product.pricingInfos.price) : formatPrice(product.pricingInfos.rentalTotalPrice) }}</div>
            <div class="card__features">
                <div class="card__column card__column--left">
                    <span class="card__usable-areas">{{ product.usableAreas }} m²</span>
                    <span class="card__bathrooms">{{ product.bathrooms }} banheiro(s)</span>
                </div>
                <div class="card__column card__column--right">
                    <span class="card__bedrooms">{{ product.bedrooms }} quarto(s)</span>
                    <span class="card__parking-spaces">{{ product.parkingSpaces }} vaga(s)</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Gallery from '@/components/Gallery.vue';
    import withoutSSL from '@/assets/without-ssl.jpg';

    export default {
        name: 'Card',
        components: {
            Gallery
        },
        data() {
            return {
                env: process.env.NODE_ENV,
                withoutSSL
            }
        },
        props: ['product']
    };
</script>

<style scoped lang="scss">
    .card {
        position: relative;
        width: 300px;
        margin: 30px;
        border-radius: 15px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .15);
        transition: box-shadow .2s;
        will-change: box-shadow;

        &:hover {
            box-shadow: 0 2px 24px 0 rgba(0, 0, 0, .15);
        }

        &__images {
            img {
                height: 300px;
                border-radius: 15px 15px 0 0;
                object-fit: cover;
            }
        }

        &__details {
            padding: 15px;
            font-family: sans-serif;
            font-size: 12px;
            line-height: 1.5;
            color: #6f6f6f;

            .card {
                &__link {
                    a {
                        font-size: 14px;
                        text-decoration: none;
                        color: #444;

                        &::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            right: 0;
                            bottom: 0;
                        }
                    }
                }

                &__price {
                    font-size: 28px;
                    font-weight: 700;
                    color: #444;
                }

                &__features {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    .card__column {
                        span {
                            display: block;
                        }

                        &--left {
                            text-align: left;
                        }

                        &--right {
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
</style>