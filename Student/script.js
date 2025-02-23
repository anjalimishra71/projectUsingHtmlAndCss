const DB_NAME = 'STUDENT';
let currentEditIndex = null;
const formElement = document.getElementById("studentForm");

formElement.addEventListener('submit', function (event) {
    event.preventDefault();
    saveFormData();
    formElement.reset();
})


function saveFormData() {
    const name = document.getElementById('name').value;
    const gender = document.querySelector("input[name='gender']:checked").value;
    const querySelector = document.querySelectorAll("input[type='checkbox']:checked");
    const city = document.querySelector("#city").value;
    const photo = document.getElementById('image').src;
    const qualification = [];

    querySelector.forEach((checkboxElement) => {
        qualification.push(checkboxElement.value);
    })

    const dataItem = {
        name,
        gender,
        qualification,
        city,
        photo
    }
    setLocalStorage(dataItem);
    displayTableData();
}


function setLocalStorage(data) {
    const storeData = getLocalStorage();

    storeData.push(data);

    localStorage.setItem(DB_NAME, JSON.stringify(storeData))
}

function getLocalStorage() {
    const data = localStorage.getItem(DB_NAME);

    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function onDeleteHandler(index) {
    if (confirm('Are you sure you want to delete')) {
        const data = getLocalStorage();

        data.splice(index, 1);

        localStorage.setItem(DB_NAME, JSON.stringify(data));

        displayTableData();
    }

}

function onEditHandler(index) {
    currentEditIndex = index;
    const data = getLocalStorage();
    const { name, gender, qualification, city, photo } = data[index];

    document.getElementById('name').value = name;
    // document.querySelectorAll("input[type='checkbox']:checked");
    document.querySelector("#city").value = city;
    document.getElementById('image').src = photo;
}

function displayTableData() {
    const data = getLocalStorage();

    if (data && data.length) {
        let innerData = '';
        for (let i = 0; i < data.length; i++) {
            const { name,
                gender,
                qualification,
                city,
                photo
            } = data[i];
            innerData += `<tr>
                <td>${name}</td>
                <td>${gender}</td>
                <td>${qualification}</td>
                <td>${city}</td>
                <td><img src='${photo}' class="image" /></td>
            <td><button onclick="onEditHandler(${i})">Edit</button> | <button onclick="onDeleteHandler(${i})">Delete</button></td>     
            </tr>`
        }

        document.getElementById('dataBody').innerHTML = innerData;
    }
}


document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const render = new FileReader();
        render.onload = function (e) {
            const img = document.getElementById('image');
            img.src = e.target.result;
            img.style.display = 'block';
        }
        render.readAsDataURL(file);
    }
});

displayTableData();