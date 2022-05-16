import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "./firebase-config";

const LogIn = () => {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPssword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const register = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			const user = userCredential.user;
			await addDoc(collection(db, "user"), {
				uid: user.uid,
				email: user.email,
			});
			console.log("saved");
		} catch (err) {
			console.log(err.message);
		}
	};

	// const logIn = () => {};

	// const logOut = () => {};
	return (
		<div className="container">
			<div className="register">
				<h3>Register User</h3>
				<input
					type="text"
					placeholder="Email..."
					value={registerEmail}
					onChange={(e) => setRegisterEmail(e.target.value)}
					style={{ marginRight: 10, paddingBlock: 5 }}
				/>
				<input
					type="password"
					placeholder="Password..."
					value={registerPassword}
					onChange={(e) => setRegisterPssword(e.target.value)}
					style={{ marginRight: 10, paddingBlock: 5 }}
				/>
				<button onClick={register}>Create User</button>
			</div>
			<div className="log-in">
				<h3>Log In</h3>
				<input
					type="text"
					placeholder="Email..."
					style={{ marginRight: 10, paddingBlock: 5 }}
				/>
				<input
					type="password"
					placeholder="Password..."
					style={{ marginRight: 10, paddingBlock: 5 }}
				/>
				<button>Log In</button>
			</div>
			<h4>User Logged In: </h4>
			<button>Sign Out</button>
		</div>
	);
};

export default LogIn;
