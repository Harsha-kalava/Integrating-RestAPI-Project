function saveToLocal(event) {
	event.preventDefault();
	const name = event.target.name.value;
	const email = event.target.email.value;

	const obj = {
		_id,
		name,
		email,
	};

	axios
		.post(
			"https://crudcrud.com/api/d0cbde08152e4939b5126d66542df176/userDetails",
			obj
		)
		.then((response) => {
			getUserList(response.data);
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});

	
}
function getUserList(user) {
	const userList = document.getElementById("userList");
	listArr = Object.values(user);

	// creating li to display on the UI
	const li = document.createElement("li");
	li.id = `${user._id}`;
	li.appendChild(document.createTextNode(`${user.name}, ${user.email}`));
	userList.appendChild(li);

	// creating edit button
	let editbtn = document.createElement("button");
	editbtn.id = "edit";
	editbtn.appendChild(document.createTextNode("edit"));
	editbtn.onclick = function () {
		console.log("edit clicked");
		editUser(user._id, user.name);
	};
	li.appendChild(editbtn);

	let delBtn = document.createElement("button");
	delBtn.id = "delete";
	delBtn.appendChild(document.createTextNode("delete"));
	delBtn.onclick = function () {
		deleteUser(user._id);
	};
	// delBtn.setAttribute("onclick", deleteUser(`${user.email}`));
	li.appendChild(delBtn);
	userList.appendChild(li);

}


function editUser(email, name) {
	console.log("edit invoked");
	document.getElementById("email").value = email;
	document.getElementById("Name").value = name;
	deleteUser(email);
}

function deleteUser(userID) {
	console.log("delete invoked");
	axios
		.delete(
			`https://crudcrud.com/api/d0cbde08152e4939b5126d66542df176/userDetails/${userID}`
		)
		.then((response) => {
			removeUser(userID);
		})
		.catch((err) => {
			console.log(err);
		});
	// localStorage.removeItem(emailId);
}

function removeUser(userID) {
	let ul = document.getElementById("userList");
	let li = document.getElementById(userID);
	ul.removeChild(li);
}

window.addEventListener("DOMContentLoaded", () => {
	axios
		.get(
			"https://crudcrud.com/api/d0cbde08152e4939b5126d66542df176/userDetails"
		)
		.then((response) => {
			for (let i = 0; i < response.data.length; i++) {
				getUserList(response.data[i]);
			}
		})
		.catch((err) => {
			console.log(err);
		});
});