import Header from "../../../components/admin/adminHeader/Header";
import Search from "../../../components/admin/adminSearch/Search";

function adminCatalog() {
  return (
    <div>
      <Header HeaderChoiceUser={false} HeaderChoiceBook={true} />
      <Search catalog={true} sort={true} button={true} exit={true} />
    </div>
  );
}

export default adminCatalog;
