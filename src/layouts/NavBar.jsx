import React, { useState } from 'react';
import userImage from "../assets/img/avatars/1.png"
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { user, logout } = useAuth();
    const role = user?.roles?.length > 0 ? user.roles.join(', ') : 'User';

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav
            className="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
                <a
                    className="nav-item nav-link px-0 me-xl-6"
                    href="javascript:void(0)"
                >
                    <i className="icon-base bx bx-menu icon-md" />
                </a>
            </div>
            <div
                className="navbar-nav-right d-flex align-items-center justify-content-end"
                id="navbar-collapse"
            >
                <div className="d-flex align-items-center ms-3 py-2">
                    <i className="bx bx-bar-chart-alt-2 text-primary fs-2 me-3"></i>

                    <div>
                        <h4 className="mb-0 fw-bold">
                            AI Applicant Support Dashboard
                        </h4>
                        <small className="text-muted">
                            Intelligent assistance for admissions, program information and applicant queries
                        </small>
                    </div>
                </div>
                <ul className="navbar-nav flex-row align-items-center ms-md-auto">


                    {/* User */}
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a
                            className={`nav-link dropdown-toggle hide-arrow p-0 ${showDropdown ? 'show' : ''}`}
                            href="javascript:void(0);"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowDropdown(!showDropdown);
                            }}
                        >
                            <div className="avatar avatar-online">
                                <img src={userImage} alt="" className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`}
                            {...(showDropdown ? { 'data-bs-popper': 'static' } : {})}
                        >
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src={userImage} alt="" className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0">{user?.name}</h6>
                                            <small className="text-body-secondary">{role}</small>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li>
                                <div className="dropdown-divider my-1" />
                            </li>
                            <li>
                                <a className="dropdown-item" href="javascript:void(0);" onClick={handleLogout}>
                                    <i className="icon-base bx bx-power-off icon-md me-3" />
                                    <span>Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/*/ User */}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar