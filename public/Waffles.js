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


                    const quantity =
                        Number(option.dataset.quantity);


                    const item =
                        dropdown.closest("li");


                    const basePrice =
                        Number(item.dataset.basePrice);


                    const finalPrice =
                        basePrice * quantity;


                    dropdown.querySelector(
                        ".selected-val"
                    ).textContent =
                        option.textContent;


                    dropdown.querySelector(
                        ".waffle-qty-input"
                    ).value =
                        quantity;


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


                const name =
                    item.dataset.name;


                const basePrice =
                    Number(item.dataset.basePrice);


                const quantity =
                    Number(
                        item.querySelector(
                            ".waffle-qty-input"
                        ).value
                    ) || 1;


                const selectedText =
                    item.querySelector(
                        ".selected-val"
                    ).textContent;


                const finalPrice =
                    basePrice * quantity;


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
                        (Number(existing.quantity) || 1) +
                        quantity;

                    existing.price =
                        (Number(existing.unitPrice) || basePrice) *
                        existing.quantity;

                } else {

                    cart.push({

                        name: name,

                        unitPrice: basePrice,

                        price: finalPrice,

                        quantity: quantity,

                        img: "images/Wafflepage.jpg"

                    });

                }


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                updateCartBadge();


                alert(`${name} added to cart! 🧇`);

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


                const basePrice =
                    Number(item.dataset.basePrice);


                const quantity =
                    Number(
                        item.querySelector(
                            ".waffle-qty-input"
                        ).value
                    ) || 1;


                const selectedText =
                    item.querySelector(
                        ".selected-val"
                    ).textContent;


                const finalPrice =
                    basePrice * quantity;


                const buyNowItem = {

                    name: name,

                    unitPrice: basePrice,

                    price: finalPrice,

                    quantity: quantity,

                    img: "images/Wafflepage.jpg"

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
