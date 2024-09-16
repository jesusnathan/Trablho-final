<script setup>
    import { ref } from 'vue';
    import axios from '@/axios.js';
    import { toast } from 'vue3-toastify';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/user.js';
    import { useLoading } from 'vue-loading-overlay';
    import AppHeader from '@/components/admin/Header.vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    import SingleImageInput from '@/components/admin/products/SingleImageInput.vue';
    import MultipleImageInput from '@/components/admin/products/MultipleImageInput.vue';

    const router = useRouter();
    const user = useUserStore();
    const loading = useLoading();

    const header = ref({
        'background_color': '',
        'text': '',
        'text_color': '',
        'text_background_color': '',
        'logo': null
    });

    const details = ref({
        'slug': '',
        'name': '',
        'original_price': '',
        'final_price': '',
        'description': '',
        'buy_button': {
            'text': '',
            'text_color': '',
            'background_color': ''
        },
        'reviews': [
            { 'author': '', 'content': '' },
            { 'author': '', 'content': '' },
            { 'author': '', 'content': '' },
            { 'author': '', 'content': '' },
        ],
        'images': []
    });

    const footer = ref({
        'background_color': '',
        'text': '',
        'text_color': '',
        'logo': ''
    });

    function save() {
        const loader = loading.show({
            width: 100,
            height: 100,
            opacity: 0.2,
            color: '#2DCE89',
            backgroundColor: '#172B4D'
        });

        const formData = {
            'header': header.value,
            'details': details.value,
            'footer': footer.value
        }

        axios.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : 'Bearer ' + user.access_token } })
            .then(response => {
                loader.hide();

                router.push({ name: 'admin-products-index' })
                    .then(() => {
                        toast('Produto cadastrado com sucesso.', {
                            type: 'success',
                            closeOnClick: false,
                            transition: 'slide'
                        });
                    });
            })
            .catch((error) => {
                loader.hide();

                router.push({ name: 'admin-products-index' })
                    .then(() => {
                        toast('Erro interno, entre em contato com o administrador para obter mais informações.', {
                            type: 'error',
                            closeOnClick: false,
                            transition: 'slide'
                        });
                    });
            });
    }
</script>

<template>
    <div>
        <div class="fixed w-full h-screen">
            <div class="absolute top-0 left-0 w-full h-96 bg-gradient-to-tr from-[#2DCE89] to-[#2DCECC] -rotate-6 scale-150 z-20"></div>
            
            <div class="absolute top-0 left-0 w-full h-full bg-[#172B4D] z-10"></div>
        </div>

        <div class="relative flex flex-col justify-center items-center min-h-screen">
            <AppHeader />

            <main class="w-11/12 max-w-7xl grow my-16 flex flex-col justify-start items-center bg-white rounded-md p-6">
                <form @submit.prevent="save()" class="w-full flex flex-col justify-center items-center">
                    <TabGroup>
                        <TabList class="w-full p-1 rounded-md flex bg-[#172B4D]">
                            <Tab as="template" v-slot="{ selected }">
                                <button type="button" class="w-full h-11 rounded-lg font-medium focus:outline-none" :class="[selected ? 'bg-gradient-to-tr from-[#2DCE89] to-[#2DCECC] text-white shadow' : 'text-white hover:bg-white/10']">
                                    Header
                                </button>
                            </Tab>

                            <Tab as="template" v-slot="{ selected }">
                                <button type="button" class="w-full h-11 rounded-lg font-medium focus:outline-none" :class="[selected ? 'bg-gradient-to-tr from-[#2DCE89] to-[#2DCECC] text-white shadow' : 'text-white hover:bg-white/10']">
                                    Detalhes
                                </button>
                            </Tab>

                            <Tab as="template" v-slot="{ selected }">
                                <button type="button" class="w-full h-11 rounded-lg font-medium focus:outline-none" :class="[selected ? 'bg-gradient-to-tr from-[#2DCE89] to-[#2DCECC] text-white shadow' : 'text-white hover:bg-white/10']">
                                    Footer
                                </button>
                            </Tab>
                        </TabList>

                        <TabPanels class="mt-10 w-full">
                            <TabPanel class="flex justify-center items-center" :unmount="false">
                                <div class="w-full max-w-2xl flex flex-col gap-6">
                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="header.background_color" type="text" placeholder="Cor de fundo" class="w-full h-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: header.background_color }"></div>
                                    </div>

                                    <input v-model="header.text" type="text" placeholder="Texto" class="w-full rounded-sm">

                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="header.text_color" type="text" placeholder="Cor do texto" class="w-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: header.text_color }"></div>
                                    </div>

                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="header.text_background_color" type="text" placeholder="Cor de fundo do texto" class="w-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: header.text_background_color }"></div>
                                    </div>

                                    <div>
                                        <SingleImageInput id="header['logo']" @change="(image) => { header.logo = image; }" />

                                        <p v-if="header.logo" class="mt-4">Nome do arquivo anexado: {{ header.logo.name }}</p>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel class="flex justify-center items-center" :unmount="false">
                                <div class="w-full max-w-2xl flex flex-col gap-6">
                                    <input v-model="details.slug" type="text" placeholder="Slug" class="w-full rounded-sm">

                                    <input v-model="details.name" type="text" placeholder="Nome" class="w-full rounded-sm">

                                    <input v-model="details.original_price" type="text" placeholder="Preço original" class="w-full rounded-sm">

                                    <input v-model="details.final_price" type="text" placeholder="Preço final" class="w-full rounded-sm">

                                    <textarea v-model="details.description" placeholder="Descrição" class="w-full rounded-sm min-h-40"></textarea>

                                    <input v-model="details.buy_button.text" type="text" placeholder="Rótulo do botão de compra" class="w-full rounded-sm">

                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="details.buy_button.text_color" type="text" placeholder="Cor do texto do botão de compra" class="w-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: details.buy_button.text_color }"></div>
                                    </div>

                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="details.buy_button.background_color" type="text" placeholder="Cor de fundo do botão de compra" class="w-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: details.buy_button.background_color }"></div>
                                    </div>

                                    <div class="flex flex-col justify-center items-center gap-4">
                                        <input v-model="details.reviews[0].author" type="text" placeholder="Autor do primeiro review" class="w-full rounded-sm">

                                        <textarea v-model="details.reviews[0].content" placeholder="Primeiro review" class="w-full min-h-32"></textarea>
                                    </div>

                                    <div class="flex flex-col justify-center items-center gap-4">
                                        <input v-model="details.reviews[1].author" type="text" placeholder="Autor do segundo review" class="w-full rounded-sm">

                                        <textarea v-model="details.reviews[1].content" placeholder="Segundo review" class="w-full min-h-32"></textarea>
                                    </div>

                                    <div class="flex flex-col justify-center items-center gap-4">
                                        <input v-model="details.reviews[2].author" type="text" placeholder="Autor do terceiro review" class="w-full rounded-sm">

                                        <textarea v-model="details.reviews[2].content" placeholder="Terceiro review" class="w-full min-h-32"></textarea>
                                    </div>

                                    <div class="flex flex-col justify-center items-center gap-4">
                                        <input v-model="details.reviews[3].author" type="text" placeholder="Autor do quarto review" class="w-full rounded-sm">

                                        <textarea v-model="details.reviews[3].content" placeholder="Quarto review" class="w-full min-h-32"></textarea>
                                    </div>

                                    <div>
                                        <MultipleImageInput @change="(images) => { details.images = [...images] }" />

                                        <p v-if="details.images.length > 0" class="mt-4">
                                            Nomes dos arquivos anexados:

                                            <span v-for="(image, index) in details.images" :key="index">
                                                {{ image.name }}

                                                <span v-show="index + 1 < details.images.length">, </span>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel class="flex justify-center items-center" :unmount="false">
                                <div class="w-full max-w-2xl flex flex-col gap-6">
                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="footer.background_color" type="text" placeholder="Cor de fundo" class="w-full h-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: footer.background_color }"></div>
                                    </div>

                                    <input v-model="footer.text" type="text" placeholder="Texto" class="w-full rounded-sm">

                                    <div class="h-11 flex items-center gap-4">
                                        <input v-model="footer.text_color" type="text" placeholder="Cor do texto" class="w-full rounded-sm">

                                        <div class="w-20 h-full border border-[#6B7280] rounded-sm" :style="{ backgroundColor: footer.text_color }"></div>
                                    </div>

                                    <div>
                                        <SingleImageInput id="footer['logo']" @change="(image) => { footer.logo = image; }" />

                                        <p v-if="footer.logo" class="mt-4">Nome do arquivo anexado: {{ footer.logo.name }}</p>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <button class="px-6 py-3 rounded-md mt-6 bg-gradient-to-tr from-[#2DCE89] to-[#2DCECC] text-white shadow">Cadastrar</button>
                </form>
            </main>
        </div>
    </div>
</template>
