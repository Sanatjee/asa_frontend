import React, { useEffect, useState } from "react";

import rbacService from "../../services/rbacService";
import Toast from "../../components/Toast";

const RolePermissionPage = () => {

    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] = useState(null);

    const [permissions, setPermissions] = useState([]);

    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const [toast, setToast] = useState({
        show: false,
        message: ""
    });

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {

        const response =
            await rbacService.getRoles();

        setRoles(response.data.data);

        if (response.data.data.length) {
            loadRole(response.data.data[0].id);
        }
    };

    const loadRole = async (id) => {

        const response =
            await rbacService.getRole(id);

        setSelectedRole(
            response.data.data.role
        );

        setPermissions(
            response.data.data.permissions
        );

        setSelectedPermissions(
            response.data.data.assigned_permissions
        );
    };

    const togglePermission = (permission) => {

        if (
            selectedPermissions.includes(permission)
        ) {

            setSelectedPermissions(
                selectedPermissions.filter(
                    p => p !== permission
                )
            );

        } else {

            setSelectedPermissions([
                ...selectedPermissions,
                permission
            ]);

        }
    };

    const save = async () => {

        await rbacService.updatePermissions(
            selectedRole.id,
            selectedPermissions
        );

        setToast({
            show: true,
            message:
                "Permissions updated successfully."
        });
    };

    return (

        <div className="container-xxl mt-4">

            <div className="row">

                <div className="col-md-3">

                    <div className="card">

                        <div className="card-header">
                            Roles
                        </div>

                        <div className="list-group list-group-flush">

                            {roles.map(role => (

                                <button
                                    key={role.id}
                                    className={`list-group-item list-group-item-action ${selectedRole?.id === role.id
                                        ? "active"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        loadRole(role.id)
                                    }
                                >
                                    {role.name}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="col-md-9">

                    <div className="card">

                        <div className="card-header d-flex justify-content-between">

                            <h5>
                                Permissions
                            </h5>

                            <button
                                className="btn btn-primary"
                                onClick={save}
                            >
                                Save
                            </button>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                {permissions.map(permission => (

                                    <div
                                        className="col-md-4 mb-3"
                                        key={permission.id}
                                    >

                                        <div className="form-check">

                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedPermissions.includes(permission.name)}
                                                onChange={() =>
                                                    togglePermission(permission.name)
                                                }
                                            />

                                            <label className="form-check-label">

                                                {permission.name}

                                            </label>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Toast
                show={toast.show}
                message={toast.message}
                type="success"
                onClose={() =>
                    setToast({
                        ...toast,
                        show: false
                    })
                }
            />

        </div>

    );
};

export default RolePermissionPage;