import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home'
import KbSource from '@/views/KbSource.vue'
import AddKpi from "@/views/AddKpi";
import KbDocs from "@/views/KbDocs";
import InfoKpi from "@/views/InfoKpi";
import Analytics from "@/views/Analytics";
import EditKpi from "@/views/EditKpi";

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
        path: '/edit-kpi/:kpi_id',
        name: 'EditKpi',
        component: EditKpi,
    },
    {
        path: '/kpi/:kpi_id',
        name: 'InfoKpi',
        component: InfoKpi,
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics
    },
    {
        path: '/documentation',
        name: 'KbDocs',
        component: KbDocs
    },
    {
        path: '/library',
        name: 'KbSource',
        component: KbSource,
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

export default router;