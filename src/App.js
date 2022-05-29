import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";
import LogIn from "./LogIn";

function App() {
	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, "users");
	const [newName, setNewName] = useState("");
	const [newAge, setNewAge] = useState(0);

	useEffect(() => {
		const getUsers = async () => {
			//handle promise
			const data = await getDocs(usersCollectionRef);
			// console.log("firebase collection => ", data);
			// add id in the object using spread operator
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUsers();
	}, []);

	const createUser = async () => {
		await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
		setNewName("");
		setNewAge("");
	};

	const updateUser = async (id, age) => {
		const userDoc = doc(db, "users", id);
		const newFields = { age: age + 1 };
		await updateDoc(userDoc, newFields);
	};

	const deleteUser = async (id) => {
		const userDoc = doc(db, "users", id);
		await deleteDoc(userDoc);
	};

	return (
		<div className="App" style={{ padding: 10 }}>
			<div className="user-form" style={{ display: "block" }}>
				<input
					type="text"
					placeholder="name"
					style={{ marginRight: 10, paddingBlock: 5 }}
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
				<input
					type="number"
					placeholder="age"
					style={{ paddingBlock: 5 }}
					value={newAge}
					onChange={(e) => setNewAge(e.target.value)}
				/>
				{/* no need to pass arguments */}
				<button onClick={createUser} style={{ marginLeft: 10 }} type="submit">
					Create user
				</button>
			</div>
			{users.map((user) => {
				return (
					<div className="user-info" key={user.id}>
						<h2>name: {user.name}</h2>
						<h2>age: {user.age}</h2>
						<button onClick={() => updateUser(user.id, user.age)}>
							increase age
						</button>
						<button onClick={() => deleteUser(user.id)}>Delete user</button>
					</div>
				);
			})}
			<LogIn />
		</div>
	);
}

export default App;
