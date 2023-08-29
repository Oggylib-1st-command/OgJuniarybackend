import "./adminUsersDelete.scss";
import axios from "axios";
export const AdminUsersDelete = ({ handleDelete, id }) => {
  const handleDeleteUser = async () => {
    await axios.delete(`http://localhost:8000/users/${id}/`);
    handleDelete();
    window.location.reload();
  };
  return (
    <div className="admin-users__delete-bg">
      <div className="users-delete">
        <h3 className="users-delete__title">
          Вы точно хотите удалить пользователя?
        </h3>
        <div className="users-delete__btns">
          <button className="users-delete__yes-btn" onClick={handleDeleteUser}>
            ДА
          </button>
          <button className="users-delete__no-btn" onClick={handleDelete}>
            НЕТ
          </button>
        </div>
      </div>
    </div>
  );
};
