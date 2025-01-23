import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EventsView from '../views/EventsView.vue';
// import UsersView from '../views/UsersView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/events', // Add the events path
      name: 'events',
      component: EventsView, // Link to the EventsView component
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView, // Use the renamed SignupView
    },
    {
      path: "/about",
      name: "about",
      component: () => import('../views/AboutView.vue'),
    }
  ],
});

export default router;