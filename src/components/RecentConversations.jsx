const RecentConversations = ({ sessions = [] }) => {
    return (
        <div className="card">

            <div className="card-header">
                <h5 className="mb-0">
                    Recent Conversations
                </h5>
            </div>

            <div className="table-responsive">

                <table className="table">

                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Question</th>
                            <th>Status</th>
                            <th>Started</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sessions.map((session) => (
                            <tr key={session.id}>
                                <td>
                                    {session.user.name}
                                </td>
                                <td>
                                    {session.messages.length
                                        ? session.messages[0].message
                                        : "-"}
                                </td>
                                <td>
                                    <span
                                        className={`badge ${session.resolution_flag === "resolved"
                                                ? "bg-success"
                                                : session.resolution_flag ===
                                                    "followup"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                            }`}
                                    >
                                        {session.resolution_flag}
                                    </span>
                                </td>
                                <td>
                                    {new Date(
                                        session.started_at
                                    ).toLocaleString()}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentConversations;