import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>
    }
]

export default routes;