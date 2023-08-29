import Header from "../../../components/admin/adminHeader/Header";
import "./adminEdit.scss";
import { AdminAddBook } from "../../../components/admin/adminAddBook/AdminAddBook";

export const AdminEdit = () => {
  return (
    <div>
      <Header />
      <div className="add__content">
        <div className="add__info">
          <AdminAddBook />
        </div>
      </div>
    </div>
  );
};
