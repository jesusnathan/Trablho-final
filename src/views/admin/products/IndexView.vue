<script setup>
    import axios from '@/axios.js';
    import { ref, onMounted } from 'vue';
    import { toast } from 'vue3-toastify';
    import { useUserStore } from '@/stores/user.js';
    import { useLoading } from 'vue-loading-overlay';
    import { useRoute, RouterLink } from 'vue-router';
    import AppHeader from '@/components/admin/Header.vue';
    import { PlusCircleIcon } from '@heroicons/vue/24/outline';
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
    import { PencilSquareIcon, EyeIcon, TrashIcon } from '@heroicons/vue/24/solid';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

    const route = useRoute();
    const user = useUserStore();
    const loading = useLoading();

    const products = ref([]);
    const selectedProductId = ref(null);
    const isTheProductDeletionModalOpen = ref(false);

    function showProductDeletionModal(id) {
        isTheProductDeletionModalOpen.value = true;

        selectedProductId.value = id;
    }

    function closeProductDeletionModal() {
        isTheProductDeletionModalOpen.value = false;

        selectedProductId.value = null;
    }

    function deleteProduct() {
        const loader = loading.show({
            width: 100,
            height: 100,
            opacity: 0.2,
            color: '#2DCE89',
            backgroundColor: '#172B4D'
        });

        axios.delete('/products/' + selectedProductId.value, { headers: { 'Authorization' : 'Bearer ' + user.access_token } })
            .then(response => {
                axios.get('/products' + (route.query.slug ? `?slug=${route.query.slug}` : ''), { headers: { 'Authorization' : 'Bearer ' + user.access_token } })
                    .then(response => {
                        loader.hide();

                        products.value = response.data.data;

                        isTheProductDeletionModalOpen.value = false;

                        selectedProductId.value = null;

                        toast('Produto excluído com sucesso.', {
                            type: 'success',
                            closeOnClick: false,
                            transition: 'slide'
                        });
                    })
                    .catch((error) => {
                        loader.hide();

                        toast('Erro interno, entre em contato com o administrador para obter mais informações.', {
                            type: 'error',
                            closeOnClick: false,
                            transition: 'slide'
                        });
                    });
            });
    }

    onMounted(() => {
        const loader = loading.show({
            width: 100,
            height: 100,
            opacity: 0.2,
            color: '#2DCE89',
            backgroundColor: '#172B4D'
        });

        axios.get('/products' + (route.query.slug ? `?slug=${route.query.slug}` : ''), { headers: { 'Authorization' : 'Bearer ' + user.access_token } })
            .then(response => {
                loader.hide();

                products.value = response.data.data;
            })
            .catch((error) => {
                loader.hide();

                toast('Erro interno, entre em contato com o administrador para obter mais informações.', {
                    type: 'error',
                    closeOnClick: false,
                    transition: 'slide'
                });
            });
    });
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
                <form class="mb-4 w-full flex justify-center items-center gap-4">
                    <div class="relative grow">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>

                        <input type="search" name="slug" :value="$route.query.slug" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Slug">

                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Procurar</button>
                    </div>

                    <RouterLink :to="{ name: 'admin-products-create' }" class="bg-[#2DCE89] rounded-full p-2">
                        <PlusCircleIcon class="w-8 h-8 text-white" />
                    </RouterLink>
                </form>

                <table class="w-full text-left text-gray-500">
                    <thead class="text-gray-700 bg-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-semibold">#</th>

                            <th scope="col" class="px-6 py-3 font-semibold">Slug</th>

                            <th scope="col" class="px-6 py-3 font-semibold max-w-96">Nome</th>

                            <th scope="col" class="px-6 py-3 font-semibold">Preço</th>

                            <th scope="col" class="px-6 py-3 font-semibold"></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="products.length == 0">
                            <td colspan="5" class="text-center pt-10">
                                Nenhum registro encontrado.
                            </td>
                        </tr>

                        <tr v-else class="bg-white border-b hover:bg-gray-50" v-for="(product, index) in products" :key="index">
                            <td class="px-6 py-4">{{ product.id }}</td>

                            <td class="px-6 py-4">{{ product.slug }}</td>

                            <td class="px-6 py-4 max-w-96">{{ product.name }}</td>

                            <td class="px-6 py-4">{{ product.details.final_price }}</td>

                            <td class="px-6 py-4">
                                <div class="flex justify-end items-center gap-2">
                                    <RouterLink :to="{ name: 'admin-products-edit', params: { slug: product.slug } }" class="hover:text-blue-500">
                                        <PencilSquareIcon class="w-6 h-6" />
                                    </RouterLink>

                                    <Menu as="div" class="relative inline-block">
                                        <div class="flex justify-center items-center">
                                            <MenuButton class="hover:text-blue-500">
                                                <EyeIcon class="w-6 h-6" />
                                            </MenuButton>
                                        </div>

                                        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                                            <MenuItems class="absolute right-0 min-w-32 w-fit rounded-md bg-white shadow-xl py-2 pl-4 border flex flex-col gap-1">
                                                <MenuItem>
                                                    <a :href="`/products/preview-1/${product.slug}`" target="_blank" class="w-full">
                                                        Template 1
                                                    </a>
                                                </MenuItem>

                                                <MenuItem>
                                                    <a :href="`/products/preview-2/${product.slug}`" target="_blank" class="w-full">
                                                        Template 2
                                                    </a>
                                                </MenuItem>
                                            </MenuItems>
                                        </transition>
                                    </Menu>

                                    <button type="button" class="hover:text-red-500" @click="showProductDeletionModal(product.id)">
                                        <TrashIcon class="w-6 h-6" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>

            <TransitionRoot appear :show="isTheProductDeletionModalOpen" as="template">
                <Dialog as="div" @close="closeProductDeletionModal()" class="relative z-10">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black/25"></div>
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <DialogTitle as="h1" class="text-xl font-medium leading-6 text-gray-900">
                                        Excluir produto?
                                    </DialogTitle>

                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Esta ação é irreversível. Tem certeza de que deseja excluir este produto?</p>
                                    </div>

                                    <div class="mt-4 flex justify-end items-center gap-4">
                                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" @click="closeProductDeletionModal()">Não!</button>
                                        
                                        <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" @click="deleteProduct()">Sim!</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
    </div>
</template>
