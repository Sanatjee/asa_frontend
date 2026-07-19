import React from 'react'

import useAuth from '../hooks/useAuth';
import sidebarMenu from '../utils/sidebarMenu';

import { NavLink } from 'react-router-dom';

const SideBar = () => {
    const { hasPermission } = useAuth();

    const menus = sidebarMenu.filter((menu) =>
        hasPermission(menu.permission)
    );

    return (
        <>
            {/* Menu */}
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" >
                <div className="app-brand demo py-3">
                    <NavLink
                        to="/dashboard"
                        className="app-brand-link d-flex align-items-center  w-100 text-decoration-none"
                    >
                        <div >
                            <div
                                className="fw-bold text-primary"
                                style={{
                                    fontSize: "24px",
                                    lineHeight: "1.2",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "24px",
                                        marginTop: "10px",
                                    }}
                                >
                                    🤖
                                </span>
                                <span
                                    className="fw-bold text-primary"
                                    style={{
                                        fontSize: "18px",
                                    }}
                                >
                                    AI Support Portal
                                </span>


                            </div>

                            <div
                                className="fw-semibold text-dark text-left"
                                style={{
                                    fontSize: "14px",
                                    letterSpacing: "0.5px",
                                    marginLeft: "36px"
                                }}
                            >
                            IIT Bombay
                            </div>
                        </div>
                    </NavLink>
                </div>

                <ul className="menu-inner py-1">
                    {menus.map((menu) => (
                        <li
                            key={menu.path}
                            className="menu-item"
                        >
                            <NavLink
                                to={menu.path}
                                className={({ isActive }) =>
                                    `menu-link ${isActive ? 'active' : ''
                                    }`
                                }
                            >
                                <i
                                    className={`menu-icon tf-icons ${menu.icon}`}
                                />

                                <div>{menu.title}</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
            {/* / Menu */}
        </>
    )
}

export default SideBar