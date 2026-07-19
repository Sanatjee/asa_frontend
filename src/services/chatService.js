import api from '../api/axios';

const getSessions = () => {
  return api.get('/chat-sessions');
};

const getSingleSession = (id) => {
  return api.get(`/chat-sessions/${id}`);
};

const createSession = () => {
  return api.post("/chat-sessions");
};

const sendMessage = (id,data) => {
  return api.post(`/chat-sessions/${id}/messages`, data);
};

const sendSupportReply = (sessionId, data) => {
    return api.post(`/chat-sessions/${sessionId}/support-reply`, data);
};

const resolve = (id) => {
  return api.patch(`/chat-sessions/${id}/resolve`);
};

const deleteSession = (id) => {
    return api.delete(`/chat-sessions/${id}`);
};


export default {
    getSessions,
    getSingleSession,
    createSession,
    sendMessage,
    sendSupportReply,
    resolve,
    deleteSession,
};