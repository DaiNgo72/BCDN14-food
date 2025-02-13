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
    },

    {
        id: "2",
        name: "cơm tắm",
        type: true,
        price: 10_000,
        discount: 5,
        get discountPrice() {
            return this.price * (100 - this.discount) / 100;
        },
        isAvailable: true,
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
                        <button>edit</button>
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
function addFood() {
    console.log("add food");

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
}

// let nums = [1, 2, 3, 4];
// nums.splice(1, 1);
// console.log(abc === 2);
// console.log(nums);// 1,3,4