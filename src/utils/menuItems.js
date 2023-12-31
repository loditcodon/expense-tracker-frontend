import {dashboard, expenses, transactions, trend, userinfoicon, expensesLimitIcon} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Expenses Limit",
        icon: expensesLimitIcon,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Statistical",
        icon: dashboard,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Profile",
        icon: userinfoicon,
        link: "/dashboard",
    },
]