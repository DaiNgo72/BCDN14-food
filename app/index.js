let foods = [
    {
        id: "1",
        name: "rau",
        // false: chay
        // true: mặn
        type: false,
        price: 1_000,
        discount: 10,
        get discountPrice() {
            return this.price * (100 - this.discount) / 100;
        },
        isAvailable: true,
        img: "",
        desc: ""
    },

    {
        id: "2",
        name: "cơm tắm",
        type: true,
        price: 10_000,
        discount: 20,
        get discountPrice() {
            return this.price * (100 - this.discount) / 100;
        },
        isAvailable: true,
        img: "",
        desc: ""
    }
];

let tbodyFood = document.getElementById('tbodyFood');

function renderFoods() {
    let content = "";

    //----------------
    // Duyệt qua từng phần tử của mảng để tạo ra các string tr, td
    foods.forEach(
        function (food) {
            console.log(food);

            content += `
                <tr>
                    <td>${food.id}</td>
                    <td>${food.name}</td>
                    <td>${food.type === false ? "chay" : "mặn"}</td>
                    <td>${food.price} <sup>vnđ<sup></td>
                    <td>${food.discount}%</td>
                    <td>${food.discountPrice} <sup>vnđ<sup></td>
                    <td>${food.isAvailable ? "còn hàng" : "hết hàng"}</td>
                    <td>    
                        <button onclick="handleDeleteFood( '${food.id}' )">delete</button>
                        <button 
                            data-toggle="modal" 
                            data-target="#add-food" 
                            onclick="handleEditFood('${food.id}')" 
                        >
                            edit
                        </button>
                    </td>
                </tr>
            `

        }
    )
    //----------------

    tbodyFood.innerHTML = content;

}

renderFoods();

// ---------------
// function validate() {
//     return false
// }
function addFood() {
    // validate();
    // if(validate() === false) return;
    console.log("add food");

    // ctrl + d;
    // cmd + d | ctrl + d;

    // ctrl + shift + left/right

    let idEle = document.querySelector('#foodID');
    let nameEle = document.getElementById("tenMon");
    let typeEle = document.getElementById("loai");
    let priceEle = document.getElementById('giaMon');
    let discountEle = document.getElementById('khuyenMai');
    let isAvailableEle = document.getElementById("tinhTrang");
    let imgEle = document.getElementById('hinhMon');
    let descEle = document.getElementById('moTa');


    let idValue = document.querySelector('#foodID').value;
    let nameValue = document.getElementById("tenMon").value;
    let typeValue = document.getElementById("loai").value;
    let priceValue = document.getElementById('giaMon').value;
    let discountValue = document.getElementById('khuyenMai').value;
    let isAvailableValue = document.getElementById("tinhTrang").value;
    let imgValue = document.getElementById('hinhMon').value;
    let descValue = document.getElementById('moTa').value;

    if (idValue.trim().length === 0) {
        alert("Id không được bỏ trống");
        return;
    } else {
        // regex: tạo ra pattern để kiểm tra chuỗi đó có hợp lệ với pattern đó hay không
        const REGEX_NUMBER = /^\d+$/;

        if (REGEX_NUMBER.test(idValue.trim()) === false) {
            alert("Id không được nhập ký tự chữ");
            return;
        }
    }

    if (nameValue.trim().length === 0) {
        alert("Tên món ăn không được bỏ trống");
        return;
    } else if (nameValue.trim().length < 5) {
        alert("Tên món ăn không được ít hơn 5 ký tự");
        return;
    }

    if (priceValue.trim().length === 0) {
        alert("Giá món ăn không được bỏ trống");
        return;
    } else if (Number(priceValue.trim()) < 5_000) {
        alert("Giá món ăn không được nhỏ hơn 5.000 đồng");
        return;
    }

    const REGEX_URL = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/;

    if (imgValue.trim().length === 0) {
        alert("Hình ảnh không được bỏ trống");
        return;
    } else if (REGEX_URL.test(imgValue.trim()) === false) {
        alert("Hình ảnh không đúng định dạng");
        return;
    }

    let id = idEle.value;
    let name = nameEle.value;
    let type = typeEle.value === "loai1" ? false : true;
    let price = Number(priceEle.value);
    let discount = Number(discountEle.value);
    let isAvailable = isAvailableEle.value === "0" ? false : true;
    let img = imgEle.value;
    let desc = descEle.value;


    let food = {
        id: id,
        name: name,
        type: type,
        price: price,
        discount: discount,
        isAvailable: isAvailable,

        get discountPrice() {
            return this.price * (100 - this.discount) / 100;
        },

        img: img,
        desc: desc,
    }

    console.log(food);

    // thêm vào mảng foods
    foods.push(food);
    console.log(foods);

    // render lại table
    renderFoods();
}

function handleDeleteFood(foodId) {
    console.log("Food id:::", foodId);

    /**
     * Hỏi người có chắc chắn muốn xóa hay không trước khi thực hiện xóa sản phẩm.
     */
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa hay không?")
    if (!isConfirm) return;

    /**
     * Sau khi filter xong thì nó sẽ trả về cho chúng ta một mảng mới
     * và chúng ta gán mảng mới đó vào biến foods
     */
    foods = foods.filter(
        function (food) {
            // ctrl + i

            /**
             * Chú ý kiểu dữ liệu
             */
            return String(food.id) !== String(foodId);
        }
    )

    // Sau khi xóa thành công thì render lại table
    renderFoods();

    Toastify({
        text: "Xóa sản phẩm thành công",
        duration: 2000, // ms = 3s
    }).showToast();
}

function handleEditFood(foodId) {
    hiddenButtonAdd();

    // console.log('foodId', foodId);

    let food = foods.find(
        function (food) {
            return String(food.id) === String(foodId);
        }
    )

    // console.log(food);


    // Load du lieu len form
    document.querySelector('#foodID').value = food.id;
    document.getElementById("tenMon").value = food.name;
    document.getElementById("loai").value = food.type ? "loai2" : "loai1";
    document.getElementById('giaMon').value = food.price;
    document.getElementById('khuyenMai').value = food.discount;
    document.getElementById("tinhTrang").value = food.isAvailable ? "1" : "0";
    document.getElementById('hinhMon').value = food.img;
    document.getElementById('moTa').value = food.desc;


    // document.getElementById("btnCapNhat") = function () {
    //     handleUpdate(foodId);
    // }
    FOOD_ID = foodId;
}

let FOOD_ID = null;

function handleUpdate() {
    console.log(FOOD_ID);


    let id = document.querySelector('#foodID').value;
    let name = document.getElementById("tenMon").value;
    let type = document.getElementById("loai").value === "loai1" ? false : true;
    let price = Number(document.getElementById('giaMon').value);
    let discount = Number(document.getElementById('khuyenMai').value);
    let isAvailable = document.getElementById("tinhTrang").value === "0" ? false : true;
    let img = document.getElementById('hinhMon').value;
    let desc = document.getElementById('moTa').value;


    let food = {
        id: id,
        name: name,
        type: type,
        price: price,
        discount: discount,
        isAvailable: isAvailable,

        get discountPrice() {
            return this.price * (100 - this.discount) / 100;
        },

        img: img,
        desc: desc,
    }


    let foodIdx = foods.findIndex(
        function (food) {
            return String(food.id) === String(FOOD_ID);

            // if (food.id === FOOD_ID) return true;

            // return false;
        }
    );

    console.log(foodIdx);

    if (foodIdx === -1) return;

    // Cập nhật lại sản phẩm,
    /**
     * Thay thế tại vị trí đó bằng một giá trị mới
     */
    foods.splice(
        foodIdx,
        1,
        food
    )

    renderFoods();


    // reset form;
    handleResetForm();
}

function showButtonAdd() {
    document.getElementById('btnCapNhat').style.display = "none";
    document.getElementById('btnThemMon').style.display = "block";
}

function hiddenButtonAdd() {
    document.getElementById('btnCapNhat').style.display = "block";
    document.getElementById('btnThemMon').style.display = "none";
}

function onAddFood() {
    // Ẩn button cập nhật
    showButtonAdd();
}

// let nums = [1, 2, 3, 4];
// nums.splice(1, 1);
// console.log(abc === 2);
// console.log(nums);// 1,3,4

// function Toast(props) {
//     return {
//         duration: 10,

//         showToast() {
//         }
//     }
// }

// const t = Toast({ age: 20 })
// t.showToast();
// t.duration;



// Lấy nhiều
// array | object => array

// Array.from để convert NodeList về array
const closeModal = Array.from(document.querySelectorAll(".close-modal"));

console.log(closeModal);

function handleResetForm() {
    // Cách 1:
    document.getElementById('foodForm').reset();

    // Cách 2:
    document.querySelector('#foodID').value = ""; // food.id;
    document.getElementById("tenMon").value = ""; // food.name;
    document.getElementById("loai").value = ""; // food.type ? "loai2" : "loai1";
    document.getElementById('giaMon').value = ""; // food.price;
    document.getElementById('khuyenMai').value = ""; // food.discount;
    document.getElementById("tinhTrang").value = ""; // food.isAvailable ? "1" : "0";
    document.getElementById('hinhMon').value = ""; // food.img;
    document.getElementById('moTa').value = ""; // food.desc;
}

// closeModal[0].onclick = handleResetForm;
// closeModal[1].onclick = handleResetForm;

closeModal.forEach(
    function (el) {
        el.onclick = handleResetForm;
    }
)
