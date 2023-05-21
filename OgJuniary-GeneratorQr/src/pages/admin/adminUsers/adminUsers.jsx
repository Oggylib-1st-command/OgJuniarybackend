import Header from "../../../components/admin/adminHeader/Header";
import Users from "../../../components/admin/adminUsers/Users";

function adminUsers() {
  return (
    <div>
      <Header HeaderChoiceUser={true} HeaderChoiceBook={false} />
      <Users />
    </div>
  );
}

export default adminUsers;
