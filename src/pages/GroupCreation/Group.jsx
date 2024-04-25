import React, { useState, useEffect } from "react";
import style from "./Group.module.css";
import Modal from "../../components/Modal";

export function getGroupInitials(name) {
  if (name == null) {
    throw new Error("Group name is null");
  }

  const initials = name
    .trim()
    .split(" ")
    .map((word) => {
      if (word == null) {
        throw new Error("Group name contains null word");
      }
      return word.charAt(0).toUpperCase();
    });

  return initials.join("");
}

const Group = ({ setSelectedGroup }) => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGroupState, setSelectedGroupState] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChangeGroupName = (event) => setGroupName(event.target.value);
  const handleColorSelect = (color) => setSelectedColor(color);

  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  const addGroup = () => {
    const normalizedGroupName = groupName
      .trim()
      .replace(/\s/g, "")
      .toLowerCase();
    const groupExists = groups.some(
      (group) =>
        group.name.trim().replace(/\s/g, "").toLowerCase() ===
        normalizedGroupName
    );

    if (groupName.trim() && selectedColor && !groupExists) {
      const newGroup = { name: groupName, color: selectedColor };
      setGroups([...groups, newGroup]);
      localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
      setGroupName("");
      setSelectedColor("");
      setShowModal(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else if (groupExists) {
      alert("Group name already exists!");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Pocket Notes</h1>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
      <div className={style.groups}>
        <div className={style.container}>
          {groups.map((group, index) => (
            <div
              key={index}
              className={`${style.groupItem} ${
                selectedGroupState === group ? style.selected : ""
              }`}
              onClick={() => {
                setSelectedGroup(group);
                setSelectedGroupState(group);
              }}
            >
              <div
                className={style.round}
                style={{ backgroundColor: group.color }}
              >
                {getGroupInitials(group.name)}
              </div>
              <span className={style.groupName}>{group.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setShowModal(true)} className={style.addButton}>
        +
      </button>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          addGroup={addGroup}
          groupName={groupName}
          selectedColor={selectedColor}
          handleChangeGroupName={handleChangeGroupName}
          handleColorSelect={handleColorSelect}
        />
      )}
    </div>
  );
};

export default Group;
