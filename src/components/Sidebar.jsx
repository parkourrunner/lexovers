import React from "react";
import "./_Sidebar.scss"
import wtopic from "../img/wtopic.svg";
import wprofile from "../img/wprofile.svg";
import wgeneral from "../img/wgeneral.svg";
import wadd_cardadd_card from "../img/wadd-cardadd-card.svg";


function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <button>
          <div className="buttonDesign">
            <img src={wtopic} alt="topic Dictionary" />
          </div>
          <span> Тематические словари</span>
        </button>
        <button>
          <div className="buttonDesign">
            <img src={wtopic} alt="general Dictionary" />
          </div>
          <span>Общие словари</span>
        </button>
        <button>
          <div className="buttonDesign">
            <img src={wgeneral} alt="articles" />
          </div>
          <span>Статьи</span>
        </button>
        <button>
          <div className="buttonDesign">
            <img src={wadd_cardadd_card} alt="add cards" />
          </div>
          <span>Добавить карточки</span>
        </button>
        <button>
          <div className="buttonDesign">
            <img src={wtopic} alt="about" />
          </div>
          <span> О проекте</span>
        </button>
        <button>
          <div className="buttonDesign">
            <img src={wprofile} alt="profile" />
          </div>
          <span>Профиль</span>
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;
