import api from "../api/axios";

const getUsers = (params) =>
    api.get("/user", { params });

const create = (data) =>
    api.post("/user/create", data);

const update = (id, data) =>
    api.put(`/user/${id}`, data);

const destroy = (id) =>
    api.delete(`/user/${id}`);

export default {
    getUsers,
    create,
    update,
    destroy,
};