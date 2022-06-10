import React from "react";
import "./DragAndDrop_v2.css";
const DragAndDrop_v2 = () => {
  const [cardList, setCardList] = React.useState([
    { id: 1, order: 3, text: "Карточка 3" },
    { id: 2, order: 1, text: "Карточка 1" },
    { id: 3, order: 2, text: "Карточка 2" },
    { id: 4, order: 4, text: "Карточка 4" },
  ]);

  const [currentCard, setCurrentCard] = React.useState(null);
  console.log("state", currentCard);
  //когда отпустил карточку
  function dragEndHandler(e) {
    e.target.style.background = "blue";
  }

  //когда взял карточку в руки
  function dragStartHandler(e, card) {
    e.target.style.background = "lightgray";
    setCurrentCard(card);
  }

  // оповещает если мы вышли за передлы своей карточки
  function dragLeave(e) {
    console.log(e.target.innerHTML);
    e.target.style.boxShadow = "none";
    e.target.style.background = "none";
  }

  // показывает над какими жлементами карточка перемещается
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === "card") {
      e.target.style.boxShadow = "8px 6px 8px 0px black";
      e.target.style.background = "red";
      console.log(1);
    }
  }

  function dropHandler(e, card) {
    e.preventDefault();
    console.log("dropHandle", card);
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
  }
  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <div className="app">
      {cardList.sort(sortCards).map((card) => (
        <div
          draggable={true}
          onDragEnd={(e) => {
            dragEndHandler(e);
          }}
          onDragStart={(e) => {
            dragStartHandler(e, card);
          }}
          onDragLeave={(e) => {
            dragLeave(e);
          }}
          onDragOver={(e) => {
            dragOverHandler(e);
          }}
          onDrop={(e) => {
            dropHandler(e, card);
          }}
          key={card.id}
          className="card"
        >
          {card.text}
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop_v2;
