<template>
    <section class="catalog">
        <Loader v-if="!products.length" />
        <div class="catalog__content" v-else>
            <div class="catalog__showcase">
                <Card v-for="product in products" :key="product.id" :product="product" />
            </div>
            <div class="catalog__pagination">
                <router-link class="catalog__button catalog__button--previous" v-if="page !== 1" :to="{ params: { page: page - 1 } }"></router-link>
                <span>Página {{ page }}</span>
                <router-link class="catalog__button catalog__button--next" v-if="page !== pages" :to="{ params: { page: page + 1 } }"></router-link>
            </div>
        </div>
    </section>
</template>

<script>
    import Loader from '@/components/Loader.vue';
    import Card from '@/components/Card.vue';

    export default {
        name: 'Catalog',
        components: {
            Loader,
            Card
        },
        created() {
            if(!this.$store.state.filteredProducts.catalog) {
                this.$store.dispatch('getProducts');
            } else if(this.$store.state.filteredProducts.catalog !== this.$route.params.id) {
                this.$store.commit('SET_FILTERED_PRODUCTS', {
                    catalog: '',
                    items: []
                });

                this.filterProducts();
            }
        },
        computed: {
            page() {
                return this.$route.params.page ? parseInt(this.$route.params.page) : 1;
            },
            pages() {
                return this.$store.state.filteredProducts.items.length;
            },
            products() {
                return this.$store.state.filteredProducts.items[this.page - 1] || [];
            }
        },
        watch: {
            '$store.state.products'() {
                this.filterProducts();
            }
        },
        methods: {
            filterProducts: function() {
                const filteredProducts = [],
                      splicedProducts = [];

                if(this.$route.params.id === 'viva-real') {
                    this.$store.state.products.forEach(product => {
                        if(product.address.geoLocation.precision === 'NO_GEOCODE')
                            return;

                        if(product.pricingInfos.businessType === 'SALE') {
                            if(product.pricingInfos.price > process.env.VUE_APP_MAX_SALE_PRICE)
                                return;
                        } else {
                            if(product.pricingInfos.monthlyCondoFee === '0')
                                return;

                            if(product.pricingInfos.monthlyCondoFee >= (product.pricingInfos.rentalTotalPrice * 0.3))
                                return;

                            const lon = product.address.geoLocation.location.lon,
                                  lat = product.address.geoLocation.location.lat;
                            
                            let price = process.env.VUE_APP_MAX_RENTAL_PRICE;
                            
                            if((lon >= process.env.VUE_APP_BB_MIN_LON && lon <= process.env.VUE_APP_BB_MAX_LON) &&
                               (lat >= process.env.VUE_APP_BB_MIN_LAT && lat <= process.env.VUE_APP_BB_MAX_LAT))
                                price += price * process.env.VUE_APP_BB_MAX_PRICE_RULE;

                            if(product.pricingInfos.rentalTotalPrice > price)
                                return;
                        }

                        filteredProducts.push(product);
                    });
                } else {
                    this.$store.state.products.forEach(product => {
                        if(product.address.geoLocation.precision === 'NO_GEOCODE')
                            return;

                        if(product.pricingInfos.businessType === 'SALE') {
                            if(product.usableAreas === 0)
                                return;

                            if((product.pricingInfos.price / product.usableAreas) <= 3500)
                                return;
                            
                            const lon = product.address.geoLocation.location.lon,
                                  lat = product.address.geoLocation.location.lat;

                            let price = process.env.VUE_APP_MIN_SALE_PRICE;
                            
                            if((lon >= process.env.VUE_APP_BB_MIN_LON && lon <= process.env.VUE_APP_BB_MAX_LON) &&
                               (lat >= process.env.VUE_APP_BB_MIN_LAT && lat <= process.env.VUE_APP_BB_MAX_LAT))
                                   price -= price * process.env.VUE_APP_BB_MIN_PRICE_RULE;

                            if(product.pricingInfos.price < price)
                                return;
                        } else {
                            if(product.pricingInfos.rentalTotalPrice < process.env.VUE_APP_MIN_RENTAL_PRICE)
                                return;
                        }

                        filteredProducts.push(product);
                    });
                }

                while(filteredProducts.length) {
                    splicedProducts.push(filteredProducts.splice(0, 20));
                }

                // for(let index = 0; index < filteredProducts.length; index += 20) {
                //     slicedProducts.push(filteredProducts.slice(index, index + 20));
                // }

                this.$store.commit('SET_FILTERED_PRODUCTS', {
                    catalog: this.$route.params.id,
                    items: splicedProducts
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .catalog {
        height: 100%;
        
        &__showcase {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        &__pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px 0;

            span {
                margin: 0 15px;
                font-family: sans-serif;
                color: #6f6f6f;
            }

            .catalog__button {
                width: 30px;
                border: 1px solid #ececec;
                border-radius: 100%;
                line-height: 30px;
                text-align: center;

                &::before {
                    content: '';
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-right: 3px solid #b4b4b4;
                    border-bottom: 3px solid #b4b4b4;
                }

                &--previous {
                    &::before {
                        margin-left: 3px;
                        transform: rotate(-225deg);
                    }
                }

                &--next {
                    &::before {
                        margin-right: 3px;
                        transform: rotate(-45deg);
                    }
                }
            }
        }
    }
</style>