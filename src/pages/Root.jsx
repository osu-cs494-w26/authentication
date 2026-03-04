import { NavLink, Outlet } from 'react-router'

export default function Root() {
    return (
        <div className="page-container">
            <nav>
                <ul>
                    <li><NavLink to="/">Home (1st-party)</NavLink></li>
                    <li><NavLink to="/login">Login (1st-party)</NavLink></li>
                    <li><NavLink to="/github" end>Home (3rd-party)</NavLink></li>
                    <li><NavLink to="/github/login">Login (3rd-party)</NavLink></li>
                </ul>
            </nav>
            <main><Outlet /></main>
        </div>
    )
}
