
    document.querySelectorAll(".sizes").forEach(container => {

        const buttons = container.querySelectorAll(".size");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                buttons.forEach(item => {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");

            });

        });

    });


    

    let cart = [];


    function addToCart(name, price, button) {

        const product = button.closest(".product");

        const selectedSize =
            product.querySelector(".size.selected");


        if (!selectedSize) {

            alert("Сначала выберите размер!");

            return;
        }


        const size = selectedSize.textContent;


        const existing = cart.find(item =>
            item.name === name &&
            item.size === size
        );


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                size: size,
                quantity: 1
            });

        }


        updateCart();

        openCart();

    }


    function updateCart() {

        const cartItems =
            document.getElementById("cartItems");

        const totalElement =
            document.getElementById("total");


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p style="color:var(--muted);">
                    Корзина пока пустая.
                </p>
            `;

            totalElement.textContent = "0 сум";

            return;
        }


        cartItems.innerHTML = "";


        let total = 0;


        cart.forEach((item, index) => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            const div =
                document.createElement("div");

            div.className = "cart-item";


            div.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small>
                        Размер: ${item.size}
                    </small>

                    <br>

                    <small>
                        Количество: ${item.quantity}
                    </small>

                    <br>

                    <strong>
                        ${itemTotal.toLocaleString("ru-RU")} сум
                    </strong>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${index})"
                >
                    Удалить
                </button>

            `;


            cartItems.appendChild(div);

        });


        totalElement.textContent =
            total.toLocaleString("ru-RU") + " сум";

    }


    function removeFromCart(index) {

        cart.splice(index, 1);

        updateCart();

    }


    function openCart() {

        document
            .getElementById("cart")
            .classList.add("open");

        document
            .getElementById("overlay")
            .classList.add("show");

    }


    function closeCart() {

        document
            .getElementById("cart")
            .classList.remove("open");

        document
            .getElementById("overlay")
            .classList.remove("show");

    }


   
    function openCheckout() {

        if (cart.length === 0) {

            alert("Корзина пустая!");

            return;
        }


        document
            .getElementById("checkout")
            .classList.add("show");

    }


    function closeCheckout() {

        document
            .getElementById("checkout")
            .classList.remove("show");

    }


    function finishOrder(event) {

        event.preventDefault();


        alert(
            "Спасибо за заказ! Мы свяжемся с вами для подтверждения."
        );


        cart = [];

        updateCart();

        closeCheckout();

        closeCart();

    }


   

    let currentCategory = "Все";


    function setCategory(category, button) {

        currentCategory = category;


        document
            .querySelectorAll(".filter")
            .forEach(item => {
                item.classList.remove("active");
            });


        button.classList.add("active");


        applyFilters();

    }


    function chooseCategory(category) {

        currentCategory = category;


        document
            .getElementById("shop")
            .scrollIntoView();


        document
            .querySelectorAll(".filter")
            .forEach(button => {

                button.classList.remove("active");

                if (button.textContent.trim() === category) {
                    button.classList.add("active");
                }

            });


        applyFilters();

    }


    function applyFilters() {

        const search =
            document
                .getElementById("search")
                .value
                .toLowerCase();


        document
            .querySelectorAll(".product")
            .forEach(product => {

                const category =
                    product.dataset.category;

                const name =
                    product.dataset.name.toLowerCase();


                const categoryMatch =
                    currentCategory === "Все" ||
                    category === currentCategory;


                const searchMatch =
                    name.includes(search);


                if (categoryMatch && searchMatch) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });

    }


   

    const themeBtn =
        document.getElementById("themeBtn");


    function updateThemeButton() {

        if (document.body.classList.contains("light")) {

            themeBtn.textContent = "🌙";

        } else {

            themeBtn.textContent = "☀️";

        }

    }


    function toggleTheme() {

        document.body.classList.toggle("light");


        const isLight =
            document.body.classList.contains("light");


        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );


        updateThemeButton();

    }


    if (
        localStorage.getItem("theme") === "light"
    ) {

        document.body.classList.add("light");

    }


    updateThemeButton();


    

    function sendMessage(event) {

        event.preventDefault();

        alert(
            "Сообщение отправлено! Спасибо за обращение."
        );

        event.target.reset();

    }
