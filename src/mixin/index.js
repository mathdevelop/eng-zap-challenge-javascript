import image from '@/assets/without-ssl.jpg';

const mixin = {
    methods: {
        formatPrice: function(price) {
            return Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(price);
        },
        changeImage: function(event) {
            event.target.src = image;
        }
    }
};

export default mixin;