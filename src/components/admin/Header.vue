<script setup>
    import axios from '@/axios.js';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/user.js';
    import { useLoading } from 'vue-loading-overlay';
    import { UserCircleIcon } from '@heroicons/vue/24/outline';
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

    const router = useRouter();
    const user = useUserStore();
    const loading = useLoading();

    function logout() {
        const loader = loading.show({
            width: 100,
            height: 100,
            opacity: 0.2,
            color: '#2DCE89',
            backgroundColor: '#172B4D'
        });

        axios.delete('/logout', { headers: { 'Authorization': 'Bearer ' + user.access_token } }).then(async response => {
            user.setState();

            loader.hide();

            router.push({ name: 'admin-login' });
        }).catch((error) => {
            loader.hide();

            if (error.response.status == 500) {
                toast('Erro interno, entre em contato com o administrador para obter mais informações.', {
                    type: 'error',
                    closeOnClick: false,
                    transition: 'slide'
                });
            }
        });
    }
</script>

<template>
    <header class="w-full px-4 py-3 flex justify-end items-center">
        <Menu as="div" class="relative inline-block text-left h-10">
            <div>
                <MenuButton>
                    <UserCircleIcon class="w-10 h-10 text-[#172B4D]" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absolute right-0 w-28 rounded-md bg-white shadow-xl pl-4 py-2 border">
                    <MenuItem>
                        <button @click="logout()" class="hover:text-red-500">Sair</button>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
    </header>
</template>
