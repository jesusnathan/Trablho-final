import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            'name': '',
            'email': '',
            'access_token': '',
            'isAuthenticated': false
        };
    },

    actions: {
        setState(data = { 'name': '', 'email': '', 'access_token': '', 'isAuthenticated': false }) {
            this.name = data.name;
            this.email = data.email;
            this.access_token = data.access_token;
            this.isAuthenticated = data.isAuthenticated;
        }
    },

    persist: true
});
