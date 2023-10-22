function saveUserChanges(userId) {

    const activeSelect = document.getElementById(`activeSelect-${userId}`);
    const roleSelect = document.getElementById(`roleSelect-${userId}`);

    const userIdInput = document.createElement('input');
    userIdInput.type = 'hidden';
    userIdInput.name = 'userId';
    userIdInput.value = userId;

    const activeInput = document.createElement('input');
    activeInput.type = 'hidden';
    activeInput.name = 'active';
    activeInput.value = activeSelect.value === 'Active' ? '1' : '0';

    const roleInput = document.createElement('input');
    roleInput.type = 'hidden';
    roleInput.name = 'role';
    roleInput.value = roleSelect.value;

    const saveForm = document.createElement('form');
    saveForm.method = 'POST';
    saveForm.action = '/admin/updateUser';
    saveForm.style.display = 'none';
    saveForm.appendChild(userIdInput);
    saveForm.appendChild(activeInput);
    saveForm.appendChild(roleInput);

    // Attach the form to the body and submit it
    document.body.appendChild(saveForm);
    saveForm.submit();
}