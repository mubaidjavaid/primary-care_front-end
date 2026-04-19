export default function UsersTable({ users = [], renderActions }) {
  return (
    <div className="card overflow-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b border-medical-border text-xs uppercase text-medical-muted">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Facility</th>
            <th>Status</th>
            {renderActions ? <th className="p-3 text-right">Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id || user._id} className="border-b border-slate-100">
              <td className="p-3">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.facility || "-"}</td>
              <td>{user.isActive ? "Active" : "Disabled"}</td>
              {renderActions ? (
                <td className="p-3 text-right">{renderActions(user)}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
