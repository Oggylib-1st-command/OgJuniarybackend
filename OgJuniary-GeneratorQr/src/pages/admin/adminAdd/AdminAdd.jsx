import Header from "../../../components/admin/adminHeader/Header";
import "./adminAdd.scss";
import Search from "../../../components/admin/adminSearch/Search";
import { AdminAddBook } from "../../../components/admin/adminAddBook/AdminAddBook";

export const AdminAdd = () => {
  return (
    <div>
      <Header />
      <Search catalog={false} sort={false} button={false} exit={true} />
      <div className="add__content">
        <div className="add__info">
          <AdminAddBook />
        </div>
      </div>
    </div>
  );
};
