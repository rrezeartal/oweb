document.addEventListener("DOMContentLoaded", function () {
    const filterSelects = document.querySelectorAll(".filter-container select");
    const modelsGrid = document.getElementById("models-grid");
    const modelCards = document.querySelectorAll("#models-grid > div");

    function filterModels() {
        const condition = document.getElementById("condition").value;
        const price = document.getElementById("price").value;
        const yearFilter = document.getElementById("year").value; //filter options

        modelCards.forEach((card) => {
            const cardCondition = card.dataset.condition;
            const cardPrice = parseInt(card.dataset.price);
            const cardYear = parseInt(card.dataset.year); //data-*

            let showCard = true;

            // filteriranje po condition (new ili used)
            if (condition !== "all" && cardCondition !== condition) {
                showCard = false;
            }

            // filteriranje po cena
            if (price !== "all") {
                switch (price) {
                    case "under500k":
                        if (cardPrice >= 500000) showCard = false;
                        break;
                    case "over500k":
                        if (cardPrice < 500000) showCard = false;
                        break;
                }
            }

            // filteriranje po godina
            if (yearFilter !== "all") {
                if (yearFilter === "classic") {
                    if (cardYear >= 1990) showCard = false;
                } else if (yearFilter === "modern") {
                    if (cardYear < 1990) showCard = false;
                } else {
                    // Specific year filter
                    if (cardYear !== parseInt(yearFilter)) showCard = false;
                }
            }

            card.style.display = showCard ? "block" : "none";
        });
    }

    filterSelects.forEach((select) => {
        select.addEventListener("change", filterModels, false);
    });

    //likes
    const likeBtns = document.querySelectorAll('.like-btn');

    likeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const count = this.querySelector('span');

            if (this.querySelector('i').classList.contains('fas')) {
                // heart is filled, counter--
                count.textContent = parseInt(count.textContent) - 1;
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
            } else {
                // heart is not filled, counter++
                count.textContent = parseInt(count.textContent) + 1;
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
            }
        });
    });

    //comments
    const commentInputs = document.querySelectorAll('.comments-section input');

    commentInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && this.value.trim()) {
                const commentsList = this.parentElement.querySelector('.comments-list');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                <strong>User:</strong> ${this.value}
                <button class="delete-comment">×</button>
            `;

                commentsList.appendChild(newComment);
                this.value = '';
            }
        });
    });


    //delete comments
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-comment')) {
            e.target.parentElement.remove();
        }
    });

});
