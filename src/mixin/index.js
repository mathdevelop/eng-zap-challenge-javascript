import imageError from '@/assets/image-error.jpg';

const mixin = {
    methods: {
        formatPrice: function(price) {
            return Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(price);
        },
        changeImage: function(event) {
            event.target.src = imageError;
        }
    }
};

export default mixin;