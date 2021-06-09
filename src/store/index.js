import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    products: [],
    filteredProducts: {
        catalog: '',
        items: []
    }
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_FILTERED_PRODUCTS(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
    }
};

const actions = {
    async getProducts({ commit }) {
        try {
            const { data } = await axios.get(process.env.VUE_APP_ENDPOINT);

            commit('SET_PRODUCTS', data);
        } catch(error) {
            console.error(error);
        }
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});