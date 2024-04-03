// CREATE HELPER TO FETCH ELEMENTS FROM DOM
const _ = (elemId) => document.getElementById(elemId);

// GET ADD EMPLOYEE FORM AND EMPLOYEE TABLE FROM THE DOM
let form = _("addForm");
let employeeTable = _("employees");

// SET A COUNT VARIABLE TO DISPLAY NEXT TO EMPLOYEES HEADER
let employeeCount = 0;
const currCount = parseInt(_("empCount"));
if (!isNaN(currCount)) {
    employeeCount += currCount;
}

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let fm_add_id = _("id").value;
    let fm_add_name = _("name").value;
    let fm_add_extension = _("extension").value;
    let fm_add_email = _("email").value;
    let fm_add_department = _("department").value;

    // INSERT A NEW ROW AT THE END OF THE EMPLOYEES TABLE
    let tbl_new_tr = employeeTable.insertRow();

    // INSERT A CELL FOR EACH ITEM WITHIN THE NEW ROW
    let cell_id = tbl_new_tr.insertCell();
    let cell_name = tbl_new_tr.insertCell();
    let cell_extension = tbl_new_tr.insertCell();
    let cell_email = tbl_new_tr.insertCell();
    let cell_department = tbl_new_tr.insertCell();

    // APPEND THE TEXT VALUES AS TEXT NODES WITHIN THE CELLS
    //  STEP 1: Create new text nodes to add
    let txtNode_id = document.createTextNode(fm_add_id);
    let txtNode_name = document.createTextNode(fm_add_name);
    let txtNode_extension = document.createTextNode(fm_add_extension);
    let txtNode_email = document.createTextNode(fm_add_email);
    let txtNode_department = document.createTextNode(fm_add_department);
    
    //  STEP 2: Add the new text nodes
    cell_id.appendChild(txtNode_id);
    cell_name.appendChild(txtNode_name);
    cell_extension.appendChild(txtNode_extension);
    cell_email.appendChild(txtNode_email);
    cell_department.appendChild(txtNode_department);

    // CREATE THE DELETE BUTTON

    //  STEP 1: Create button and setup values
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm float-end";
    let textDelete = document.createTextNode("X");

    //  STEP 2: Add button text and button cell, then append cell
    deleteButton.appendChild(textDelete);
    tbl_new_tr.insertCell().appendChild(deleteButton);

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    _("id").focus();

    // INCREMENENT THE NUMBER OF EMPLOYEES IN THE TABLE
    employeeCount += 1;
    _("empCount").value = employeeCount;

});

// DELETE EMPLOYEE
employeeTable.addEventListener("click", (e) => {
    // IF BUTTON IN FORM IS CLICKED IT CAN ONLY BE THE DELETE BUTTON
    if (e.target.classList.contains('btn')) {
        // CONFIRM THEY WANT TO DELETE THE EMPLOYEE
        if (window.confirm(`Please confirm you would like to delete the following employee:
            **** id: ${e.target.parentElement.parentElement.children[0].firstChild.data}
            **** name: ${e.target.parentElement.parentElement.children[1].firstChild.data}
            **** ext: ${e.target.parentElement.parentElement.children[2].firstChild.data}
            **** email: ${e.target.parentElement.parentElement.children[3].firstChild.data}
            **** dept: ${e.target.parentElement.parentElement.children[4].firstChild.data}`)) {
                
            // REMOVE ROW
            employeeTable.deleteRow(e.target.parentElement.parentElement.rowIndex);

            // DECREMENT AND UPDATE COUNT
            employeeCount -= 1;
            _("empCount").value = employeeCount;
        }
    }
});