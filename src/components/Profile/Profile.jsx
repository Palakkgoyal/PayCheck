import "./Profile.css"
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../Loader/Loader";
import Login from "../Login/Login";

const Profile = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Login />
    }

    return (
        <div className="profile_container">
            <div className="user_details_container">
                {user?.picture && (<img src={user.picture} alt={user.name} className="user_image" />)}
                <h2 className="para">{user?.name ? user.name : "User"}</h2>
                <p className="para">{user?.email ? user.email : "000@gmail.com"}</p>
                <button
                    className="form_action_btn para"
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile
