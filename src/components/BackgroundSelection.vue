<template>
    <div>
        <div class="flex flex-col items-center">
            <Carousel class="relative w-full outline-none" :opts="{ align: 'start', }">
                <CarouselContent>
                    <CarouselItem v-for="(_, index) in patternBackgrounds" :key="index" class="basis-7/12 sm:basis-1/3">
                        <div
                            class="p-1 flex h-64 items-center justify-center cursor-pointer rounded-lg dark:invert"
                            :class="background === patternBackgrounds[index] ? 'border-2 border-primary-600 dark:border-[#d4789e]' : ''"
                            @click="setBackground($event, 'pattern')"
                        >
                            <img :src="patternBackgrounds[index]" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
        <div class="flex flex-col items-center outline-none">
            <Carousel class="relative w-full" :opts="{ align: 'start', }">
                <CarouselContent>
                    <CarouselItem v-for="(_, index) in imageBackgrounds" :key="index" class="basis-7/12 sm:basis-1/3">
                        <div
                            class="p-1 flex h-64 items-center justify-center cursor-pointer rounded-lg"
                            :class="background === imageBackgrounds[index] ? 'border-2 border-primary-600' : ''"
                            @click="setBackground($event, 'image')"
                        >
                            <img :src="imageBackgrounds[index]" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    </div>
</template>

<script setup>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const imageBackgrounds = [
    '/img/backgrounds/bg_i_01.jpg',
    '/img/backgrounds/bg_i_02.jpg',
    '/img/backgrounds/bg_i_03.jpg',
    '/img/backgrounds/bg_i_04.jpg',
];
const patternBackgrounds = [
    '/img/backgrounds/bg_p_01.svg',
    '/img/backgrounds/bg_p_02.svg',
    '/img/backgrounds/bg_p_03.svg',
    '/img/backgrounds/bg_p_04.svg',
    '/img/backgrounds/bg_p_05.svg',
    '/img/backgrounds/bg_p_06.svg',
];
</script>

<script>
export default {
    name: 'BackgroundSelection',
    data() {
        return {
            currentBackground: JSON.parse(localStorage.getItem('imageUrl')).backgroundImage || '/img/backgrounds/bg_p_01.svg',
        };
    },
    methods: {
        setBackground(e, type) {
            const url = e.target.src;
            this.currentBackground = url;
            localStorage.setItem('imageUrl', JSON.stringify({
                backgroundImage: url,
                type: type,
            }));
        },
    },
    computed: {
        background() {
            return this.currentBackground.replace(window.location.origin, '');
        },
    },
};
</script>