window.addEventListener('load', function () {
    let form = document.querySelector('#form')
    let email = document.querySelector('#email')
    let emailError = document.querySelector('#emailError')
    let password = document.querySelector('#password')
    let passwordError = document.querySelector('#passwordError')


    let valid0 = false;
    let valid1 = false;

    email.addEventListener('blur', function () {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            emailError.innerHTML = 'Ingresa un Email válido.';
            valid0 = false;
        } else {
            emailError.innerHTML = ''
            valid0 = true
        }
    })
    password.addEventListener('blur', function () {
        if (this.value.length < 8) {
            passwordError.innerHTML = 'El campo contraseña debe tener al menos 8 caracteres.',
            valid1 = false;
        } else if (this.value == " "){
            passwordError.innerHTML = 'El campo contraseña debe estar completo.',
            valid1 = false;
        } else {
            passwordError.innerHTML = ''
            valid1 = true
        }
            
    })
    form.addEventListener('submit', function (event) {
        if (!(valid0 && valid1)) {
            event.preventDefault()
        }
    })
})