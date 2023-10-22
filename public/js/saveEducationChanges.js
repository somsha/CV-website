function saveEducationChanges(id) {

    const fields = [
        { name: 'id', value: id },
        { name: 'institution', value: document.querySelector(`input[name=educationInstitution_${id}]`).value },
        { name: 'degree', value: document.querySelector(`input[name=educationDegree_${id}]`).value },
        { name: 'major', value: document.querySelector(`input[name=educationMajor_${id}]`).value },
        { name: 'startDate', value: document.querySelector(`input[name=educationStartDate_${id}]`).value },
        { name: 'endDate', value: document.querySelector(`input[name=educationEndDate_${id}]`).value }
    ];

    const editForm = document.createElement('form');
    editForm.action = '/cv/education/edit';
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