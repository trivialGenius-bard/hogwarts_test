var flag = false;
var time = "";
var sec = 0;
var min = 2;
var p = document.createElement('h3');
var im = document.createElement('img');
im.height=500;

function timer_() {
    sec--;
    if(sec == -1){sec=59; min=min-1;}
    if(sec<=9){sec="0" + sec;}
    time=(min<=9 ? "0"+min : min) + ":" + sec;
    if(document.getElementById)
        timer.innerHTML = time + ' c';
    interval = setTimeout('timer_()', 1000);
    if (flag) {
        clearInterval(interval);
        document.getElementById('answers').disabled = true;
        timer.innerHTML='-';
    } else if(min == -1){
        timer.innerHTML='-';
        document.getElementById('test').hidden = true;
        p.innerHTML = 'Время истекло. Перезагрузите страницу, чтобы перепройти тест';
        document.querySelector('body').append(p)
        document.getElementById('answers').disabled = true;
        clearInterval(interval);
    }
}
function rgbExtract(s) {
    var match = /^#(\w\w)(\w\w)(\w\w)/.exec(s);
    if (match === null) {
        return null;
    }
    return { r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16) };
}
answers.onclick = function () {
    let form = document.querySelector('form')
    let G = 0, H = 0, R = 0, S = 0;
    switch (form.question1.value) {
        case 'Ord':
        {
            S = S + 1;

            break;}
        case 'Slf':
            H = H+1; break;
        case 'Ign': R = R + 1; break;
        case 'Cwd': G = G + 1;
            break;
    }
    switch (form.question2.value)
    {
        case 'Hf': H = H + 1; break;
        case 'Gr': G = G + 1; break;
        case 'Sl': S = S+1; break;
        case 'Rv': R = R+1; break;
    }
    switch (form.question3.value)
    {
        case 'GH':
        {
            R++;G++;
        } break;
        case 'RS':
        {
            H++; S++;
        }
    }
    switch (form.question4.value) {
        case 'RH':
        {R++; H++;} break;
        case 'RS': {R++; S++;} break;
        case 'SG': {S++; G++;} break;
        case 'GH': {G++; H++;} break;
    }
    switch (form.question5.value) {
        case 'Left': {R++; S++;} break;
        case 'Right': {G++; H++;} break;
    }
    let clr = rgbExtract(form.color.value);
    if (clr["r"] > 128 || clr["b"] > 128 || clr["g"]>128)
    {
        if (clr.b != clr.r || clr.b!=clr.g) {
            G += 0.5;
            S += 0.5;
        }
    }
    else
    {
        if (clr.b != clr.r || clr.b!=clr.g) {
            H += 0.5;
            R += 0.5;
        }
    }
    if (clr.b>clr.r)
    {
        R+=0.5; S+=0.5;
    }
    else
    {
        if (clr.b!=clr.r) {
            H+=0.5;
            G+=0.5;
        }
    }
    let mx = Math.max(G, H, R, S);
    let a = '';
    if (mx == G)
        a='Гриффиндор';
    else
    if (mx == H)
        a = 'Пуффендуй';
    else
    if (mx == R)
        a = 'Когтевран';
    else a = 'Слизерин';
    document.getElementById('test').hidden = true;
    p.innerHTML = form.Name.value+', добро пожаловать на ' + a + "!";
    //p.innerHTML += '<br> Очки:<br>G = ' + G+'<br>H = '+H+'<br>R = ' + R + '<br>S = '+S+'<br>Перезагрузите страницу, чтобы перепройти тест';
    im.src = a+".png";
    document.querySelector('body').append(p);

    document.querySelector('body').append(im);
    flag = true
};


