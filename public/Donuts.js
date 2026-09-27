document.addEventListener("DOMContentLoaded", function () {

    function updateCartBadge() {

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const totalCount = cart.reduce(
            (sum, item) => sum + (Number(item.quantity) || 1),
            0
        );

        const badge =
            document.getElementById("cart-count");

        if (badge) {
            badge.textContent = totalCount;
        }
    }


    function closeAllDropdowns() {

        document
            .querySelectorAll(".custom-cake-dropdown")
            .forEach(dropdown => {
                dropdown.classList.remove("open");
            });

    }


    document
        .querySelectorAll(".custom-cake-dropdown")
        .forEach(dropdown => {

            const trigger =
                dropdown.querySelector(".dropdown-trigger");

            const options =
                dropdown.querySelectorAll(
                    ".dropdown-options li"
                );

            trigger.addEventListener("click", function (event) {

                event.stopPropagation();

                document
                    .querySelectorAll(".custom-cake-dropdown")
                    .forEach(other => {

                        if (other !== dropdown) {
                            other.classList.remove("open");
                        }

                    });

                dropdown.classList.toggle("open");

            });


            options.forEach(option => {

                option.addEventListener("click", function (event) {

                    event.stopPropagation();

                    const size =
                        option.dataset.size;

                    const price =
                        Number(dropdown.dataset[size]);

                    const selected =
                        dropdown.querySelector(".selected-val");

                    const hiddenInput =
                        dropdown.querySelector(".donut-size-input");

                    const priceElement =
                        dropdown.closest("li")
                        .querySelector(".price");


                    selected.textContent =
                        option.textContent;

                    hiddenInput.value =
                        size;

                    priceElement.textContent =
                        "₹" + price;

                    dropdown.classList.remove("open");

                });

            });

        });



    document.addEventListener("click", function () {
        closeAllDropdowns();
    });


    document
        .querySelectorAll(".add-cart-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                const item =
                    button.closest("li");

                const name =
                    item.dataset.name;

                const priceText =
                    item.querySelector(".price").textContent;

                const price =
                    Number(
                        priceText.replace("₹", "")
                    );


                let cart =
                    JSON.parse(localStorage.getItem("cart")) || [];


                const existing =
                    cart.find(
                        cartItem =>
                            cartItem.name.toLowerCase() ===
                            name.toLowerCase()
                    );


                if (existing) {

                    existing.quantity =
                        (Number(existing.quantity) || 1) + 1;

                    existing.price =
                        (Number(existing.unitPrice) || price) *
                        existing.quantity;

                } else {

                    cart.push({

                        name: name,

                        unitPrice: price,

                        price: price,

                        quantity: 1,

                        img: "images/Donutpage.jpg"

                    });

                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                updateCartBadge();


                alert(
                    name + " added to cart! 🍩"
                );

            });

        });


    document
        .querySelectorAll(".buy-now-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                const item =
                    button.closest("li");

                const name =
                    item.dataset.name;

                const priceText =
                    item.querySelector(".price").textContent;

                const price =
                    Number(
                        priceText.replace("₹", "")
                    );


                const buyNowItem = {

                    name: name,

                    unitPrice: price,

                    price: price,

                    quantity: 1,

                    img: "images/Donutpage.jpg"

                };


                localStorage.setItem(
                    "buyNow",
                    JSON.stringify(buyNowItem)
                );


                window.location.href =
                    "payment.html";

            });

        });


    updateCartBadge();

});
