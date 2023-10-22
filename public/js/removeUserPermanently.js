function removeUserPermanently(userId) {
    if (confirm('Are you sure you want to remove this user permanently?')) {
        const removeInput = document.createElement('input');
        removeInput.type = 'hidden';
        removeInput.name = 'userId';
        removeInput.value = userId;

        const removeForm = document.createElement('form');
        removeForm.method = 'POST';
        removeForm.style.display = 'none';
        removeForm.appendChild(removeInput);

        document.body.appendChild(removeForm);
        removeForm.submit();
    }
}