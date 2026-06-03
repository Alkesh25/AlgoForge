// 🔐 SAVE USER PROGRESS
export const saveProgress = async (progressData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("https://algoforge-backend-rw73.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(progressData),
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { message: "Error saving progress" };
  }
};