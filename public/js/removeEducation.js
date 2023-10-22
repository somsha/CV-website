function removeEducation(id) {
    const removeInput = document.createElement('input');
    removeInput.type = 'hidden';
    removeInput.name = 'id';
    removeInput.value = id;

    const removeForm = document.createElement('form');
    removeForm.method = 'POST';
    removeForm.action = '/cv/education/remove';
    removeForm.style.display = 'none';
    removeForm.appendChild(removeInput);

    document.body.appendChild(removeForm);
    removeForm.submit();

}