import Header from "../../../components/admin/adminHeader/Header";
import Catalog from "../../../components/admin/adminCatalog/Catalog";
import Search from "../../../components/admin/adminSearch/Search";

function adminCatalog() {
  return (
    <div>
      <Header HeaderChoiceUser={false} HeaderChoiceBook={true} />
      <Search catalog={true} sort={true} button={true} exit={true} />
      <Catalog />
    </div>
  );
}

export default adminCatalog;
