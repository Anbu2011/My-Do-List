window.addEventListener('load', () => {
    const form = document.querySelector("#new-todo")
    const input = document.querySelector("#activity")
    const list_elements = document.querySelector("#tasks")

    loadTasks(); // loads the previous tasks that stored in a local storage

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        
        if (!task){
            alert("Please fill out the task");
            return;
        }

        addtask(task);
        saveTasks();
        input.value = "";
    });
        
    function addtask(task){
        const task_element = document.createElement("div");
        task_element.classList.add("task");

        const task_content_element = document.createElement("div");
        task_content_element.classList.add("content");
        // task_content_element.innerText = task;

        task_element.appendChild(task_content_element);

        const task_input_element = document.createElement("input");
        task_input_element.classList.add("text1");
        task_input_element.type = "text1";
        task_input_element.value = task;
        task_input_element.setAttribute("readonly","readonly");

        task_content_element.appendChild(task_input_element);

        const task_action_element = document.createElement("div");
        task_action_element.classList.add("actions");

        const task_edit_element = document.createElement("button");
        task_edit_element.classList.add("edit");
        task_edit_element.innerHTML = "Edit";
        
        const task_del_element = document.createElement("button");
        task_del_element.classList.add("delete");
        task_del_element.innerHTML = "Delete";

        task_action_element.appendChild(task_edit_element);
        task_action_element.appendChild(task_del_element);

        task_element.appendChild(task_action_element);

        list_elements.appendChild(task_element);

        

        task_edit_element.addEventListener('click', (e) =>{
            if(task_edit_element.innerText.toLowerCase() == "edit"){
                task_input_element.removeAttribute("readonly");
                task_input_element.focus();
                task_edit_element.innerText = "Save";
            }else{
                task_edit_element.innerText = "Edit";
                task_input_element.setAttribute("readonly","readonly");

                saveTasks();
            }
        });

        task_del_element.addEventListener('click', (e) => {
            task_element.remove()

            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task input").forEach(task => {
            tasks.push(task.value);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addtask(task);
        });
    }

});