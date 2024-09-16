<script setup>
    import { ref } from 'vue';
    import axios from '@/axios.js';
    import { toast } from 'vue3-toastify';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/user.js';
    import { useLoading } from 'vue-loading-overlay';
    import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

    const router = useRouter();
    const user = useUserStore();
    const loading = useLoading();

    const email = ref('');
    const password = ref('');
    const passwordIsVisible = ref(false);

    function authenticate(event) {
        toast.clearAll();

        const loader = loading.show({
            width: 100,
            height: 100,
            opacity: 0.2,
            color: '#2DCE89',
            backgroundColor: '#172B4D'
        });

        const inputs = event.target.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.blur();
        });

        const data = {
            'email': email.value,
            'password': password.value
        }

        axios.post('/login', data).then(async response => {
            user.setState({ ...response.data, 'isAuthenticated': true });

            loader.hide();

            router.push({ name: 'admin-products-index' });
        }).catch((error) => {
            loader.hide();

            if (error.response.status == 422 || error.response.status == 401) {
                toast('O e-mail e/ou a senha estão incorretos. Verifique e tente novamente.', {
                    type: 'warning',
                    closeOnClick: false,
                    transition: 'slide'
                });
            }

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
    <div class="relative w-full h-screen bg-[#172B4D] overflow-x-hidden flex justify-center items-center">
        <div class="absolute inset-0 w-full h-96 bg-gradient-to-tr from-[#2DCE89] to-[#2DCECC] -rotate-6 scale-150"></div>

        <div class="absolute inset-0 flex items-center justify-center px-5">
            <div class="bg-white px-5 py-12 w-full rounded-md max-w-lg">
                <form @submit.prevent="authenticate($event)" class="flex flex-col gap-4">
                    <input v-model="email" type="email" placeholder="E-mail" class="rounded-md border-[#2DCECC] focus:ring-[#2DCECC] focus:border-[#2DCECC]" required>

                    <div class="relative flex items-center">
                        <input v-model="password" :type="passwordIsVisible ? 'text' : 'password'" placeholder="Senha" class="w-full rounded-md border-[#2DCECC] focus:ring-[#2DCECC] focus:border-[#2DCECC]" autocomplete="off" required>

                        <button type="button" @click="() => { passwordIsVisible = !passwordIsVisible }" class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <EyeIcon v-if="!passwordIsVisible" class="w-5 h-5" />

                            <EyeSlashIcon v-else class="w-5 h-5" />
                        </button>
                    </div>

                    <button class="bg-[#2DCE89] text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-[#172B4D] mt-4">Entrar</button>
                </form>
            </div>
        </div>
    </div>
</template>
