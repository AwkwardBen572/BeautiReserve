<script setup lang="ts">

import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const user = computed(() => page.props.auth.user);
console.log("DDDDD", user.value);
</script>

<template>
    <header class="header-container">
        <div class="wrapper">

        </div>
    </header>
</template>

<style scoped>

.header-container {
    width: 100%;
    height: 5rem;
    box-shadow: 0 5px 5px rgba(250, 189, 189, 0.3);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
}

</style>
