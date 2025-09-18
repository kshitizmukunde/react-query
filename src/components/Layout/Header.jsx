import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <header>
            <div>
                <NavLink to='/'>Kshitiz-App</NavLink>
            </div>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/trad'>FetchOld</NavLink>
                </li>
                <li>
                    <NavLink to='/rq'>FetchRQ</NavLink>
                </li>
                <li>
                    <NavLink to='/infinite'>Infinite</NavLink>
                </li>
            </ul>
        </header>
    );
};