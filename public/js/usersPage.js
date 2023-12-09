async function changeAdmin(id) {
    await fetch(`http://localhost:3030/usuario/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

    window.location.reload()
} 