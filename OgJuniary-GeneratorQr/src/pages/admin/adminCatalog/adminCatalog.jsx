import Header from "../../../components/admin/adminHeader/Header";
import Catalog from "../../../components/admin/adminCatalog/Catalog";
import Search from "../../../components/admin/adminSearch/Search";

function adminCatalog() {
  return (
    <div>
      <Header />
      <Search />
      <Catalog />
    </div>
  );
}

export default adminCatalog;
