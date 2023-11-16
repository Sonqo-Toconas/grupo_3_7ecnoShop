window.addEventListener('load', function () {
    let form = document.querySelector('#form');
    let name = document.querySelector('#name');
    let nameError = document.querySelector('#nameError');
    let description = document.querySelector('#description');
    let descriptionError = document.querySelector('#descriptionError');
    let image = document.querySelector('#image');
    let imageError = document.querySelector('#imageError');

    let valid0 = false;
    let valid1 = false;
    let valid2 = false;

    name.addEventListener('blur', function () {
        if (this.value.trim().length < 5) {
            nameError.innerHTML = 'El nombre debe tener al menos 5 caracteres.';
            valid0 = false;
        } else {
            nameError.innerHTML = '';
            valid0 = true;
        }
    });

    description.addEventListener('blur', function () {
        if (this.value.trim().length < 20) {
            descriptionError.innerHTML = 'La descripción debe tener al menos 20 caracteres.';
            valid1 = false;
        } else {
            descriptionError.innerHTML = '';
            valid1 = true;
        }
    });

    image.addEventListener('change', function () {
        if (!/(.jpg|.jpeg|.png|.gif)$/.exec(this.value)) {
            imageError.textContent = 'Se admiten solo archivos JPG, JPEG, PNG, GIF.';
            valid2 = false;
        } else {
            imageError.innerHTML = '';
            valid2 = true;
        }
    });

    form.addEventListener('submit', function (event) {
        if (!(valid0 && valid1 && valid2)) {
            event.preventDefault();
        }
    });
});
