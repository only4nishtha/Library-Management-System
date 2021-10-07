let globalTaskData = [];
taskContents = document.getElementById("taskContentsrow")

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`, //primary key
        title: document.getElementById("Title").value,
        type: document.getElementById("Type").value,
        description: document.getElementById("Description").value
    };

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));  //BEFOREEND inserts the content inside element as the last child

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}
const generateTaskCard = ({id, title, type, description}) => {
    return(
        `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}> 
            <div class="card">
                <div class="card-header">
                    <div class="card-header d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-info">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                            <i class="far fa-trash-alt"></i>
                        </button>   
                    </div>                      
                </div>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <span class="badge bg-primary">${type}</span>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-primary float-end">OPEN TASK</button>
                </div>
            </div>
        </div>`
    )
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({tasks: globalTaskData})) //JSON converts string to object
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky")); //now const will store an object
    console.log(localStorageCopy)
    if(localStorageCopy){
        globalTaskData = localStorageCopy["tasks"]; 
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData));
    })
}
console.log(58);
const deleteTask = (e) => { 
    console.log(e)
    const targetID = e.getAttribute("name");
    console.log(targetID);
    globalTaskData = globalTaskData.filter((cardData) =>  cardData.id !== targetID);
    saveToLocalStorage();
    window.location.reload();
}