import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import User from './views/User';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';
import UserForm from './views/UserForm';
import QuizForm from './views/QuizForm';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Quizzes from './views/Quizzes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/user" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/quizzes',
                element: <Quizzes />
            },
            {
                path: '/quizzes/new',
                element: <QuizForm key="quizCreate" />
            },
            {
                path: '/quizzes/:id',
                element: <QuizForm key="quizUpdate"/>
            },
            {
                path: '/user',
                element: <User />
            },
            {
                path: '/user/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/user/:id',
                element: <UserForm key="userUpdate"/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },   
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;