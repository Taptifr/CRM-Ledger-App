import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [transactionForm, setTransactionForm] = useState({
    customerId: "",
    description: "",
    amount: "",
  });
  const [transactions, setTransactions] = useState([]);

  // Fetch customers
  const getCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomers();
    getTransactions();
  }, []);

  // Add customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/add-customer", form);
    setForm({ name: "", email: "", phone: "" });
    getCustomers();
  };

  // Add transaction
  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/add-transaction", transactionForm);
    setTransactionForm({ customerId: "", description: "", amount: "" });
    getTransactions();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CRM Ledger App</h1>

      {/* Add Customer */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h2>Add Customer</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Add Transaction */}
      <form onSubmit={handleTransactionSubmit} style={{ marginBottom: "20px" }}>
        <h2>Add Transaction</h2>
        <select
          value={transactionForm.customerId}
          onChange={(e) => setTransactionForm({ ...transactionForm, customerId: e.target.value })}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Description"
          value={transactionForm.description}
          onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={transactionForm.amount}
          onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>

      {/* Customer List */}
      <h2>Customer List</h2>
      <ul>
        {customers.map((c) => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
          </li>
        ))}
      </ul>

      {/* Transaction List */}
      <h2>Transactions</h2>
      <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.customerId?.name || "Unknown"}</td>
              <td>{t.description}</td>
              <td>{t.amount}</td>
              <td>{new Date(t.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
