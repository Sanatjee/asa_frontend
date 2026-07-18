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
            <div className="app-brand demo">
                <NavLink
                to="/dashboard"
                className="app-brand-link"
                >
                <span className="app-brand-text fw-bold">
                    AI ASA
                </span>
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
                        `menu-link ${
                        isActive ? 'active' : ''
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