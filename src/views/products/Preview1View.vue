<script setup>
    import axios from '@/axios.js';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import EloIcon from '@/icons/EloIcon.svg';
    import AmexIcon from '@/icons/AmexIcon.svg';
    import VisaIcon from '@/icons/VisaIcon.svg';
    import HiperCardIcon from '@/icons/HiperCardIcon.svg';
    import MasterCardIcon from '@/icons/MasterCardIcon.svg';
    import ProductFooter from '@/components/ProductFooter.vue';
    import ProductHeader from '@/components/ProductHeader.vue';
    import { StarIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
    import { ChevronLeftIcon, ChevronRightIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';

    const route = useRoute();

    const data = ref(null);
    const currentImage = ref(0);

    function previousImage() {
        if (currentImage.value > 0) {
            currentImage.value--;
        } else {
            currentImage.value = data.value.images.details.length - 1;
        }
    }

    function nextImage() {
        if (currentImage.value < data.value.images.details.length - 1) {
            currentImage.value++;
        } else {
            currentImage.value = 0;
        }
    }

    onMounted(() => {
        axios.get('/products/' + route.params.slug)
            .then(response => {
                data.value = response.data.data;

                setInterval(nextImage, 5000);
            });
    });
</script>

<template>
    <div v-if="data" class="w-full max-w-screen-sm min-h-screen flex flex-col justify-start items-center mx-auto">
        <ProductHeader :data="{ ...data['header'], 'images': data['images']['header'] }" class="mb-10" />

        <section class="w-full px-3 mb-10">
            <img :src="data.images.details[currentImage]" :alt="'Image ' + currentImage" class="object-cover w-auto max-h-96 rounded-2xl border shadow mx-auto">

            <div class="flex justify-between items-center mt-4">
                <ChevronLeftIcon class="w-6 h-6 cursor-pointer" @click="previousImage()" />

                <div class="flex justify-center items-center gap-2">
                    <span v-for="(image, index) in data.images.details" :key="index" class="border-b-4 block w-5" :class="{ 'border-black': index == currentImage }"></span>
                </div>

                <ChevronRightIcon class="w-6 h-6 cursor-pointer" @click="nextImage()" />
            </div>
        </section>

        <section class="w-full px-3 mb-10">
            <h1 class="text-lg font-medium mb-2">{{ data.details.name }}</h1>

            <div class="flex justify-start items-end mb-4">
                <StarIcon class="w-6 h-6 fill-[#FFD700]" />
                <StarIcon class="w-6 h-6 fill-[#FFD700]" />
                <StarIcon class="w-6 h-6 fill-[#FFD700]" />
                <StarIcon class="w-6 h-6 fill-[#FFD700]" />
                <StarIcon class="w-6 h-6 fill-[#FFD700]" />

                <span class="text-sm ml-1">(5.0/5.0)</span>
            </div>

            <h1 class="text-2xl font-medium mb-4 flex justify-start items-center gap-2">
                {{ data.details.final_price }}

                <span v-if="data.details.original_price" class="text-base line-through font-normal">{{ data.details.original_price }}</span>
            </h1>

            <button class="w-full h-12 rounded-lg flex justify-center items-center gap-2 font-medium shadow" @click="redirectToCheckout()" :style="{ 'backgroundColor': data.details.buy_button.background_color, 'color': data.details.buy_button.text_color }">
                <ShoppingCartIcon class="w-6 h-6 mb-0.5" />

                {{ data.details.buy_button.text }}
            </button>

            <div class="mt-4 flex flex-col justify-center items-center">
                <div class="w-full">
                    <h1 class="bg-[#F6F6F8] text-center p-1 rounded text-xs mb-1">MÉTHODES DE PAYEMENT</h1>

                    <div class="flex justify-center items-center gap-2">
                        <VisaIcon class="w-fit h-auto" />

                        <MasterCardIcon class="w-fit h-auto" />

                        <HiperCardIcon class="w-fit h-auto" />

                        <EloIcon class="w-fit h-auto" />

                        <AmexIcon class="w-fit h-auto" />
                    </div>
                </div>

                <div class="flex justify-start items-center gap-3 border px-2 py-4 rounded w-full">
                    <ShieldCheckIcon class="w-8 h-8" />

                    <p class="text-xs text-[#8F8F8F]">
                        Les paiements et les informations sont sécurisés.

                        <br>

                        Site officiel avec tous droits réservés.
                    </p>
                </div>

                <div class="flex justify-start items-center gap-3 mt-2 border px-2 py-4 rounded w-full">
                    <ShieldCheckIcon class="w-8 h-8" />

                    <p class="text-xs text-[#8F8F8F]">
                        <span class="text-black font-bold">Retours sans frais</span>

                        <br>

                        Remboursement à 100% de votre argent

                        <br>

                        7 jours après réception de la marchandise.
                    </p>
                </div>
            </div>
        </section>

        <section class="w-full px-3 mb-10">
            <div class="border rounded-lg p-3 shadow">
                <h1 class="text-center mb-4">Description</h1>

                <div v-html="data.details.description"></div>
            </div>
        </section>

        <section class="w-full px-3 mb-10">
            <ul class="flex flex-col justify-center items-center gap-5">
                <li v-for="(review, index) in data.details.reviews" :key="index" class="w-full">
                    <div class="bg-slate-50 rounded-2xl py-5 px-6 shadow border">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="fill-[#03BF95] mb-4" :style="{ fill: data.footer.background_color }">
                            <path d="M6.4999 10C6.2769 10 6.0629 10.034 5.8499 10.065C5.9189 9.83303 5.9899 9.59703 6.1039 9.38503C6.2179 9.07703 6.3959 8.81003 6.5729 8.54103C6.7209 8.25003 6.9819 8.05303 7.1739 7.80403C7.3749 7.56203 7.6489 7.40103 7.8659 7.20003C8.0789 6.99003 8.3579 6.88503 8.5799 6.73703C8.8119 6.60403 9.0139 6.45703 9.2299 6.38703L9.7689 6.16503L10.2429 5.96803L9.7579 4.03003L9.1609 4.17403C8.9699 4.22203 8.7369 4.27803 8.4719 4.34503C8.2009 4.39503 7.9119 4.53203 7.5899 4.65703C7.2719 4.79903 6.9039 4.89503 6.5619 5.12303C6.2179 5.34103 5.8209 5.52303 5.4709 5.81503C5.1319 6.11603 4.7229 6.37703 4.4209 6.76003C4.0909 7.11803 3.7649 7.49403 3.5119 7.92203C3.2189 8.33003 3.0199 8.77803 2.8099 9.22103C2.6199 9.66403 2.4669 10.117 2.3419 10.557C2.1049 11.439 1.9989 12.277 1.9579 12.994C1.9239 13.712 1.9439 14.309 1.9859 14.741C2.0009 14.945 2.0289 15.143 2.0489 15.28L2.0739 15.448L2.0999 15.442C2.27776 16.2729 2.6872 17.0364 3.28086 17.6442C3.87452 18.2521 4.62814 18.6794 5.45454 18.8769C6.28094 19.0743 7.14635 19.0337 7.95066 18.7599C8.75496 18.486 9.46531 17.99 9.99951 17.3293C10.5337 16.6686 10.8699 15.8701 10.9693 15.0263C11.0687 14.1825 10.9271 13.3278 10.561 12.561C10.1949 11.7943 9.61924 11.1469 8.90055 10.6937C8.18187 10.2405 7.34956 9.99997 6.4999 10ZM17.4999 10C17.2769 10 17.0629 10.034 16.8499 10.065C16.9189 9.83303 16.9899 9.59703 17.1039 9.38503C17.2179 9.07703 17.3959 8.81003 17.5729 8.54103C17.7209 8.25003 17.9819 8.05303 18.1739 7.80403C18.3749 7.56203 18.6489 7.40103 18.8659 7.20003C19.0789 6.99003 19.3579 6.88503 19.5799 6.73703C19.8119 6.60403 20.0139 6.45703 20.2299 6.38703L20.7689 6.16503L21.2429 5.96803L20.7579 4.03003L20.1609 4.17403C19.9699 4.22203 19.7369 4.27803 19.4719 4.34503C19.2009 4.39503 18.9119 4.53203 18.5899 4.65703C18.2729 4.80003 17.9039 4.89503 17.5619 5.12403C17.2179 5.34203 16.8209 5.52403 16.4709 5.81603C16.1319 6.11703 15.7229 6.37803 15.4209 6.76003C15.0909 7.11803 14.7649 7.49403 14.5119 7.92203C14.2189 8.33003 14.0199 8.77803 13.8099 9.22103C13.6199 9.66403 13.4669 10.117 13.3419 10.557C13.1049 11.439 12.9989 12.277 12.9579 12.994C12.9239 13.712 12.9439 14.309 12.9859 14.741C13.0009 14.945 13.0289 15.143 13.0489 15.28L13.0739 15.448L13.0999 15.442C13.2778 16.2729 13.6872 17.0364 14.2809 17.6442C14.8745 18.2521 15.6281 18.6794 16.4545 18.8769C17.2809 19.0743 18.1463 19.0337 18.9507 18.7599C19.755 18.486 20.4653 17.99 20.9995 17.3293C21.5337 16.6686 21.8699 15.8701 21.9693 15.0263C22.0687 14.1825 21.9271 13.3278 21.561 12.561C21.1949 11.7943 20.6192 11.1469 19.9006 10.6937C19.1819 10.2405 18.3496 9.99997 17.4999 10Z"></path>
                        </svg>

                        <div>
                            <p class="my-1 text-sm font-light leading-normal" v-html="review.content"></p>
                        </div>

                        <hr class="border-t border-[#0501000D] my-4">

                        <div class="font-semibold">{{ review.author }}</div>

                        <div class="flex justify-start items-center mt-1">
                            <StarIcon class="w-5 h-5 fill-[#FFD700]" />
                            <StarIcon class="w-5 h-5 fill-[#FFD700]" />
                            <StarIcon class="w-5 h-5 fill-[#FFD700]" />
                            <StarIcon class="w-5 h-5 fill-[#FFD700]" />
                            <StarIcon class="w-5 h-5 fill-[#FFD700]" />
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <ProductFooter :data="{ ...data['footer'], 'images': data['images']['footer'] }" />
    </div>
</template>
