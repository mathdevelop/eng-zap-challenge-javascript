<template>
    <div class="gallery">
        <VueSlickCarousel v-bind="settings">
            <slot></slot>
        </VueSlickCarousel>
    </div>
</template>
<script>
    import VueSlickCarousel from 'vue-slick-carousel';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css';

    export default {
        name: 'Gallery',
        components: {
            VueSlickCarousel
        },
        data() {
            return {
                settings: {
                    infinite: true
                }
            }
        }
    }
</script>
<style lang="scss">
    .gallery {
        .slick-arrow {
            position: absolute;
            top: 50%;
            display: block;
            width: 30px;
            height: 30px;
            padding: 0;
            transform: translate(0, -50%);
            border: 1px solid #ececec;
            border-radius: 100%;
            outline: none;
            background-color: #fff;
            font-size: 0;
            line-height: 0;
            cursor: pointer;
            color: transparent;
            z-index: 1;

            &:before {
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                border-right: 3px solid #b4b4b4;
                border-bottom: 3px solid #b4b4b4;
            }
        }

        .slick-prev {
            left: -15px;

            &:before {
                margin-left: 3px;
                transform: rotate(-225deg);
            }
        }

        .slick-next {
            right: -15px;

            &:before {
                margin-right: 3px;
                transform: rotate(-45deg);
            }
        }

        .slick-track {
            display: flex;
        }

        .slick-slide {
            height: auto;

            > div {
                height: 100%;
            }
        }
    }
</style>