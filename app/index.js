const foods = [
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
                    <button>delete</button>
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
