window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    loadUsers();
    let btn = document.getElementById("btn1");
    let btnAdd = document.getElementById("btnAdd");
    let btndelet = document.getElementById("deleteButton");
    btn.addEventListener("click", btnClicked)
    btnAdd.addEventListener("click", btnAddNewUserClicked)
    btndelet.addEventListener("click",)


});


function btnClicked() {
    loadUsers();
}


function updateUser(userId) {
    document.getElementById('inputs').hidden = false
    document.getElementById("btnAdd").style.display = "none";
    let name = document.getElementById("txtName").value;
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPass").value;
    let grade = Number(document.getElementById("txtGrade").value);

    let updatedUser = {
        id: userId,
        name: name,
        email: email,
        PassWord: password,
        grade: grade
    };


    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || isNaN(grade)) {

        return;
    }
    fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
        .then((response) => {
            if (response.ok) {
                console.log("User updated successfully");
                loadUsers();
                document.getElementById("btnAdd").style.display = "inline-block";
                clearInputFields();
                hideInputs();


            } else {
                console.log("Failed to update user");
            }
        })
        .catch((error) => {
            console.log("Error occurred while updating user:", error);
        });

}

function hideInputs() {
    document.getElementById('inputs').hidden = true;
}

function showInputs() {
    document.getElementById('inputs').hidden = false;
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${userId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok) {
                    loadUsers();
                    console.log("Deleted");
                } else {
                    console.log("Failed to delete user");
                }
            })
            .catch((error) => {
                console.log("Error occurred while deleting user:", error);
            });

    }

}


function clearInputFields() {
    document.getElementById("txtName").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtPass").value = "";
    document.getElementById("txtGrade").value = "";
}

function btnAddNewUserClicked() {
    showInputs();
    var name = document.getElementById("txtName").value;
    var email = document.getElementById("txtEmail").value;
    var password = document.getElementById("txtPass").value;
    var grade = Number(document.getElementById("txtGrade").value);

    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || isNaN(grade)) {

        return;
    }
    fetch("/api/users", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            id: "",
            name: name,
            email: email,
            PassWord: password,
            grade: grade

        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            loadUsers();
            clearInputFields();
            hideInputs();
        });

}

async function loadUsers() {

    const response = await fetch("/api/users");
    const users = await response.json();
    console.log(users)

    BuildUserTableList(users);

}

function BuildUserTableList(usersJson) {

    let liList = ""
    let ul = document.getElementById("ulUsers");
    let th = `<th>Name</th><th>Email</th><th>Password</th><th>Grade</th><th>Actions</th>`;
    for (let i = 0; i < usersJson.length; i++) {
        var userObj = usersJson[i];
        liList += `<tr>
        <td>${userObj.name}</td>
        <td>${userObj.email}</td>
        <td>${userObj.passWord}</td>
        <td>${userObj.grade}</td>
        <td>
        <button onclick="deleteUser('${userObj.id}')" class="deleteButton">Delete User</button>
        <button onclick="updateUser('${userObj.id}')" class="updateButton">Update User</button>
</td>

        </tr>`;
    }
    ul.innerHTML = th + liList
}

