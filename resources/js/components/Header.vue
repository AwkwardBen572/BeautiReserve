<script setup lang="ts">

import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const user = computed(() => page.props.auth.user);
console.log("DDDDD", user.value);
</script>

<template>
    <header class="header-container">

    </header>
</template>

<style scoped>

.header-container {
    width: 100%;
    height: 5rem;
}

</style>
