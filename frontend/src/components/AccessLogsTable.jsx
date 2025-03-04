import React, { useEffect, useState } from "react";
import accessLogService from "../services/accessLogService";
import "../styles/AccessLogsTable.css";

const AccessLogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await accessLogService.getAccessLogs();
        setLogs(data);
      } catch (err) {
        setError("Failed to load access logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="access-logs-container">
      <h2 className="access-logs-title">Access Logs</h2>
      {loading && <p className="access-logs-loading">Loading...</p>}
      {error && <p className="access-logs-error">{error}</p>}
      {!loading && !error && logs.length === 0 && (
        <p className="access-logs-empty">No logs found.</p>
      )}
      {!loading && !error && logs.length > 0 && (
        <table className="access-logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user_name}</td>
                <td>{log.user_email}</td>
                <td className={`access-logs-action ${log.action.toLowerCase()}`}>
                  {log.action}
                </td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccessLogsTable;
