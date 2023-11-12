window.addEventListener('load', function () {
    let form = document.querySelector('#form')
    let name = document.querySelector('#name')
    let nameError = document.querySelector('#nameError')
    let email = document.querySelector('#email')
    let emailError = document.querySelector('#emailError')
    let phone = document.querySelector('#phone')
    let phoneError = document.querySelector('#phoneError')
    let image = document.querySelector('#image')
    let imageError = document.querySelector('#imageError')
    let password = document.querySelector('#password')
    let passwordError = document.querySelector('#passwordError')
    let password2 = document.querySelector('#password2')
    let password2Error = document.querySelector('#passwordError2')

    let valid0 = false;
    let valid1 = false;
    let valid2 = false;
    let valid3 = false;
    let valid4 = false;
    let valid5 = false;

    name.addEventListener('blur', function () {
        if (this.value.trim().length < 2) {
            nameError.innerHTML = 'El nombre debe tener al menos 2 caracteres.';
            valid0 = false;
        } else {
            nameError.innerHTML = ''
            valid0 = true
        }
    })

    email.addEventListener('blur', function () {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            emailError.innerHTML = 'Ingresa un correo electrónico válido.';
            valid1 = false;
        } else {
            emailError.innerHTML = ''
            valid1 = true
        }
    })

    phone.addEventListener('blur', function () {
        if (this.value.trim().length !== 10) {
            phoneError.innerHTML = 'Ingresa un número válido.';
            valid2 = false;
        } else {
            phoneError.innerHTML = ''
            valid2 = true
        }
    })

    image.addEventListener('change', function () {
        if (!/(.jpg|.jpeg|.png|.gif)$/.exec(this.value)) {
            imageError.textContent = 'Se admiten solo archivos JPG, JPEG, PNG, GIF.';
            valid3 = false;
        } else {
            imageError.innerHTML = ''
            valid3 = true
        }
    })

    password.addEventListener('blur', function () {
        if (this.value.length < 8) {
            passwordError.innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
            valid4 = false;
        } else {
            passwordError.innerHTML = ''
            valid4 = true
        }
    })

    password2.addEventListener('blur', function () {
        if (password.value != this.value) {
            password2Error.innerHTML = 'Las contraseñas no coinciden.';
            valid5 = false;
        } else {
            password2Error.innerHTML = ''
            valid5 = true
        }
    })

    form.addEventListener('submit', function (event) {
        if (!(valid0 && valid1 && valid2 && valid3 && valid4 && valid5)) {
            event.preventDefault()
        }
    })
})