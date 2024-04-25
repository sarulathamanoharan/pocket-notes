import React, { useEffect, useRef } from "react";
import style from "./Modal.module.css";

const Modal = ({
  setShowModal,
  addGroup,
  groupName,
  selectedColor,
  handleChangeGroupName,
  handleColorSelect,
}) => {
  const colors = [
    "#0047FF",
    "#43E6FC",
    "#6691FF",
    "#B38BFA",
    "#F19576",
    "#FF79F2",
  ];

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addGroup();
  };

  return (
    <div className={style.modal}>
      <form action="" onSubmit={handleSubmit} ref={modalRef}>
        <p>Create New Group</p>
        <div>
          <label htmlFor="name" className={style.gname}>
            Group Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter group name"
            className={style.ginput}
            onChange={handleChangeGroupName}
          />
        </div>
        <div className={style.container}>
          <label htmlFor="color" className={style.gcolor}>
            Choose Color
          </label>
          <div className={style.Color}>
            {colors.map((color) => (
              <div
                key={color}
                className={`${style.round} ${
                  selectedColor === color ? style.selected : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>
        <button type="submit" className={style.btn}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Modal;
