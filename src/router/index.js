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

//LIBRARY
import LibraryHomeView from '../views/library/LibraryHomeView';
import LibraryBooksView from '../views/library/LibraryBooksView';
import LibraryBookView from '../views/library/LibraryBookView';
import LibrarySeriesView from '../views/library/LibrarySeriesView';
import LibraryUserBooksReadNowView from '../views/library/LibraryUserBooksReadNowView';
import LibraryUserBooksReadView from '../views/library/LibraryUserBooksReadView';
import LibraryUserBooksToReadView from '../views/library/LibraryUserBooksToReadView';
import LibraryUserBookView from '../views/library/LibraryUserBookView';

//FINANCE
import FinanceHomeView from '../views/finance/FinanceHomeView';
import FinanceLoansView from '../views/finance/FinanceLoansView';
import FinanceLoanView from "@/views/finance/FinanceLoanView";
import FinanceFeesView from '../views/finance/FinanceFeesView';
import FinanceFeeView from "@/views/finance/FinanceFeeView";
import FinancePaymentsView from '../views/finance/FinancePaymentsView';

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

//    -----------------------------------------------LIBRARY
  {
    path: '/library',
    name: 'LibraryHome',
    component: LibraryHomeView,
  },

  {
    path: '/library/book/all',
    name: 'LibraryBooks',
    component: LibraryBooksView,
    props: true
  },
  {
    path: '/library/book/new',
    name: 'TheBook',
    component: LibraryBookView,
    props: true
  },
  {
    path: '/library/book/series',
    name: 'TheSeries',
    component: LibrarySeriesView,
    props: true
  },
  {
    path: '/library/book/shell/read_now',
    name: 'TheLibraryUserBooksReadNow',
    component: LibraryUserBooksReadNowView,
    props: true
  },
  {
    path: '/library/book/shell/read',
    name: 'LibraryUserBooksRead',
    component: LibraryUserBooksReadView,
    props: true
  },{
    path: '/library/book/shell/to_read',
    name: 'LibraryUserBooksToRead',
    component: LibraryUserBooksToReadView,
    props: true
  },
  {
    path: '/library/book/shell/add',
    name: 'TheUserBook',
    component: LibraryUserBookView,
    props: true
  },

  //    -----------------------------------------------FINANCE
  {
    path: '/finance',
    name: 'FinanceHome',
    component: FinanceHomeView,
  },
  {
    path: '/finance/loan/all',
    name: 'FinanceLoans',
    component: FinanceLoansView,
    props: true
  },
  {
    path: '/finance/loan/new',
    name: 'TheLoan',
    component: FinanceLoanView,
    props: true
  },
  {
    path: '/finance/fee/all',
    name: 'FinanceFees',
    component: FinanceFeesView,
    props: true
  },
  {
    path: '/finance/fee/new',
    name: 'TheFee',
    component: FinanceFeeView,
    props: true
  },
  {
    path: '/finance/payment',
    name: 'FinancePayments',
    component: FinancePaymentsView,
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
