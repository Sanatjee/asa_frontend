import React, { useEffect, useState } from "react";
import UserModal from "../../components/UserModal";
import DeleteModal from "../../components/DeleteModal";
import Permission from "../../components/Permission";
import Toast from "../../components/Toast";
import userService from "../../services/userService";

const Users = () => {

    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({});

    const [selectedUser, setSelectedUser] = useState(null);

    const [showUserModal, setShowUserModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [errors, setErrors] = useState({});

    const [filters, setFilters] = useState({
      search: "",
      role: "",
      is_active: "",
      page: 1,
    });

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const loadUsers = async () => {
        try {

            const response = await userService.getUsers(filters);

            setUsers(response.data.data.data);

            setPagination(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    const saveUser = async (data) => {

        try {

            setErrors({});

            if (selectedUser) {

                await userService.update(selectedUser.id, data);

                setToast({
                    show: true,
                    message: "User updated successfully.",
                    type: "success",
                });

            } else {

                await userService.create(data);

                setToast({
                    show: true,
                    message: "User created successfully.",
                    type: "success",
                });

            }

            setShowUserModal(false);
            setSelectedUser(null);

            loadUsers();

        } catch (error) {

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setToast({
                    show: true,
                    message: error.response?.data?.message,
                    type: "danger",
                });
            }

        }

    };

    const confirmDelete = async () => {

        try {

            await userService.destroy(selectedUser.id);

            setShowDeleteModal(false);

            setSelectedUser(null);

            loadUsers();

            setToast({
                show: true,
                message: "User deleted successfully.",
                type: "success",
            });

        } catch (error) {

            setToast({
                show: true,
                message: error.response?.data?.message,
                type: "danger",
            });

        }

    };

    useEffect(() => {

        loadUsers();

        if (toast.show) {

            const timer = setTimeout(() => {
                setToast(prev => ({
                    ...prev,
                    show: false,
                }));
            }, 3000);

            return () => clearTimeout(timer);

        }

    }, [filters, toast.show]);

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="card mb-4">
                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4">

                            <input
                                className="form-control"
                                placeholder="Search user..."
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        search: e.target.value,
                                        page: 1,
                                    })
                                }
                            />

                        </div>

                       {/* Role Filter */}

                        <div className="col-md-3">
                          <select
                            className="form-select"
                            value={filters.role}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                role: e.target.value,
                                page: 1,
                              })
                            }
                          >
                            <option value="">
                              All Roles
                            </option>

                            <option value="Admin">
                              Admin
                            </option>

                            <option value="User">
                              User
                            </option>
                          </select>
                        </div>

                        {/* Status Filter */}
                        <div className="col-md-3">
                          <select
                            className="form-select"
                            value={filters.is_active}
                            onChange={(e) =>
                              setFilters({
                                ...filters,
                                is_active: e.target.value,
                                page: 1,
                              })
                            }
                          >
                            <option value="">
                              All Status
                            </option>

                            <option value="1">
                              Active
                            </option>

                            <option value="0">
                              Inactive
                            </option>
                          </select>
                        </div>

                        <div className="col-md-2">

                            <Permission permission="user.create">

                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setErrors({});
                                        setSelectedUser(null);
                                        setShowUserModal(true);
                                    }}
                                >
                                    <i className="bx bx-plus"></i>
                                    Add User
                                </button>

                            </Permission>

                        </div>

                    </div>

                </div>
            </div>

            <div className="card">
                <h5 className="card-header">
                    Users
                </h5>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td> {user.roles?.length ? user.roles[0].name : "-"} </td>
                                    <td>
                                        <span className={`badge ${ user.is_active ? "bg-label-success" : "bg-label-danger" }`} >
                                            {user.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                    <div className="d-flex gap-2">

                                        <Permission permission="user.edit">

                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => {
                                                    setErrors({});
                                                    setSelectedUser(user);
                                                    setShowUserModal(true);
                                                }}
                                            >
                                                <i className="bx bx-edit"></i>
                                            </button>

                                        </Permission>

                                        <Permission permission="user.delete">

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </button>

                                        </Permission>

                                    </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <nav className="my-3">

                    <ul className="pagination justify-content-center">

                        {Array.from(
                            { length: pagination.last_page || 1 },
                            (_, i) => (

                                <li
                                    key={i}
                                    className={`page-item ${
                                        pagination.current_page === i + 1
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                page: i + 1,
                                            })
                                        }
                                    >
                                        {i + 1}
                                    </button>

                                </li>

                            )
                        )}

                    </ul>

                </nav>

            </div>

            <Toast
                {...toast}
                onClose={() =>
                    setToast(prev => ({
                        ...prev,
                        show: false,
                    }))
                }
            />

            <UserModal
                show={showUserModal}
                user={selectedUser}
                errors={errors}
                onClose={() => {
                    setShowUserModal(false);
                    setSelectedUser(null);
                }}
                onSubmit={saveUser}
            />

            <DeleteModal
                show={showDeleteModal}
                title="Delete User"
                message={`Are you sure you want to delete "${selectedUser?.name}"?`}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                }}
                onConfirm={confirmDelete}
            />

        </div>
    );
};

export default Users;