document.addEventListener('DOMContentLoaded', () => {
    const shutterButton = document.querySelector('.shutter-button');
    const shutterContent = document.querySelector('.shutter-content');
    const shutterWrapper = document.querySelector('.shutter-wrapper');


    shutterButton.addEventListener('click', () => {
        const isOpen = shutterContent.classList.contains('open');

        shutterContent.classList.toggle('open');
        shutterButton.classList.toggle('active');

        if (isOpen) {
        } else {
            shutterContent.style.maxHeight = '0';
            void shutterContent.offsetWidth;

            shutterContent.style.maxHeight = 'none';
            const contentHeight = shutterContent.scrollHeight;
            shutterContent.style.maxHeight = '0';
            void shutterContent.offsetWidth;
            shutterContent.style.maxHeight = contentHeight + 'px';
        }

        if (isOpen) {
            shutterButton.querySelector('span').textContent = 'Mostrar busqueda avanzada';
        } else {
            shutterButton.querySelector('span').textContent = 'Ocultar busqueda avanzada';
        }
    });

    shutterContent.addEventListener('transitionend', () => {
        if (shutterContent.classList.contains('open')) {
            shutterContent.style.maxHeight = 'none';
        } else {
            shutterContent.style.maxHeight = '0';
        }
    })
})