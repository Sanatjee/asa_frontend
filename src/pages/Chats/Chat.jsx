import React, { useEffect, useState, useRef } from "react";
import chatService from "../../services/chatService";
import Toast from "../../components/Toast";
import DeleteModal from "../../components/DeleteModal";
import '../../assets/css/chat.css'
import { formatChatTime } from "../../utils/dateFormatter";
import useAuth from "../../hooks/useAuth";
import Permission from "../../components/Permission";

const Program = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isResolved, setIsResolved] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);   

    const messagesContainerRef = useRef(null);


    const scrollToBottom = (behavior = "smooth") => {
        const container = messagesContainerRef.current;

        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    };

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const { hasPermission,user } = useAuth();

    const canResolve = hasPermission("chat.resolve");

    const replyingUser = selectedSession && selectedSession.user_id !== user.id && 
                         canResolve ? "support" : "user";
    
    const isSupportView = selectedSession && selectedSession.user_id !== user.id && canResolve;


    useEffect(() => {
        loadSessions();
    }, []);

    // Scroll immediately when a different chat session is opened
    useEffect(() => {
        if (selectedSession) {
            scrollToBottom("auto");
        }
    }, [selectedSession]);

    // Smooth scroll whenever new messages are added
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom("smooth");
        }
    }, [messages]);

    const getStatusClass = (session) => {

        if (session.resolution_flag === "resolved") {
            return "list-group-item-success";
        }

        if (session.resolution_flag === "followup") {
            return "list-group-item-danger";
        }

        if (session.resolution_flag === "usresolved") {
            return "list-group-item-warning";
        }
    };


    const loadSessions = async () => {
        const res = await chatService.getSessions();
        setSessions(res.data.data);
        return res.data.data;
    };

    const createChat = async () => {
        const res = await chatService.createSession();

        const sessions = await loadSessions();

        const newSession = sessions.find(
            s => s.id === res.data.data.id
        );

        setSelectedSession(newSession);
        setMessages([]);
        setMessage("");
    };

    const openChat = async (session) => {
        const res = await chatService.getSingleSession(session.id);

        setSelectedSession(res.data.data);
        setMessages(res.data.data.messages);
        setIsResolved(false);
        if (res.data.data.resolution_flag === "resolved") {
            setIsResolved(true);
        }
    };

    const determinMessage = (msg) => {
        if (replyingUser === "support") {
            return (
                msg.sender === "assistant" ||
                msg.sender === "support"
            );
        }

        return msg.sender === "user";
    };

    const sendMessage = async () => {
    if (!message.trim() || !selectedSession) return;

    setLoading(true);

    try {
        let res;

        if (isSupportView) {
            // Support replying to applicant
            res = await chatService.sendSupportReply(
                selectedSession.id,
                { message }
            );

            setMessages(prev => [
                ...prev,
                res.data.data.message,
            ]);
        } else {
            // Normal AI conversation
            res = await chatService.sendMessage(
                selectedSession.id,
                { message }
            );

            setMessages(prev => [
                ...prev,
                res.data.data.user_message,
                res.data.data.assistant_message,
            ]);
        }

        setSelectedSession(res.data.data.session);
        setMessage("");

        await loadSessions();
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};


    const resolveChat = async () => {
        await chatService.resolve(selectedSession.id);

        const res = await chatService.getSingleSession(
            selectedSession.id
        );

        setSelectedSession(res.data.data);
        setMessages(res.data.data.messages);

        await loadSessions();

        setToast({
            show: true,
            message: "Chat resolved successfully.",
            type: "success",
        });
    };

    const confirmDelete = async () => {
        if (!sessionToDelete) return;

        try {
            await chatService.deleteSession(sessionToDelete.id);

            setToast({
                show: true,
                message: "Chat deleted successfully.",
                type: "success",
            });

            if (selectedSession?.id === sessionToDelete.id) {
                setSelectedSession(null);
                setMessages([]);
            }

            setShowDeleteModal(false);
            setSessionToDelete(null);

            loadSessions();
        } catch (error) {
            setToast({
                show: true,
                message:
                    error.response?.data?.message ??
                    "Unable to delete chat.",
                type: "danger",
            });
        }
    };

    return (
        <div className="container-fluid chat-page p-0">
            <div className="row h-100 m-0" >

                {/* Sidebar */}

                <div className="col-md-3 border-end d-flex flex-column p-0" style={{ height: "100%" }} >

                    <div className="p-3 border-bottom">
                        <button
                            className="btn btn-primary w-100"
                            onClick={createChat}
                        >
                            <i className="bx bx-plus"></i> New Chat
                        </button>
                    </div>

                    <div className="flex-grow-1 overflow-auto p-2"
                        style={{ minHeight: 0, background: "#fafafa" }}
                    >

                        {sessions.map((session) => (

                            <div
                                key={session.id}
                                className={`card shadow-sm mb-3 ${selectedSession?.id === session.id
                                    ? "border-primary border-2"
                                    : ""
                                    }`}
                            >
                                <div
                                    className={`card-body ${getStatusClass(session)
                                        } ${selectedSession?.id === session.id
                                            ? "active-chat"
                                            : ""
                                        }`}
                                >

                                    {/* Clickable Area */}
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => openChat(session)}
                                    >

                                        {/* Name */}
                                        <div className="fw-bold mb-1">
                                            {session.user.name}
                                        </div>

                                        {/* Message */}
                                        <div
                                            className="text-muted small mb-3"
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {session.messages?.length
                                                ? session.messages[0].message
                                                : "New Chat"}
                                        </div>

                                    </div>

                                    {/* Footer */}
                                    <div className="d-flex justify-content-between align-items-center">

                                        <span
                                            className={`badge ${session.resolution_flag === "resolved"
                                                ? "bg-success"
                                                : session.resolution_flag === "followup"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}
                                        >
                                            {session.resolution_flag === "resolved"
                                                ? "Resolved"
                                                : session.resolution_flag === "followup"
                                                    ? "Follow Up"
                                                    : "Unresolved"}
                                        </span>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSessionToDelete(session);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            <i className="bx bx-trash"></i>
                                        </button>

                                    </div>

                                </div>
                            </div>

                        ))}

                    </div>
                </div>

                {/* Chat */}

                <div className="col-md-9 d-flex flex-column"
                    style={{ height: "100%" }}
                >

                    <div className="d-flex justify-content-between align-items-center border-bottom p-3">

                        <h5 className="mb-0">
                            AI Program Assistant
                        </h5>
                        <Permission permission="chat.resolve">
                        {selectedSession && (
                            <button
                                className="btn btn-success"
                                onClick={resolveChat}
                            >
                                Resolve Chat
                            </button>
                        )}
                        </Permission>
                    </div>

                    <div
                        ref={messagesContainerRef}
                        className="flex-grow-1 overflow-auto p-3"
                        style={{
                            minHeight: 0,
                            background: "#f8f9fa",
                        }}
                    >
                        {messages.map((msg) => (

                            <div
                                key={msg.id}
                                className={`mb-3 d-flex ${determinMessage(msg)
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                    }`}
                            >
                                <div
                                    className={`p-3 rounded ${determinMessage(msg)
                                            ? "bg-primary text-white"
                                            : "bg-light border"
                                        }`}
                                    style={{
                                        maxWidth: "70%",
                                    }}
                                >
                                    <div
                                        className={`fw-bold mb-1 ${determinMessage(msg)
                                                ? "text-white"
                                                : "text-primary"
                                            }`}
                                        style={{ fontSize: "13px" }}
                                    >
                                        {/* {getMessageLabel(msg)} */}
                                    </div>

                                    <div>{msg.message}</div>

                                    <small
                                        className={`d-block mt-2 ${determinMessage(msg)
                                                ? "text-end text-white-50"
                                                : "text-muted"
                                            }`}
                                        style={{
                                            fontSize: "11px",
                                        }}
                                    >
                                        {formatChatTime(msg.created_at)}
                                    </small>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="text-muted">
                                AI is typing...
                            </div>
                        )}

                    </div>
                    {isResolved && (

                        <div className="alert alert-success mb-2">

                            <i className="bx bx-check-circle"></i>

                            This conversation has been resolved.
                            No further messages can be sent.

                        </div>

                    )}

                    {selectedSession && (
                        <div className="border-top p-3 bg-white flex-shrink-0">

                            <div className="input-group">

                                <input
                                    disabled={isResolved}
                                    className="form-control"
                                    placeholder="Ask anything..."
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        sendMessage()
                                    }
                                />

                                <button
                                    className="btn btn-primary"
                                    onClick={sendMessage}
                                    disabled={loading || isResolved}
                                >
                                    Send
                                </button>

                            </div>

                        </div>
                    )}
                </div>
            </div>

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast((prev) => ({
                        ...prev,
                        show: false,
                    }))
                }
            />
            <DeleteModal
                show={showDeleteModal}
                title="Delete Chat"
                message={`Are you sure you want to delete this conversation${sessionToDelete?.user
                    ? ` of "${sessionToDelete.user.name}"`
                    : ""
                    }?`}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSessionToDelete(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Program;