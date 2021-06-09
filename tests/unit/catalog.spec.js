import { mount , createLocalVue } from '@vue/test-utils';
import Catalog from '@/views/Catalog.vue';
import mixin from '@/mixin';

const localVue = createLocalVue();

localVue.mixin(mixin);

describe('Catalog.vue', () => {
    let products,
        $store,
        $route;

    beforeAll(() => {
        products = Array(20).fill().map(() => ({
            address: {
                city: '',
                neighborhood: ''
            },
            bathrooms: 0,
            bedrooms: 0,
            id: '',
            images: ['', ''],
            parkingSpaces: 0,
            pricingInfos: {
                businessType: '',
                price: '',
                rentalTotalPrice: ''
            },
            usableAreas: 0
        }));
    });

    beforeEach(() => {
        $store = {
            state: {
                filteredProducts: {
                    catalog: 'viva-real',
                    items: [products, products]
                }
            }
        };

        $route = {
            params: {
                id: 'viva-real'
            }
        };
    });

    const factory = () => (
        mount(Catalog, {
            mocks: {
                $store,
                $route
            },
            localVue
        })
    );

    it('Should render 20 cards on screen', () => {
        const wrapper = factory();

        expect(wrapper.findAll('.card')).toHaveLength(20);
    });
});