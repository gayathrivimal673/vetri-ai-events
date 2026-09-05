import axiosInstance from "./axiosInstance";

// EVENTS
export const getEvents = async () => {
  const response = await axiosInstance.get("/events/");
  return response.data;
};

export const getEvent = async (id) => {
  const response = await axiosInstance.get(`/events/${id}/`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axiosInstance.post("/events/", eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axiosInstance.put(`/events/${id}/`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`/events/${id}/`);
  return response.data;
};


// FUNCTIONS
export const getFunctions = async (eventId) => {
  const response = await axiosInstance.get(`/functions/?event=${eventId}`);
  return response.data;
};

export const createFunction = async (functionData) => {
  const response = await axiosInstance.post("/functions/", functionData);
  return response.data;
};


// TASKS
export const getTasks = async (eventId = null) => {
  const url = eventId
    ? `/tasks/?event=${eventId}`
    : "/tasks/";

  const response = await axiosInstance.get(url);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/tasks/", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axiosInstance.put(`/tasks/${id}/`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/tasks/${id}/`);
  return response.data;
};
// CREW

export const getCrew = async (eventId = null) => {
  const url = eventId
    ? `/crew/?event=${eventId}`
    : "/crew/";

  const response = await axiosInstance.get(url);
  return response.data;
};

export const createCrewMember = async (crewData) => {
  const response = await axiosInstance.post("/crew/", crewData);
  return response.data;
};

export const updateCrewMember = async (id, crewData) => {
  const response = await axiosInstance.put(`/crew/${id}/`, crewData);
  return response.data;
};

export const deleteCrewMember = async (id) => {
  const response = await axiosInstance.delete(`/crew/${id}/`);
  return response.data;
};
// VENDORS

export const getVendors = async () => {
  const response = await axiosInstance.get("/vendors/");
  return response.data;
};

export const getVendor = async (id) => {
  const response = await axiosInstance.get(`/vendors/${id}/`);
  return response.data;
};

export const createVendor = async (vendorData) => {
  const response = await axiosInstance.post("/vendors/", vendorData);
  return response.data;
};

export const updateVendor = async (id, vendorData) => {
  const response = await axiosInstance.put(
    `/vendors/${id}/`,
    vendorData
  );
  return response.data;
};

export const deleteVendor = async (id) => {
  const response = await axiosInstance.delete(
    `/vendors/${id}/`
  );
  return response.data;
};
// VENDOR ASSIGNMENTS

export const getVendorAssignments = async (eventId = null) => {
  const url = eventId
    ? `/vendor-assignments/?event=${eventId}`
    : "/vendor-assignments/";

  const response = await axiosInstance.get(url);
  return response.data;
};

export const createVendorAssignment = async (assignmentData) => {
  const response = await axiosInstance.post(
    "/vendor-assignments/",
    assignmentData
  );
  return response.data;
};

export const updateVendorAssignment = async (id, assignmentData) => {
  const response = await axiosInstance.put(
    `/vendor-assignments/${id}/`,
    assignmentData
  );
  return response.data;
};

export const deleteVendorAssignment = async (id) => {
  const response = await axiosInstance.delete(
    `/vendor-assignments/${id}/`
  );
  return response.data;
};
// ===============================
// FINANCE - BUDGET
// ===============================

export const getBudgets = async (eventId = null) => {
  const url = eventId
    ? `/finance/budgets/?event=${eventId}`
    : "/finance/budgets/";

  const response = await axiosInstance.get(url);
  return response.data;
};

export const createBudget = async (budgetData) => {
  const response = await axiosInstance.post(
    "/finance/budgets/",
    budgetData
  );
  return response.data;
};

export const updateBudget = async (id, budgetData) => {
  const response = await axiosInstance.put(
    `/finance/budgets/${id}/`,
    budgetData
  );
  return response.data;
};

export const deleteBudget = async (id) => {
  const response = await axiosInstance.delete(
    `/finance/budgets/${id}/`
  );
  return response.data;
};


// ===============================
// FINANCE - EXPENSES
// ===============================

export const getExpenses = async (eventId = null) => {
  const url = eventId
    ? `/finance/expenses/?event=${eventId}`
    : "/finance/expenses/";

  const response = await axiosInstance.get(url);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await axiosInstance.post(
    "/finance/expenses/",
    expenseData
  );
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await axiosInstance.put(
    `/finance/expenses/${id}/`,
    expenseData
  );
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axiosInstance.delete(
    `/finance/expenses/${id}/`
  );
  return response.data;
};


// ===============================
// FINANCE - PAYMENTS
// ===============================

export const getPayments = async (eventId = null) => {
  const url = eventId
    ? `/finance/payments/?event=${eventId}`
    : "/finance/payments/";

  const response = await axiosInstance.get(url);
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await axiosInstance.post(
    "/finance/payments/",
    paymentData
  );
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await axiosInstance.put(
    `/finance/payments/${id}/`,
    paymentData
  );
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await axiosInstance.delete(
    `/finance/payments/${id}/`
  );
  return response.data;
};
export const createEvents = async (eventData) => {
  const response = await axiosInstance.post("/events/", eventData);
  return response.data;
};