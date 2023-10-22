function saveWorkChanges(id) {

    const fields = [
        { name: 'id', value: id },
        { name: 'company', value: document.querySelector(`input[name=workCompany_${id}]`).value },
        { name: 'position', value: document.querySelector(`input[name=workPosition_${id}]`).value },
        { name: 'description', value: document.querySelector(`input[name=workDescription_${id}]`).value },
        { name: 'startDate', value: document.querySelector(`input[name=workStartDate_${id}]`).value },
        { name: 'endDate', value: document.querySelector(`input[name=workEndDate_${id}]`).value }
    ];

    const editForm = document.createElement('form');
    editForm.action = '/cv/work/edit';
    editForm.method = 'POST';
    editForm.style.display = 'none';

    fields.forEach((field) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        editForm.appendChild(input);
    });

    // Attach the form to the body and submit it
    document.body.appendChild(editForm);
    editForm.submit();
}