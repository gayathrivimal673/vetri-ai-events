import { useEffect, useMemo, useState } from "react";
import {
  getEvents,
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../../api/eventsApi";

import "./Budget.css";

function Budget() {
  // =========================
  // STATES
  // =========================

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [financeLoading, setFinanceLoading] = useState(false);
  const [error, setError] = useState("");

  // Budget form
  const [budgetForm, setBudgetForm] = useState({
    total_budget: "",
    notes: "",
  });

  // Expense form
  const [expenseForm, setExpenseForm] = useState({
    category: "photography",
    title: "",
    amount: "",
    status: "planned",
    due_date: "",
    notes: "",
  });

  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    expense: "",
    description: "",
    amount: "",
    payment_date: "",
    status: "pending",
    transaction_id: "",
    notes: "",
  });

  // =========================
  // LOAD EVENTS
  // =========================

  const loadEvents = async () => {
    try {
      const data = await getEvents();

      const eventList = Array.isArray(data)
        ? data
        : data?.results || [];

      console.log("EVENTS FROM API:", eventList);

      setEvents(eventList);

      // Automatically select first event
      if (eventList.length > 0) {
        setSelectedEvent((current) => {
          if (current) {
            const stillExists = eventList.some(
              (event) => String(event.id) === String(current)
            );

            if (stillExists) {
              return current;
            }
          }

          return String(eventList[0].id);
        });
      }
    } catch (error) {
      console.error("EVENT LOAD ERROR:", error);

      setEvents([]);
      setError("Unable to load events.");
    }
  };

  // =========================
  // LOAD FINANCE DATA
  // =========================

  const loadFinanceData = async (eventId) => {
    if (!eventId) {
      setBudgets([]);
      setExpenses([]);
      setPayments([]);
      return;
    }

    try {
      setFinanceLoading(true);
      setError("");

      console.log("Loading finance for event:", eventId);

      const results = await Promise.allSettled([
        getBudgets(eventId),
        getExpenses(eventId),
        getPayments(eventId),
      ]);

      // Budget
      if (results[0].status === "fulfilled") {
        const budgetData = results[0].value;

        setBudgets(
          Array.isArray(budgetData)
            ? budgetData
            : budgetData?.results || []
        );
      } else {
        console.error(
          "BUDGET API ERROR:",
          results[0].reason
        );
        setBudgets([]);
      }

      // Expenses
      if (results[1].status === "fulfilled") {
        const expenseData = results[1].value;

        setExpenses(
          Array.isArray(expenseData)
            ? expenseData
            : expenseData?.results || []
        );
      } else {
        console.error(
          "EXPENSE API ERROR:",
          results[1].reason
        );
        setExpenses([]);
      }

      // Payments
      if (results[2].status === "fulfilled") {
        const paymentData = results[2].value;

        setPayments(
          Array.isArray(paymentData)
            ? paymentData
            : paymentData?.results || []
        );
      } else {
        console.error(
          "PAYMENT API ERROR:",
          results[2].reason
        );
        setPayments([]);
      }

      const hasError = results.some(
        (result) => result.status === "rejected"
      );

      if (hasError) {
        setError(
          "Some finance data could not be loaded. Please check the backend."
        );
      }
    } catch (error) {
      console.error("FINANCE ERROR:", error);
      setError("Unable to load finance data.");
    } finally {
      setFinanceLoading(false);
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const start = async () => {
      setLoading(true);
      await loadEvents();
      setLoading(false);
    };

    start();
  }, []);

  // =========================
  // LOAD FINANCE WHEN EVENT CHANGES
  // =========================

  useEffect(() => {
    if (selectedEvent) {
      loadFinanceData(selectedEvent);
    }
  }, [selectedEvent]);

  // =========================
  // SELECTED EVENT
  // =========================

  const currentEvent = useMemo(() => {
    return events.find(
      (event) => String(event.id) === String(selectedEvent)
    );
  }, [events, selectedEvent]);

  // =========================
  // CALCULATIONS
  // =========================

  const totalBudget = budgets.reduce(
    (sum, item) => sum + Number(item.total_budget || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalPaid = payments
    .filter((payment) => payment.status === "paid")
    .reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

  const remaining = totalBudget - totalExpenses;

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  // =========================
  // BUDGET FORM
  // =========================

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;

    setBudgetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBudget = async () => {
    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    if (!budgetForm.total_budget) {
      alert("Please enter total budget.");
      return;
    }

    try {
      const existingBudget = budgets.find(
        (budget) =>
          String(budget.event) === String(selectedEvent)
      );

      const payload = {
        event: Number(selectedEvent),
        total_budget: Number(budgetForm.total_budget),
        notes: budgetForm.notes || "",
      };

      if (existingBudget) {
        const updated = await updateBudget(
          existingBudget.id,
          payload
        );

        setBudgets([updated]);
      } else {
        const created = await createBudget(payload);

        setBudgets((prev) => [...prev, created]);
      }

      setBudgetForm({
        total_budget: "",
        notes: "",
      });

      alert("Budget saved successfully.");
    } catch (error) {
      console.error("BUDGET CREATE ERROR:", error);
      console.error("BACKEND:", error.response?.data);

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Unable to save budget."
      );
    }
  };

  // =========================
  // DELETE BUDGET
  // =========================

  const handleDeleteBudget = async (id) => {
    if (!window.confirm("Delete this budget?")) {
      return;
    }

    try {
      await deleteBudget(id);

      setBudgets((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("DELETE BUDGET ERROR:", error);
      alert("Unable to delete budget.");
    }
  };

  // =========================
  // EXPENSE FORM
  // =========================

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;

    setExpenseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExpense = async () => {
    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    if (!expenseForm.title) {
      alert("Please enter expense title.");
      return;
    }

    if (!expenseForm.amount) {
      alert("Please enter expense amount.");
      return;
    }

    try {
      const payload = {
        event: Number(selectedEvent),
        category: expenseForm.category,
        title: expenseForm.title,
        amount: Number(expenseForm.amount),
        status: expenseForm.status,
        due_date: expenseForm.due_date || null,
        notes: expenseForm.notes || "",
      };

      const created = await createExpense(payload);

      setExpenses((prev) => [created, ...prev]);

      setExpenseForm({
        category: "photography",
        title: "",
        amount: "",
        status: "planned",
        due_date: "",
        notes: "",
      });

      alert("Expense added successfully.");
    } catch (error) {
      console.error("EXPENSE CREATE ERROR:", error);
      console.error("BACKEND:", error.response?.data);

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Unable to add expense."
      );
    }
  };

  // =========================
  // DELETE EXPENSE
  // =========================

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) {
      return;
    }

    try {
      await deleteExpense(id);

      setExpenses((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("DELETE EXPENSE ERROR:", error);
      alert("Unable to delete expense.");
    }
  };

  // =========================
  // UPDATE EXPENSE STATUS
  // =========================

  const handleExpenseStatus = async (expense) => {
    const nextStatus =
      expense.status === "planned"
        ? "approved"
        : expense.status === "approved"
        ? "paid"
        : "planned";

    try {
      const updated = await updateExpense(expense.id, {
        event: expense.event,
        category: expense.category,
        title: expense.title,
        amount: Number(expense.amount),
        status: nextStatus,
        due_date: expense.due_date || null,
        notes: expense.notes || "",
      });

      setExpenses((prev) =>
        prev.map((item) =>
          item.id === expense.id ? updated : item
        )
      );
    } catch (error) {
      console.error("UPDATE EXPENSE ERROR:", error);
      alert("Unable to update expense.");
    }
  };

  // =========================
  // PAYMENT FORM
  // =========================

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPayment = async () => {
    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    if (!paymentForm.description) {
      alert("Please enter payment description.");
      return;
    }

    if (!paymentForm.amount) {
      alert("Please enter payment amount.");
      return;
    }

    try {
      const payload = {
        event: Number(selectedEvent),
        expense: paymentForm.expense
          ? Number(paymentForm.expense)
          : null,
        description: paymentForm.description,
        amount: Number(paymentForm.amount),
        payment_date:
          paymentForm.payment_date || null,
        status: paymentForm.status,
        transaction_id:
          paymentForm.transaction_id || "",
        notes: paymentForm.notes || "",
      };

      const created = await createPayment(payload);

      setPayments((prev) => [created, ...prev]);

      setPaymentForm({
        expense: "",
        description: "",
        amount: "",
        payment_date: "",
        status: "pending",
        transaction_id: "",
        notes: "",
      });

      alert("Payment added successfully.");
    } catch (error) {
      console.error("PAYMENT CREATE ERROR:", error);
      console.error("BACKEND:", error.response?.data);

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Unable to add payment."
      );
    }
  };

  // =========================
  // DELETE PAYMENT
  // =========================

  const handleDeletePayment = async (id) => {
    if (!window.confirm("Delete this payment?")) {
      return;
    }

    try {
      await deletePayment(id);

      setPayments((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("DELETE PAYMENT ERROR:", error);
      alert("Unable to delete payment.");
    }
  };

  // =========================
  // UPDATE PAYMENT STATUS
  // =========================

  const handlePaymentStatus = async (payment) => {
    let nextStatus = "pending";

    if (payment.status === "pending") {
      nextStatus = "partial";
    } else if (payment.status === "partial") {
      nextStatus = "paid";
    } else {
      nextStatus = "pending";
    }

    try {
      const updated = await updatePayment(payment.id, {
        event: payment.event,
        expense: payment.expense || null,
        description: payment.description,
        amount: Number(payment.amount),
        payment_date: payment.payment_date || null,
        status: nextStatus,
        transaction_id:
          payment.transaction_id || "",
        notes: payment.notes || "",
      });

      setPayments((prev) =>
        prev.map((item) =>
          item.id === payment.id ? updated : item
        )
      );
    } catch (error) {
      console.error("UPDATE PAYMENT ERROR:", error);
      alert("Unable to update payment.");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="budget-page">
        <div className="budget-loading">
          <div className="budget-loader"></div>
          <h3>Loading Budget & Payments...</h3>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="budget-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="budget-header">
        <div>
          <span className="budget-eyebrow">
            FINANCE CONTROL
          </span>

          <h1>Budget & Payments</h1>

          <p>
            Track event budgets, expenses and payments from one place.
          </p>
        </div>

        <div className="event-selector-wrapper">
          <label>Select Event</label>

          <select
            value={selectedEvent}
            onChange={(e) =>
              setSelectedEvent(e.target.value)
            }
          >
            <option value="">Select Event</option>

            {events.map((event) => (
              <option
                key={event.id}
                value={event.id}
              >
                {event.event_id
                  ? `${event.event_id} - ${event.event_name}`
                  : event.event_name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="budget-error">
          {error}
        </div>
      )}

      {/* =========================
          NO EVENTS
      ========================= */}

      {events.length === 0 && (
        <div className="budget-empty-event">
          <div className="empty-icon">📅</div>

          <h3>No Events Found</h3>

          <p>
            Create an event first. Your events will appear
            in the Select Event dropdown.
          </p>
        </div>
      )}

      {/* =========================
          SELECTED EVENT
      ========================= */}

      {currentEvent && (
        <div className="selected-event-banner">
          <div>
            <span>ACTIVE EVENT</span>
            <h3>{currentEvent.event_name}</h3>
          </div>

          <div className="selected-event-meta">
            <span>
              {currentEvent.event_id}
            </span>

            <span>
              {currentEvent.event_date}
            </span>

            <span>
              {currentEvent.expected_guests || 0} Guests
            </span>
          </div>
        </div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <section className="budget-stats">

        <div className="budget-stat-card">
          <div className="stat-icon purple">
            💰
          </div>

          <div>
            <span>Total Budget</span>
            <strong>{formatMoney(totalBudget)}</strong>
          </div>
        </div>

        <div className="budget-stat-card">
          <div className="stat-icon pink">
            📊
          </div>

          <div>
            <span>Total Expenses</span>
            <strong>{formatMoney(totalExpenses)}</strong>
          </div>
        </div>

        <div className="budget-stat-card">
          <div className="stat-icon green">
            ✨
          </div>

          <div>
            <span>Remaining</span>
            <strong>
              {formatMoney(remaining)}
            </strong>
          </div>
        </div>

        <div className="budget-stat-card">
          <div className="stat-icon yellow">
            ✓
          </div>

          <div>
            <span>Payments Paid</span>
            <strong>
              {formatMoney(totalPaid)}
            </strong>
          </div>
        </div>

      </section>

      {/* =========================
          NO EVENT SELECTED
      ========================= */}

      {!selectedEvent && events.length > 0 && (
        <div className="budget-select-message">
          <div>👆</div>

          <h3>Select an Event</h3>

          <p>
            Choose an event from the dropdown above
            to manage its budget, expenses and payments.
          </p>
        </div>
      )}

      {/* =========================
          MAIN CONTENT
      ========================= */}

      {selectedEvent && (
        <>

          {/* =========================
              BUDGET OVERVIEW
          ========================= */}

          <section className="budget-section">

            <div className="section-heading">
              <div>
                <span>BUDGET OVERVIEW</span>
                <h2>Event Budget</h2>
              </div>

              <div className="section-total">
                {formatMoney(totalBudget)}
              </div>
            </div>

            <div className="budget-form">

              <input
                type="number"
                name="total_budget"
                placeholder="Total budget"
                value={budgetForm.total_budget}
                onChange={handleBudgetChange}
              />

              <input
                type="text"
                name="notes"
                placeholder="Budget notes"
                value={budgetForm.notes}
                onChange={handleBudgetChange}
              />

              <button
                type="button"
                onClick={handleAddBudget}
              >
                Save Budget
              </button>

            </div>

            {budgets.length > 0 && (
              <div className="budget-list">

                {budgets.map((budget) => (
                  <div
                    className="budget-row"
                    key={budget.id}
                  >
                    <div>
                      <strong>
                        {formatMoney(
                          budget.total_budget
                        )}
                      </strong>

                      <span>
                        {budget.notes ||
                          "No notes added"}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteBudget(
                          budget.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                ))}

              </div>
            )}

          </section>

          {/* =========================
              EXPENSES
          ========================= */}

          <section className="budget-section">

            <div className="section-heading">
              <div>
                <span>EXPENSE MANAGEMENT</span>
                <h2>Expenses</h2>
              </div>

              <div className="section-total">
                {formatMoney(totalExpenses)}
              </div>
            </div>

            <div className="expense-form">

              <select
                name="category"
                value={expenseForm.category}
                onChange={handleExpenseChange}
              >
                <option value="venue">
                  Venue
                </option>

                <option value="catering">
                  Catering
                </option>

                <option value="decoration">
                  Decoration
                </option>

                <option value="photography">
                  Photography
                </option>

                <option value="videography">
                  Videography
                </option>

                <option value="transportation">
                  Transportation
                </option>

                <option value="entertainment">
                  Entertainment
                </option>

                <option value="makeup">
                  Makeup
                </option>

                <option value="printing">
                  Printing
                </option>

                <option value="other">
                  Other
                </option>
              </select>

              <input
                type="text"
                name="title"
                placeholder="Expense title"
                value={expenseForm.title}
                onChange={handleExpenseChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
              />

              <input
                type="date"
                name="due_date"
                value={expenseForm.due_date}
                onChange={handleExpenseChange}
              />

              <select
                name="status"
                value={expenseForm.status}
                onChange={handleExpenseChange}
              >
                <option value="planned">
                  Planned
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>

              <button
                type="button"
                onClick={handleAddExpense}
              >
                Add
              </button>

            </div>

            <div className="finance-table-wrapper">

              {expenses.length === 0 ? (
                <div className="finance-empty">
                  No expenses available for this event.
                </div>
              ) : (
                <table className="finance-table">

                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {expenses.map((expense) => (
                      <tr key={expense.id}>

                        <td>
                          <span className="category-pill">
                            {expense.category}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {expense.title}
                          </strong>
                        </td>

                        <td>
                          {formatMoney(
                            expense.amount
                          )}
                        </td>

                        <td>
                          <button
                            type="button"
                            className={`status-pill ${expense.status}`}
                            onClick={() =>
                              handleExpenseStatus(
                                expense
                              )
                            }
                          >
                            {expense.status}
                          </button>
                        </td>

                        <td>
                          {expense.due_date || "-"}
                        </td>

                        <td>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteExpense(
                                expense.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>
              )}

            </div>

          </section>

          {/* =========================
              PAYMENTS
          ========================= */}

          <section className="budget-section">

            <div className="section-heading">
              <div>
                <span>PAYMENT TRACKING</span>
                <h2>Payments</h2>
              </div>

              <div className="section-total">
                {formatMoney(totalPaid)}
              </div>
            </div>

            <div className="payment-form">

              <select
                name="expense"
                value={paymentForm.expense}
                onChange={handlePaymentChange}
              >
                <option value="">
                  Select Expense
                </option>

                {expenses.map((expense) => (
                  <option
                    key={expense.id}
                    value={expense.id}
                  >
                    {expense.title}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="description"
                placeholder="Payment description"
                value={paymentForm.description}
                onChange={handlePaymentChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={paymentForm.amount}
                onChange={handlePaymentChange}
              />

              <input
                type="date"
                name="payment_date"
                value={paymentForm.payment_date}
                onChange={handlePaymentChange}
              />

              <select
                name="status"
                value={paymentForm.status}
                onChange={handlePaymentChange}
              >
                <option value="pending">
                  Pending
                </option>

                <option value="partial">
                  Partial
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="overdue">
                  Overdue
                </option>
              </select>

              <input
                type="text"
                name="transaction_id"
                placeholder="Transaction ID"
                value={paymentForm.transaction_id}
                onChange={handlePaymentChange}
              />

              <button
                type="button"
                onClick={handleAddPayment}
              >
                Add
              </button>

            </div>

            <div className="finance-table-wrapper">

              {payments.length === 0 ? (
                <div className="finance-empty">
                  No payments available for this event.
                </div>
              ) : (
                <table className="finance-table">

                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Expense</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {payments.map((payment) => (
                      <tr key={payment.id}>

                        <td>
                          <strong>
                            {payment.description}
                          </strong>
                        </td>

                        <td>
                          {payment.expense_title ||
                            "-"}
                        </td>

                        <td>
                          {formatMoney(
                            payment.amount
                          )}
                        </td>

                        <td>
                          {payment.payment_date ||
                            "-"}
                        </td>

                        <td>
                          <button
                            type="button"
                            className={`status-pill ${payment.status}`}
                            onClick={() =>
                              handlePaymentStatus(
                                payment
                              )
                            }
                          >
                            {payment.status}
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDeletePayment(
                                payment.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>
              )}

            </div>

          </section>

          {/* =========================
              AI FINANCE ASSISTANT
          ========================= */}

          <section className="ai-finance-card">

            <div className="ai-finance-icon">
              ✨
            </div>

            <div className="ai-finance-content">

              <span>AI FINANCE ASSISTANT</span>

              <h2>Smart Budget Insights</h2>

              <p>
                Keep your event spending under control.
                Review your budget, expenses and payments
                from one place.
              </p>

              <div className="ai-finance-points">
                <span>
                  ✓ Budget tracking
                </span>

                <span>
                  ✓ Expense monitoring
                </span>

                <span>
                  ✓ Payment tracking
                </span>

                <span>
                  ✓ Remaining budget
                </span>
              </div>

            </div>

          </section>

        </>
      )}

      {financeLoading && selectedEvent && (
        <div className="finance-loading">
          Updating finance data...
        </div>
      )}

    </div>
  );
}

export default Budget;