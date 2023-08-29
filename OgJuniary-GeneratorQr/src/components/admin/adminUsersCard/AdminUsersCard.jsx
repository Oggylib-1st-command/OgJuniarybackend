import "./adminUsersCard.scss";
import getImageKey from "./../../../components/getImageKey";
import { useState } from "react";
import axios from "axios";
import { AdminUsersEdit } from "./AdminUsersEdit";
export const AdminUsersCard = ({
  handleDelete,
  handleTaken,
  userName,
  surname,
  mail,
  id,
}) => {
  const [edit, setEdit] = useState(false);
  const [newInfo, setNewInfo] = useState({ name: "", surname: "", email: "" });
  const handleEdit = async () => {
    const info = await axios.get(`http://localhost:8000/users/${id}/`);
    setNewInfo({
      ...newInfo,
      name: info.data.name,
      surname: info.data.surname,
      email: info.data.email,
    });
    setEdit(!edit);
  };
  const chooseName = async () => {
    await axios.patch(`http://localhost:8000/users/${id}/`, newInfo);
    setEdit(!edit);
    window.location.reload();
  };
  return (
    <div className="users__content-card">
      {edit ? (
        <>
          <div className="users__info">
            <img
              className="users__info-avatar"
              src={getImageKey("UserIcon")}
              alt=""
            />
            <div className="users__info-text">
              <div className="fullname">
                <input
                  className="users__info-input"
                  type="text"
                  value={newInfo.name}
                  onChange={(e) =>
                    setNewInfo(() => ({ ...newInfo, name: e.target.value }))
                  }
                />
                <input
                  className="users__info-input"
                  type="text"
                  value={newInfo.surname}
                  onChange={(e) =>
                    setNewInfo(() => ({ ...newInfo, surname: e.target.value }))
                  }
                />
              </div>
              <input
                className="users__info-input"
                value={newInfo.email}
                onChange={(e) =>
                  setNewInfo(() => ({ ...newInfo, email: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="edit__options">
            <button className="users__edit-save" onClick={chooseName}>
              Сохранить всё
            </button>
            <button className="users__edit-cancel" onClick={handleEdit}>
              Отменить всё
            </button>
          </div>
        </>
      ) : (
        <AdminUsersEdit
          userName={userName}
          surname={surname}
          mail={mail}
          handleTaken={handleTaken}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          id={id}
        />
      )}
    </div>
  );
};
