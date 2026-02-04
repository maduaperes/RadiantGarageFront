document.addEventListener("DOMContentLoaded", () => {

    function makeEditable(listId, editBtnId, saveBtnId, closeBtnId, storageKey) {
        const list = document.getElementById(listId);
        const editBtn = document.getElementById(editBtnId);
        const saveBtn = document.getElementById(saveBtnId);
        const closeBtn = document.getElementById(closeBtnId);

        // Guarda o estado original em texto
        let originalItems = Array.from(list.children).map(li => li.textContent);

        // Carrega do localStorage (forçando string)
        const storedItems = JSON.parse(localStorage.getItem(storageKey));
        if (Array.isArray(storedItems)) {
            list.innerHTML = "";
            storedItems.forEach(item => {
                const li = document.createElement("li");

                // Se vier objeto antigo, converte para string
                li.textContent = typeof item === "string"
                    ? item
                    : Object.values(item).join(" - ");

                list.appendChild(li);
            });

            originalItems = Array.from(list.children).map(li => li.textContent);
        }

        editBtn.addEventListener("click", () => {
            list.querySelectorAll("li").forEach(li => {
                const input = document.createElement("input");
                input.type = "text";
                input.value = li.textContent;
                input.style.width = "100%";
                input.style.marginBottom = "6px";

                li.textContent = "";
                li.appendChild(input);
            });

            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
            closeBtn.style.display = "inline-block";
        });

        saveBtn.addEventListener("click", () => {
            const newItems = [];

            list.querySelectorAll("li").forEach(li => {
                const input = li.querySelector("input");
                if (input && input.value.trim() !== "") {
                    const value = input.value.trim();
                    li.textContent = value;
                    newItems.push(value);
                }
            });

            localStorage.setItem(storageKey, JSON.stringify(newItems));
            originalItems = [...newItems];

            editBtn.style.display = "inline-block";
            saveBtn.style.display = "none";
            closeBtn.style.display = "none";
        });

        closeBtn.addEventListener("click", () => {
            // Descarta alterações e restaura
            list.innerHTML = "";
            originalItems.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                list.appendChild(li);
            });

            editBtn.style.display = "inline-block";
            saveBtn.style.display = "none";
            closeBtn.style.display = "none";
        });
    }

    makeEditable(
        "listServicos",
        "editServicosBtn",
        "saveServicosBtn",
        "closeServicosBtn",
        "servicos"
    );

    makeEditable(
        "listAgendamentos",
        "editAgendamentosBtn",
        "saveAgendamentosBtn",
        "closeAgendamentosBtn",
        "agendamentos"
    );
});
