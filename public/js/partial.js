//DarkMode
const buttonDarkMode = document.querySelector('#darkMode');

buttonDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    buttonDarkMode.classList.toggle('active');
})

//VoiceSearch
/* const searchMicrophone = document.querySelector('#searchMicrophone');
const screenVoiceSearch = document.querySelector('#floatWindows');
const microphoneApi = navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    console.log(stream);
}) .catch((err) => console.log('err'));

const voiceRecognition = microphoneApi();
voiceRecognition.lang = 'es-ES';
voiceRecognition.start(); */


// Obtener referencias a los elementos del DOM
/* const searchMicrophone = document.querySelector('#searchMicrophone');
const floatWindows = document.querySelector('#floatWindows');

// Iniciar la solicitud de acceso al micrófono
const microphoneApiPromise = navigator.mediaDevices.getUserMedia({ audio: true });

searchMicrophone.addEventListener('click', () => {
    // Utilizar el resultado de la promesa para obtener el flujo de audio
    microphoneApiPromise
        .then((stream) => {
            console.log(stream);

            // Configurar el reconocimiento de voz después de obtener acceso al micrófono
            const voiceRecognition = new SpeechRecognition(); // Cambio aquí
            voiceRecognition.lang = 'es-ES';
            voiceRecognition.start();

            // Manejar eventos del reconocimiento de voz
            voiceRecognition.onstart = () => {
                floatWindows.classList.add('interaction');
            };

            voiceRecognition.onspeechend = () => {
                voiceRecognition.stop();
                floatWindows.classList.remove('interaction');
            };

            voiceRecognition.onresult = (event) => {
                console.log(event.results[0][0].transcript.split('.', [0]));
            };
        })
        .catch((error) => {
            console.error('Error al acceder al micrófono:', error);
            // Puedes mostrar un mensaje al usuario o tomar alguna acción en caso de error.
        });
}); */



// VoiceSearch
/* const searchMicrophone = document.querySelector('#searchMicrophone');
const floatWindows = document.querySelector('#floatWindows');

searchMicrophone.addEventListener('click', () => {
    const voiceRecognition = new webkitSpeechRecognition();
    voiceRecognition.lang = 'es-ES';
    voiceRecognition.start();

    voiceRecognition.onstart = () => {
        floatWindows.classList.add('interaction');
    };

    voiceRecognition.onspeechend = () => {
        voiceRecognition.stop();
        floatWindows.classList.remove('interaction');
    };

    voiceRecognition.onresult = (event) => {
        console.log(event.results[0][0].transcript.split('.', [0]));
    };
});
 */


/* 
document.addEventListener('keyup', e => {
    console.log(e.target.value);
    if (e.target.matches('#searchBar')) {
        document.querySelectorAll('.products').forEach(product => {
            const searchScreen = product.textContent.toLowerCase().includes(e.target.value.toLowerCase());
            searchScreen ? product.classList.remove('filterSearch') : product.classList.add('filterSearch');
        });
    }
});

 */

/* document.addEventListener('keyup', e => {
    console.log(e.target.value);
    if (e.target.matches('#searchBar')) {
        const searchValue = e.target.value.toLowerCase();
        const products = document.querySelectorAll('.products');
        const searchScreen = document.querySelector('.searchScreen');

        products.forEach(product => {
            const containsSearch = product.textContent.toLowerCase().includes(searchValue);
            containsSearch ? product.classList.remove('filterSearch') : product.classList.add('filterSearch');
        });

        // Mostrar u ocultar .searchScreen según si hay resultados de búsqueda
        const hasResults = Array.from(products).some(product => !product.classList.contains('filterSearch'));
        searchScreen.style.display = hasResults ? 'none' : 'block';
    }
}); */




