<script setup lang="ts">

import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <header class="header-container">
        <div class="wrapper header-content">
            <div class="header-logo">
            </div>
            <div class="auth-buttons" v-if="!user">
                <button class="btn btn-primary">Log in</button>
                <button class="btn btn-secondary">Register</button>
            </div>
        </div>
    </header>
</template>

<style scoped>
@reference "../../css/app.css";

.header-container {
    @apply flex h-28 w-full flex-nowrap justify-center shadow-[0_5px_5px_rgba(250,189,189,0.3)];
}

.header-content {
    @apply flex h-full flex-nowrap items-center justify-between;
}

.header-logo {
    @apply h-full w-[30%] md:w-[10%] bg-[length:80%_80%] bg-center bg-no-repeat;
    background-image: url('@/assets/images/logo/br_logo_main.png');
}

.auth-buttons {
    @apply flex w-[50%] md:w-1/5 flex-nowrap items-center justify-between;
}
</style>
