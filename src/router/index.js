import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home'
import KbSource from '@/views/KbSource.vue'
import AddKpi from "@/views/AddKpi";
import ModifyKpi from "@/views/ModifyKpi";
import KbDocs from "@/views/KbDocs";
import InfoKpi from "@/views/InfoKpi";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/add-a-kpi',
        name: 'AddKpi',
        component: AddKpi,
    },
    {
        path: '/edit-kpi',
        name: 'ModifyKpi',
        component: ModifyKpi,
    },
    {
        path: '/info-kpi',
        name: 'InfoKpi',
        component: InfoKpi,
    },
    {
        path: '/documentation',
        name: 'KbDocs',
        component: KbDocs
    },
    {
        path: '/source',
        name: 'KbSource',
        component: KbSource,
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

export default router;