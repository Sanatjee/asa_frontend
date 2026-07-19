import api from "../api/axios";

const getRoles = () =>
    api.get("/roles");

const getRole = (id) =>
    api.get(`/roles/${id}`);

const updatePermissions = (id, permissions) =>
    api.put(`/roles/${id}/permissions`, {
        permissions
    });

export default {
    getRoles,
    getRole,
    updatePermissions
};