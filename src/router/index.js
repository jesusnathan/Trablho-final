import HomeView from '@/views/HomeView.vue';
import { useUserStore } from '@/stores/user.js';
import LoginView from '@/views/admin/LoginView.vue';
import EditView from '@/views/admin/products/EditView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/admin/products/IndexView.vue';
import Preview1View from '@/views/products/Preview1View.vue';
import Preview2View from '@/views/products/Preview2View.vue';
import CreateView from '@/views/admin/products/CreateView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/products/preview-1/:slug',
            name: 'products-preview-1',
            component: Preview1View,
            props: true
        },
        {
            path: '/products/preview-2/:slug',
            name: 'products-preview-2',
            component: Preview2View,
            props: true
        },
        {
            path: '/admin/login',
            name: 'admin-login',
            component: LoginView,
            meta: {
                middleware: 'guest'
            }
        },
        {
            path: '/admin/products/index',
            name: 'admin-products-index',
            component: IndexView,
            meta: {
                middleware: 'auth'
            }
        },
        {
            path: '/admin/products/create',
            name: 'admin-products-create',
            component: CreateView,
            meta: {
                middleware: 'auth'
            }
        },
        {
            path: '/admin/products/edit/:slug',
            name: 'admin-products-edit',
            component: EditView,
            meta: {
                middleware: 'auth'
            },
            props: true
        }
    ]
});

router.beforeEach((to, from) => {
    const user = useUserStore();

    if (to.matched.some(item => item.meta.middleware === 'auth')) {
        if (user.isAuthenticated) {
            return true;
        } else {
            return { name: 'admin-login' };
        }
    }

    if (to.matched.some(item => item.meta.middleware === 'guest')) {
        if (user.isAuthenticated) {
            return { name: 'admin-products-index' };
        } else {
            return true;
        }
    }

    return true;
});

export default router;
