import React, { useState, useEffect } from "react";
import style from "./Notes.module.css";
import arrow1 from "../../assets/arrow1.png";
import arrow2 from "../../assets/arrow2.png";
import backBtn from "../../assets/backBtn.png";

const CreateNote = ({ group, getGroupInitials, setSelectedGroup }) => {
  const [allNotes, setAllNotes] = useState({});
  const [newNote, setNewNote] = useState("");
  const [isTextPresent, setIsTextPresent] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setAllNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleArrowClick = () => {
    if (newNote.trim()) {
      const currentDate = new Date();
      const timestamp = `${currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })} • ${currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
      const newNoteObj = { text: newNote.trim(), timestamp };
      const updatedNotes = {
        ...allNotes,
        [group.name]: [...(allNotes[group.name] || []), newNoteObj],
      };
      setAllNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNewNote("");
      setIsTextPresent(false);
    }
  };

  const groupNotes = allNotes[group.name] || [];

  return (
    <div className={style.noteContainer}>
      <div className={style.noteHeader}>
        <img
          className={style.backButton}
          onClick={() => setSelectedGroup(null)}
          src={backBtn}
          alt="back button"
        />
        <div
          className={style.groupCircle}
          style={{ backgroundColor: group.color }}
        >
          {getGroupInitials(group.name)}
        </div>
        <div className={style.noteHeaderText}>{group.name}</div>
      </div>
      <div className={style.noteBodyContainer}>
        <div className={style.noteBody}>
          {groupNotes.map((note, index) => (
            <div key={index} className={style.notes}>
              <p className={style.noteText}>{note.text}</p>
              <h4 className={style.noteTimestamp}>{note.timestamp}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className={style.noteInput}>
        <div className={style.inputWrapper}>
          <textarea
            value={newNote}
            onChange={(e) => {
              setNewNote(e.target.value);
              setIsTextPresent(e.target.value.trim().length > 0);
            }}
            placeholder="Enter your text here..."
            rows={10}
            cols={130}
          />
          <img
            src={isTextPresent ? arrow2 : arrow1}
            alt="arrow"
            onClick={handleArrowClick}
            className={style.arrowIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
