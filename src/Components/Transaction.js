import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Pencil, Trash2 } from "lucide-react"; // 👈 Lucide icons

const API_URL =
  "https://68762a75814c0dfa653af1cb.mockapi.io/PersonalFinanceTracker";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "Income",
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchTransactions = async () => {
    const res = await axios.get(API_URL);
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...transactions].sort((a, b) => {
      if (field === "amount")
        return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
      if (field === "date")
        return order === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      return order === "asc"
        ? a[field]?.localeCompare(b[field])
        : b[field]?.localeCompare(a[field]);
    });
    setTransactions(sorted);
    setSortField(field);
    setSortOrder(order);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`${API_URL}/${editId}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setShowModal(false);
    setFormData({
      type: "Income",
      amount: "",
      category: "",
      date: "",
      description: "",
    });
    setIsEdit(false);
    fetchTransactions();
  };

  const handleEdit = (txn) => {
    setFormData(txn);
    setEditId(txn.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchTransactions();
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <h4 className="mb-0">Transactions</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add
        </Button>
      </div>

      {/* Removed table-responsive */}
      <div className="w-100">
        <table className="table table-bordered table-sm small align-middle w-100">
          <thead className="table-light">
            <tr>
              <th
                onClick={() => handleSort("type")}
                style={{ cursor: "pointer" }}
              >
                Type
              </th>
              <th
                onClick={() => handleSort("amount")}
                style={{ cursor: "pointer" }}
              >
                Amount
              </th>
              <th
                onClick={() => handleSort("category")}
                style={{ cursor: "pointer" }}
              >
                Category
              </th>
              <th
                onClick={() => handleSort("date")}
                style={{ cursor: "pointer" }}
              >
                Date
              </th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted text-center">
                  No transactions available
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id}>
                  <td style={{ wordBreak: "break-word" }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{txn.type}</Tooltip>}
                    >
                      <span>{txn.type}</span>
                    </OverlayTrigger>
                  </td>
                  <td style={{ wordBreak: "break-word" }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>₹{txn.amount}</Tooltip>}
                    >
                      <span>₹{txn.amount}</span>
                    </OverlayTrigger>
                  </td>
                  <td style={{ wordBreak: "break-word" }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{txn.category}</Tooltip>}
                    >
                      <span>{txn.category}</span>
                    </OverlayTrigger>
                  </td>
                  <td style={{ wordBreak: "break-word" }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{txn.date}</Tooltip>}
                    >
                      <span>
                        {new Date(txn.date).toLocaleDateString("en-IN")}
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td style={{ wordBreak: "break-word" }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>{txn.description || "No description"}</Tooltip>
                      }
                    >
                      <span>{txn.description || "-"}</span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-1">
                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() => handleEdit(txn)}
                      >
                        <Pencil
                          size={18}
                          className="text-warning"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(txn)}
                          title="Edit"
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(txn.id)}
                      >
                        {" "}
                        <Trash2
                          size={18}
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(txn.id)}
                          title="Delete"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setIsEdit(false);
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? "Edit" : "New"} Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Select
              name="type"
              className="mb-2"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
            <Form.Control
              className="mb-2"
              type="number"
              name="amount"
              placeholder="Amount ₹"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <Form.Control
              className="mb-2"
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <Form.Control
              className="mb-2"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Form.Control
              className="mb-2"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => {
                setShowModal(false);
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Transaction;
