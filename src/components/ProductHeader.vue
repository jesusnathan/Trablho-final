<script setup>
    defineProps({
        data: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <header :style="{ 'backgroundColor': data.background_color }" class="w-full p-2 flex flex-col justify-center items-center gap-2">
        <p :style="{ 'backgroundColor': data.text_background_color, 'color': data.text_color }">{{ data.text }}</p>

        <img :src="data.images.logo" alt="Logo" class="w-28 h-auto object-cover">
    </header>
</template>
