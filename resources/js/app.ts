import { createInertiaApp } from '@inertiajs/vue3';
import Layout from './layouts/Layout.vue';

const appName = import.meta.env.VITE_APP_NAME || 'BeautiReserve';

void createInertiaApp({
    layout: () => Layout,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    withApp: (app) => {
        app.directive('focus', {
            mounted: (el: HTMLElement, shouldFocus) => {
                if (shouldFocus.value !== false) {
                    el.focus();
                }
            },
        });
    },
    progress: {
        color: '#4B5563',
    },
});
