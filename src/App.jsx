import React, { useEffect, useState } from "react";
import { getCards, addCard, deleteCard } from "./api/cards";

function App() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Получаем карточки при загрузке страницы
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const data = await getCards();
    setCards(data);
  };

  const handleAddCard = async () => {
    const newCard = { title, description, image_url: imageUrl, user_id: 1 };
    await addCard(newCard);
    fetchCards();
    // Сбрасываем поля ввода
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  const handleDeleteCard = async (id) => {
    await deleteCard(id);
    fetchCards();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Пасхалки из игр</h1>

      {/* Форма для добавления карточки */}
      <div>
        <input
          type="text"
          placeholder="Название пасхалки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL изображения"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={handleAddCard}>Добавить</button>
      </div>

      {/* Сетка карточек */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <img src={card.image_url} alt={card.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <button onClick={() => handleDeleteCard(card.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
