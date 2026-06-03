const BASE = "https://algoforge-backend-rw73.onrender.com/api/auth";

// UPDATE PROGRESS
export const updateProgress = async (topic, questionId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ topic, questionId }),
  });

  return await res.json();
};

// GET PROGRESS
export const getProgress = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/progress`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

// SAVE QUIZ
export const saveQuiz = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

// GET QUIZ HISTORY
export const getQuizHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/quiz`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};