const API_URL = "http://localhost:5000/api/cards";

// Получить все карточки
export const getCards = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Добавить новую карточку
export const addCard = async (card) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  return response.json();
};

// Удалить карточку по ID
export const deleteCard = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
