const categorias = [
    { id: 1, name: "Todas as Categorias" },
    { id: 2, name: "Categoria2" },
    { id: 3, name: "Categoria3" },
    { id: 4, name: "Categoria4" },
    { id: 5, name: "Categoria5" },
    { id: 6, name: "Categoria6" },
    { id: 7, name: "Categoria7" },
];

const departamentos = [
    "Eletrodomésticos",
    "Informática",
    "Moda",
    "Beleza",
    "Esportes",
    "Livros",
    "Brinquedos",
    "Casa & Jardim",
    "Automotivo"
];

const categoriasPorColuna = [
    ["Smartphones", "Notebooks", "Monitores", "Tablets", "PC Gamer", "Headsets", "Mouses"],
    ["Tênis", "Calças", "Camisetas", "Vestidos", "Jaquetas", "Acessórios", "Moda Praia"],
    ["Maquiagem", "Perfumes", "Skincare", "Cabelos", "Hidratantes", "Shampoos", "Sabonetes"]
];

function calculateVisibleItems(container, mainItemWidth = 250, itemWidth = 170) {
    const categoryWidth = container.offsetWidth;
    const availableWidth = categoryWidth - mainItemWidth;
    return Math.max(0, Math.floor(availableWidth / itemWidth));
}

function renderCategorias(container, visibleItemsCount) {
    container.innerHTML = "";
    categorias.slice(0, visibleItemsCount).forEach(categoria => {
        const div = document.createElement("div");
        div.className = "flex items-center hover:text-blue-500 cursor-pointer";
        const p = document.createElement("p");
        p.className = "text-sm md:text-md font-bold";
        p.textContent = categoria.name;
        div.appendChild(p);
        container.appendChild(div);
    });
}

function renderDropdownButtons(container, visibleItemsCount) {
    container.innerHTML = "";
    container.classList.add("flex", "flex-wrap", "gap-2");
    categorias.slice(0, visibleItemsCount).forEach(categoria => {
        const button = document.createElement("button");
        button.id = `button-${categoria.id}`;
        button.className = "flex items-center gap-2 hover:text-blue-500 cursor-pointer px-4 py-2 rounded-md transition-all duration-200 min-w-[80px] max-w-full";

        if (categoria.id === 1) {
            const img = document.createElement("img");
            img.src = "assets/menu.svg";
            img.className = "w-5 h-5";
            button.appendChild(img);
        }

        const p = document.createElement("p");
        p.innerText = categoria.name;
        p.className = "whitespace-nowrap";

        button.appendChild(p);
        button.onmouseover = () => openDropdown(`dropdown-${categoria.id}`);
        container.appendChild(button);
    });
}

function renderDropdowns(container) {
    categorias.forEach(categoria => {
        const dropdown = document.createElement("div");
        dropdown.id = `dropdown-${categoria.id}`;
        dropdown.className = "container mx-auto flex hidden justify-between z-20";
        dropdown.onmouseleave = () => closeDropdown(`dropdown-${categoria.id}`);

        if (categoria.id === 1) {
            const div = document.createElement("div");
            div.className = "bg-gray-100 w-fit overflow-y-auto";

            departamentos.forEach(departamento => {
                const button = document.createElement("button");
                button.className = "px-2 py-2 hover:text-blue-500 cursor-pointer flex justify-between gap-4";

                const p1 = document.createElement("p");
                p1.innerText = "Departamento";
                const p2 = document.createElement("p");
                p2.innerText = ">";

                button.appendChild(p1);
                button.appendChild(p2);
                div.appendChild(button);
            });

            dropdown.appendChild(div);
        }

        categoriasPorColuna.forEach(coluna => {
            const colDiv = document.createElement("div");
            colDiv.className = "min-w-[50px] flex flex-col justify-center";

            coluna.forEach(item => {
                const p = document.createElement("p");
                p.className = "px-6 py-2 hover:text-blue-500 cursor-pointer flex items-between gap-4 md:gap-12";
                p.textContent = item;
                colDiv.appendChild(p);
            });

            dropdown.appendChild(colDiv);
        });

        const imagemDiv = document.createElement("div");
        imagemDiv.className = "flex flex-col justify-center relative rounded-2xl overflow-hidden";
        imagemDiv.innerHTML = `
            <img src="https://i.postimg.cc/gk0VSyfy/imagem-2025-03-28-192206968.png" alt="" class="hidden md:block max-w-[450px] max-h-[350px]">
            <div class="pl-6 absolute rounded-2xl flex flex-col justify-center items-start gap-4 hidden md:block">
              <p class=" pr-[50%] text-2xl text-white">Confira os produtos <strong>que acabaram de chegar</strong></p>
              <button class="rounded-2xl p-4 text-white outline-2 outline-white font-bold text-xl cursor-pointer">Ver Todos</button>
            </div>
        `;
        dropdown.appendChild(imagemDiv);

        container.appendChild(dropdown);

    });
}

function openDropdown(id) {
    const allDropdowns = document.querySelectorAll("#dropdown-menu > div");
    allDropdowns.forEach(dropdown => dropdown.classList.add("hidden"));

    const dropdown = document.getElementById(id);
    if (dropdown) dropdown.classList.remove("hidden");

}

function closeDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown) dropdown.classList.add("hidden");
}

function initCategorias() {
    const container = document.getElementById("buttons-container");
    if (!container) return;

    const updateView = () => {
        const visibleItems = calculateVisibleItems(container);
        renderDropdownButtons(container, visibleItems);
    };

    window.addEventListener("resize", updateView);
    updateView();

    const dropdownContainer = document.getElementById("dropdown-menu");
    if (dropdownContainer) {
        renderDropdowns(dropdownContainer);
    }
}

const searchBar = () => {
    const searchInput = document.getElementById("search-input");
    const messageContainer = document.querySelector("#message").parentElement;
    const p = document.getElementById("message");

    if (searchInput.value.trim().length > 0) {
        messageContainer.classList.remove("hidden");
        p.innerText = "Você buscou por: " + searchInput.value;
    }
}


initCategorias();


new Splide('.n1', {
    type: 'loop',
    perPage: 5,
    breakpoints: {
        1024: { perPage: 4 },
        768: { perPage: 3 }
    },
    gap: '1rem',
    pagination: false
}).mount();

new Splide('.n2', {
    type: 'loop',
    perPage: 5,
    breakpoints: {
        1024: { perPage: 4 },
        768: { perPage: 3 }
    },
    gap: '1rem',
    pagination: false
}).mount();