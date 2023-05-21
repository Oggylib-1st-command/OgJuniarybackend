import Header from "../../../components/admin/adminHeader/Header";
import "./adminEdit.scss";
import Search from "../../../components/admin/adminSearch/Search";
import { AdminAddBook } from "../../../components/admin/adminAddBook/AdminAddBook";

export const AdminEdit = () => {
  return (
    <div>
      <Header />
      <div className="add__content">
        <Search />
        <div className="add__info">
          <AdminAddBook />
        </div>
      </div>
    </div>
  );
};
