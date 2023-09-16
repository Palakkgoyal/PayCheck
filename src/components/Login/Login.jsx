import "./Login.css"
import { useAuth0 } from "@auth0/auth0-react";
import { login } from '../../assets';
// import { auth, db } from "../../lib/firebase"

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    // const { user, isAuthenticated, isLoading, logout } = useAuth0();

    // function loginFn() {
    //     loginWithRedirect()
    //         .then(async () => {
    //             const userRef = db.collection("users").where("uid", "==", user?.email);
    //             const docSnap = await userRef.get();
    //             if (docSnap.docs.length < 1) {
    //                 const userDoc = db.collection("users");
    //                 await usernameDoc.doc(user?.email).set({
    //                     posts: []
    //                 });
    //             }
    //             console.log("Done")
    //         })
    //         .catch((err) => {
    //             alert("Error: ", err)
    //             console.log(err)
    //         })
    // }
    

    return (
        <div className="login_container">
            <div className="login_text_container">
                <p className="main_heading">
                    Please login to continue!
                </p>
                <button
                    className="form_action_btn para"
                    onClick={() => loginWithRedirect()}
                >
                    Login
                </button>
            </div>
            <img
                src={login}
                alt="login image"
                className="login_img"
            />
        </div>
    )
}

export default Login