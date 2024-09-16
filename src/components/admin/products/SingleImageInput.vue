<script setup>
    import { ref, onMounted, defineEmits, defineProps } from 'vue';
    import { CloudArrowDownIcon } from '@heroicons/vue/24/outline';

    defineProps({
        id: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(['change']);

    const dropZone = ref(null);
    const fileInput = ref(null);
    const showPopover = ref(false);
    const imagePreviewStyle = ref({ 'top': '0px', 'left': '0px' });

    function handleFileChange() {
        emit('change', fileInput.value.files[0]);
    };

    function handleDragOver(event) {
        event.preventDefault();

        event.stopPropagation();

        dropZone.value.classList.add('hover');
    };

    function handleDragLeave(event) {
        event.preventDefault();

        event.stopPropagation();

        dropZone.value.classList.remove('hover');
    };

    function handleDrop(event) {
        event.preventDefault();

        event.stopPropagation();

        dropZone.value.classList.remove('hover');
        
        const files = event.dataTransfer.files;

        if (files.length > 0 && files.length < 2 && files[0].type == 'image/webp') {
            fileInput.value.files = files;
            
            fileInput.value.dispatchEvent(new Event('change'));
        }
    };

    onMounted(() => {
        dropZone.value.addEventListener('dragover', handleDragOver);

        dropZone.value.addEventListener('dragleave', handleDragLeave);

        dropZone.value.addEventListener('drop', handleDrop);
    });
</script>

<template>
    <div>
        <label ref="dropZone" :for="id" class="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" @mouseover="() => { showPopover = true; }" @mouseleave="() => { showPopover = false; }">
            <input ref="fileInput" @change="handleFileChange()" type="file" :id="id" accept=".webp" class="hidden">

            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudArrowDownIcon class="w-8 h-8 text-gray-500" />

                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Clique para carregar</span> ou arraste e solte</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">WEBP</p>
            </div>
        </label>
    </div>
</template>
