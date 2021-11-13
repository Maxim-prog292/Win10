const start = document.querySelector('.start'),                                     // pзапуск компа
      end = document.querySelectorAll('.off'),                                         // выключение компа
      systemBlock = document.querySelector('.systemBlock'),                         // системник
      monitor = document.querySelector('.monitor'),                                 // монитор
      indicatorBlock = systemBlock.querySelector('.indicator'),                     // индикатор системнике
      taskbarStart = document.querySelector('.taskbar_start'),                      // панель задач
      iconStart = taskbarStart.querySelector('.icon_start'),                        // кнопка Пуск
      loadBlock = document.querySelector('.load_block'),                            // экран загрузки
      autorizeBlock = document.querySelector('.autorize_block'),
      vhod = autorizeBlock.querySelector('.vhod'),
      desktopBlock = document.querySelector('.desktop_block'),
      startMenu = document.querySelector('.start_menu'),
      startMenuLeft = document.querySelector('.start_menu_left'),
      startMenuTitle = document.querySelectorAll('.start_menu_title');


taskbarStart.addEventListener('mouseover', (e)=>{fillStart('logo_g');});
taskbarStart.addEventListener('mouseout', ()=>{fillStart('logo_w');});

let startLoader;
let vhodTimeout;
let computer = {                                                                      // объект компьтер

    display: {                                                                        // объект монитор
        resolution: '1920x1080',
        hertz: '120',
        on: false,                                                                    // состояние монитора вкл. / выкл.
        onloader: function() {
                startLoader = setTimeout(()=>{
                loadBlock.classList.remove('display_hide');
                loadBlock.classList.add('display_active');
            }, 1000);
            setTimeout(() => {
                loadBlock.classList.remove('display_active');
                loadBlock.classList.add('display_hide');
                clearTimeout(startLoader);
            }, 4000);
        },
        offloader: function() {
            loadBlock.classList.remove('display_active');
            loadBlock.classList.add('display_hide');
            clearTimeout(startLoader);
        },
        onregister: function() {
            autorizeBlock.classList.remove('display_hide');
            autorizeBlock.classList.add('display_active');
        },
        offregister: function() {
            autorizeBlock.classList.add('display_hide');
            autorizeBlock.classList.remove('display_active');
        },
        onvhod: function(){
            autorizeBlock.classList.remove('display_active');
            autorizeBlock.classList.add('display_hide');
            
            desktopBlock.classList.remove('display_hide');
            desktopBlock.classList.add('display_active');
        },
        offvhod: function(){
            desktopBlock.classList.add('display_hide');
            desktopBlock.classList.remove('display_active');
        }
    },

    keyboard: {                                                                       // объект клавиатура
        split: 'ru',
        on: false,                                                                    // состояние клавиатуры вкл. / выкл.
    },

    mouse: {                                                                          // объект оптическая мышь
        optical: true,
        on: false,                                                                    // состояние мыши вкл. / выкл.
    },

    systemBlock: {                                                                    // объект системный блок
        
    },

    start: function() {                                                               // функция включения компьютера

        computer.display.on = true;
        computer.keyboard.on = true;
        computer.mouse.on = true;

        indicatorBlock.classList.remove('unactive');
        indicatorBlock.classList.add('active');

        
        if (computer.display.on === true) {
            console.log('Display on');
            computer.display.onloader();
            vhodTimeout = setTimeout(()=>{computer.display.onregister();}, 5000);
            vhod.addEventListener('click', computer.display.onvhod);
        }
        if (computer.keyboard.on === true) {
            console.log('Keyboard on');
        }
        if (computer.mouse.on === true) {
            console.log('Mouse on');
        }

    },
    end: function() {                                                                  // функция выключения компьютера

        computer.display.on = false;
        computer.keyboard.on = false;
        computer.mouse.on = false;

        indicatorBlock.classList.remove('active');
        indicatorBlock.classList.add('unactive');


        if (computer.display.on === false) {
            console.log('Display off');
            computer.display.offloader();
            computer.display.offregister();
            computer.display.offvhod();
            clearTimeout(vhodTimeout);
        }
        if (computer.keyboard.on === false) {
            console.log('Keyboard off');
        }
        if (computer.mouse.on === false) {
            console.log('Mouse off');
        }
    }
};
start.addEventListener('click', computer.start);
end.forEach((item) => {
    item.addEventListener('click', computer.end);
});



function fillStart(color) {
    iconStart.src = `/image/svg/${color}.png`;
}
function showReg() {
    if (loadBlock.className == 'load_block display_hide') {
        computer.display.onregister();
    } else {
        setTimeout(()=>{computer.display.onregister();}, 3000);
    }
}


document.addEventListener('click', (e)=>{openStartMenu(e, startMenu);});


function colorStart() {
    if (startMenu.className == 'start_menu display_active') {
        taskbarStart.style.background = 'rgba(65, 65, 65, 0.637)';
    } else {
        taskbarStart.style.background = '';
    }
}

function openStartMenu(event, element) {
    if (event.target == taskbarStart) {
        element.classList.remove('display_hide');
        element.classList.add('display_active');
        colorStart();
    } 
    if (event.target !== taskbarStart) {
        element.classList.add('display_hide');
        element.classList.remove('display_active');
        colorStart();
    }
}


startMenuLeft.addEventListener('mouseover', () => {
    startMenuLeft.classList.add('start_menu_left_active');
    startMenuTitle.forEach((item) => {
        if (startMenuLeft.classList.contains('start_menu_left_active')) {
            item.classList.remove('display_hide');
            item.classList.add('title_active');
        }
        
    });
});
startMenuLeft.addEventListener('mouseleave', () => {
    startMenuLeft.classList.remove('start_menu_left_active');
    startMenuTitle.forEach((item) => {
        item.classList.add('display_hide');
        item.classList.remove('title_active');
    });
});



const settings = document.querySelector('.settings'),
      settingWindow = document.querySelector('.setting');

const closeWindowBtn = document.querySelectorAll('.close');

closeWindowBtn.forEach(item => {
    item.addEventListener('click', (e) => {
        let elementHide = e.target.parentNode.parentNode.parentNode;
        if (e.target == item) {
            closeWindow(elementHide);
        }
        
    });
});

settings.addEventListener('click', () => openWindow(settingWindow));

function openWindow(param) {
    param.classList.remove('display_hide');
    param.classList.add('display_show');
}
function closeWindow(param) {
    param.classList.add('display_hide');
    param.classList.remove('display_show');
}