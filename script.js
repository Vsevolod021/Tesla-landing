const TITLES = ['Model 3', 'Model Y', 'Model S', 'Model X', 'Solar Panels', 'Solar Roof', 'Accessories'];

const scrollBtn = document.querySelector('.scroll-btn a');
const sectionContent = document.querySelector('.section-content');
const footer = document.querySelector('.footer')

console.log(footer);
const sectionHeight = document.documentElement.clientHeight;

const renderSectionContent = (sectionIndex) => {

    if (sectionIndex < 6) {
        sectionContent.innerHTML = `
            <div class="section-content--text">
                <div class="section-content--text__title">${TITLES[sectionIndex]}</div>
                <div class="section-content--text__subtitle">Order Online for <span>Touchless Delivery</span></div>
            </div>
            <div class="section-content--btns">
                <button>CUSTOM ORDER</button>
                <button>EXISTING INVENTORY</button>
            </div>  
        `;
    } else if (sectionIndex == 6) {
        sectionContent.innerHTML = `
            <div class="section-content--text">
                <div class="section-content--text__title">${TITLES[sectionIndex]}</div>
            </div>
            <div class="section-content--single-btn">
                <button>SHOP NOW</button>
            </div>
        `;
    }
};


const renderFooter = (sectionIndex) => {
    let visiblePart = (window.scrollY % sectionHeight) / sectionHeight;
    console.log(visiblePart);

    if (sectionIndex == 6 && visiblePart >= 0.5) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
};

const renderScrollBtn = (sectionIndex) => {
    if (sectionIndex == 6) {
        scrollBtn.style.display = 'none';
    } else {
        scrollBtn.style.display = 'inline';
    }
};

const getCurrentSectionNum = () => {
    let topOffset = window.scrollY;
    let currentSectionNum = Math.floor(topOffset / sectionHeight);
    return currentSectionNum;
};

scrollBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let nextSectionNum = getCurrentSectionNum() + 1;
    let scrollPlaceOffset = nextSectionNum * sectionHeight;
    
    window.scroll({
        top: scrollPlaceOffset,
        behavior: 'smooth'
    });

    renderScrollBtn(nextSectionNum);
    renderFooter(nextSectionNum);
    setTimeOut(renderSectionContent(nextSectionNum), 50);

});

window.addEventListener('scroll', () => { 
    let sectionVisiblePart = (window.scrollY % sectionHeight) / sectionHeight;
    let currentSectionNum = getCurrentSectionNum();


    if ((sectionVisiblePart) < 0.4) {
       renderSectionContent(currentSectionNum); 
       sectionContent.style.opacity = `${(1 - sectionVisiblePart)}`;        
    } else if ((sectionVisiblePart) >= 0.4 && (sectionVisiblePart) < 0.6) {
        sectionContent.style.opacity = '0';  
    } else if ((sectionVisiblePart) >= 0.6) {
        renderSectionContent(currentSectionNum + 1);
        sectionContent.style.opacity = `${sectionVisiblePart}`;  
    } else {
        sectionContent.style.opacity = '1';  
    }

    renderScrollBtn(currentSectionNum + 1);
    renderFooter(currentSectionNum + 1);
});

renderSectionContent(0);