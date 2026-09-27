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


    const dropdowns =
        document.querySelectorAll(
            ".custom-cake-dropdown"
        );


    dropdowns.forEach(dropdown => {

        const trigger =
            dropdown.querySelector(".dropdown-trigger");

        const options =
            dropdown.querySelectorAll(
                ".dropdown-options li"
            );


        trigger.addEventListener("click", function (event) {

            event.stopPropagation();

            dropdowns.forEach(other => {

                if (other !== dropdown) {
                    other.classList.remove("open");
                }

            });

            dropdown.classList.toggle("open");

        });


        options.forEach(option => {

            option.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    const type =
                        option.dataset.type;

                    const item =
                        dropdown.closest("li");

                    const basePrice =
                        Number(item.dataset.basePrice);


                    let finalPrice;

                    if (type === "box") {
                        finalPrice = basePrice * 6;
                    } else {
                        finalPrice = basePrice;
                    }


                    dropdown.querySelector(
                        ".selected-val"
                    ).textContent =
                        option.textContent;


                    dropdown.querySelector(
                        ".cupcake-type-input"
                    ).value = type;


                    item.querySelector(
                        ".price"
                    ).textContent =
                        "₹" + finalPrice;


                    dropdown.classList.remove("open");

                }
            );

        });

    });


    document.addEventListener("click", function () {

        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("open");
        });

    });


    document
        .querySelectorAll(".add-cart-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                const item =
                    button.closest("li");

                const baseName =
                    item.dataset.name;

                const type =
                    item.querySelector(
                        ".cupcake-type-input"
                    ).value;


                const selectedText =
                    item.querySelector(
                        ".selected-val"
                    ).textContent;


                const priceText =
                    item.querySelector(
                        ".price"
                    ).textContent;


                const price =
                    Number(
                        priceText.replace("₹", "")
                    );


                const name =
                    type === "box"
                        ? `${baseName} - Box(6 pcs)`
                        : `${baseName} - Single`;


                let cart =
                    JSON.parse(
                        localStorage.getItem("cart")
                    ) || [];


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

                        img: "images/Cupcakepage.jpg"

                    });

                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                updateCartBadge();

                alert(`${name} added to cart! 🧁`);

            });

        });


    document
        .querySelectorAll(".buy-now-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                const item =
                    button.closest("li");

                const baseName =
                    item.dataset.name;


                const type =
                    item.querySelector(
                        ".cupcake-type-input"
                    ).value;


                const selectedText =
                    item.querySelector(
                        ".selected-val"
                    ).textContent;


                const priceText =
                    item.querySelector(
                        ".price"
                    ).textContent;


                const price =
                    Number(
                        priceText.replace("₹", "")
                    );


                const name =
                    type === "box"
                        ? `${baseName} - Box(6 pcs)`
                        : `${baseName} - Single`;


                const buyNowItem = {

                    name: name,

                    unitPrice: price,

                    price: price,

                    quantity: 1,

                    img: "images/Cupcakepage.jpg"

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
