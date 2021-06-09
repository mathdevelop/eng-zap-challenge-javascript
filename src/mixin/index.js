const mixin = {
    methods: {
        formatPrice: function(price) {
            return Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(price);
        }
    }
};

export default mixin;