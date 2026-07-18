import React, { useEffect, useState } from 'react';

const UserModal = ({
  show,
  onClose,
  onSubmit,
  user,
  errors = {},
  roles = [],
}) => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    role: '',
    is_active: true,
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (show) {
      if (user) {
        setForm({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.roles?.[0]?.name || '',
          is_active: Boolean(user.is_active),
        });
      } else {
        setForm(initialState);
      }
    }
  }, [show, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'is_active'
          ? value === 'true'
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {user ? 'Edit User' : 'Create User'}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={form.name}
                    onChange={handleChange}
                  />

                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name[0]}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={form.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email[0]}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className={`form-control ${
                      errors.phone
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={form.phone}
                    onChange={handleChange}
                  />

                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Role
                    </label>

                    <select
                        name="role"
                        className={`form-select ${
                        errors.role ? "is-invalid" : ""
                        }`}
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="">
                        Select Role
                        </option>

                        <option value="Admin">
                        Admin
                        </option>

                        <option value="User">
                        User
                        </option>
                    </select>

                    {errors.role && (
                        <div className="invalid-feedback">
                        {errors.role[0]}
                        </div>
                    )}
                    </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    name="is_active"
                    className={`form-select ${
                      errors.is_active
                        ? 'is-invalid'
                        : ''
                    }`}
                    value={String(form.is_active)}
                    onChange={handleChange}
                  >
                    <option value="true">
                      Active
                    </option>

                    <option value="false">
                      Inactive
                    </option>
                  </select>

                  {errors.is_active && (
                    <div className="invalid-feedback">
                      {errors.is_active[0]}
                    </div>
                  )}
                </div>

              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {user ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default UserModal;