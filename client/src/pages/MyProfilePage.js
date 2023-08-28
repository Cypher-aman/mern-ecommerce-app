import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function MyProfilePage() {
  return (
    <div>
      <NavBar>
       <UserProfile/>
      </NavBar>
    </div>
  );
}

export default MyProfilePage;
