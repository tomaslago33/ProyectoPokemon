document.addEventListener('DOMContentLoaded', function () {
    var carouselElement = document.getElementById('carouselExample');
    var carouselInner = carouselElement.querySelector('.carousel-inner');
    var originalCarouselItems = Array.from(carouselInner.querySelectorAll('.carousel-item'));
    var originalItemsCount = originalCarouselItems.length;

    var bsCarousel = new bootstrap.Carousel(carouselElement, {
        interval: false,
        wrap: false
    });

    var cardWidth;
    function calculateCardWidth() {
        if (originalCarouselItems.length > 0) {
            var firstCard = originalCarouselItems[0];
            cardWidth = firstCard.offsetWidth;
            var style = getComputedStyle(firstCard);
            cardWidth += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        } else {
            cardWidth = 0;
        }
    }

    calculateCardWidth();
    window.addEventListener('resize', calculateCardWidth);

    // --- Clonar y añadir elementos para el loop infinito ---
    originalCarouselItems.forEach(function (item) {
        var clonedItem = item.cloneNode(true);
        carouselInner.append(clonedItem);
    });

    Array.from(originalCarouselItems).reverse().forEach(function (item) {
        var clonedItem = item.cloneNode(true);
        carouselInner.prepend(clonedItem);
    });

    // --- Ajustar la posición inicial del scroll 
    var initialScrollPosition = (originalItemsCount - 1) * cardWidth; // INICIAR DESDE EL MEDIO
    carouselInner.scrollLeft = initialScrollPosition;

    var currentScrollIndex = originalItemsCount - 1;

    function updateActiveSlide() {
        let allCarouselItems = Array.from(carouselInner.querySelectorAll('.carousel-item'));

        allCarouselItems.forEach(item => item.classList.remove('active'));

        let middleCardIndex = currentScrollIndex + 2;
        if (allCarouselItems[middleCardIndex]) {
            allCarouselItems[middleCardIndex].classList.add('active');
        }
    }

    // --- Botones de navegación ---
    var arrowNext = carouselElement.querySelector('.carousel-control-next');
    var arrowPrev = carouselElement.querySelector('.carousel-control-prev');

    arrowNext.addEventListener('click', function () {
        currentScrollIndex++;
        carouselInner.scrollTo({
            left: currentScrollIndex * cardWidth,
            behavior: 'smooth'
        });
    });

    arrowPrev.addEventListener('click', function () {
        currentScrollIndex--;
        carouselInner.scrollTo({
            left: currentScrollIndex * cardWidth,
            behavior: 'smooth'
        });
    });


    let isScrolling;
    carouselInner.addEventListener('scroll', function () {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(function () {
            let scrollLeft = carouselInner.scrollLeft;
            if (scrollLeft >= (originalItemsCount * cardWidth) + (originalItemsCount * cardWidth)) {
                let newPos = initialScrollPosition + (scrollLeft - ((originalItemsCount * cardWidth) + (originalItemsCount * cardWidth)));
                carouselInner.scrollLeft = newPos;
                currentScrollIndex = Math.round(newPos / cardWidth);
            }

            else if (scrollLeft < initialScrollPosition) {
                let newPos = (originalItemsCount * cardWidth) + (originalItemsCount * cardWidth) + (scrollLeft - initialScrollPosition);
                carouselInner.scrollLeft = newPos;
                currentScrollIndex = Math.round(newPos / cardWidth);
            } else {
                currentScrollIndex = Math.round(scrollLeft / cardWidth);
            }

            updateActiveSlide();

        }, 100);
    });
    updateActiveSlide();
});