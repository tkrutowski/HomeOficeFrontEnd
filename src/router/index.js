import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import UsersView from '@/views/UsersView.vue';
import UsersProfileView from '@/views/UserProfileView.vue';
import UserRolesView from '@/views/UserRolesView.vue';
import UserView from '@/views/UserView.vue';
import ErrorView from '@/views/ErrorView.vue'

//GO AHEAD
import GoAheadHomeView from '../views/goahead/GoAheadHomeView.vue';
import GACustomersView from '../views/goahead/GoAheadCustomersView.vue';
import GACustomerView from '../views/goahead/GoAheadCustomerView.vue';
import GAInvoiceView from '../views/goahead/GoAheadInvoiceView';
import GAInvoicesView from '../views/goahead/GoAheadInvoicesView.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/goahead',
    name: 'GoAheadHome',
    component: GoAheadHomeView,
  },

  {
    path: '/goahead/customer/all',
    name: 'GoAheadCustomers',
    component: GACustomersView,
    props: true
},
{
  path: '/goahead/customer',
  name: 'TheCustomer',
  component: GACustomerView,
  props: true
},
  {
    path: '/goahead/invoice',
    name: 'TheInvoice',
    component: GAInvoiceView,
    props: true
  },
  {
    path: '/goahead/invoice/all',
    name: 'GoAheadInvoices',
    component: GAInvoicesView,
    props: true
  },
{
  path: '/login',
  name: 'Login',
  component: LoginView,
  props: true
},
{
  path: '/user/all',
  name: 'Users',
  component: UsersView,
  props: true
},
{
  path: '/user/profile',
  name: 'UserProfile',
  component: UsersProfileView,
  props: true
},
{
  path: '/user/add',
  name: 'User',
  component: UserView,
  props: true
},
{
  path: '/user/roles',
  name: 'UserRoles',
  component: UserRolesView,
  props: true
},
{
  path: '/error',
  name: 'Error',
  component: ErrorView,
  props: true
},
// ,
// {
//   łapie tu wszystkie zapytania nie złapane wyżej
//   path: '*',
//   name: 'NotFoundView',
//   component: NotFoundView,
//   props: true
// }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
