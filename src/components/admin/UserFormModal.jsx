import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Select from "../ui/Select";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "doctor",
};

export default function UserFormModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  const handleCreateUser = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Name, email and password are required");
      return;
    }

    setLoading(true);
    try {
      await authService.createUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });
      toast.success("User created successfully");
      onCreated?.();
      onClose?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="font-display text-3xl">Create User</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Input
          label="Name"
          id="user-name"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <Input
          label="Email"
          id="user-email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <Input
          label="Temporary Password"
          id="user-pass"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
        />
        <Select
          label="Role"
          id="user-role"
          value={form.role}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, role: event.target.value }))
          }
          options={[
            { value: "doctor", label: "Doctor" },
            { value: "admin", label: "Admin" },
            { value: "viewer", label: "Viewer" },
          ]}
        />
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreateUser} disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </Button>
      </div>
    </Modal>
  );
}
