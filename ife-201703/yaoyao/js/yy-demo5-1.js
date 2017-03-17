function $(id) {
    return document.getElementById(id);
}
// 随机位置以及方向
(function() {
    $('box').style.left = Math.floor(Math.random() * 10 + 1) * 40 + 'px';
    $('box').style.top = Math.floor(Math.random() * 10 + 1) * 40 + 'px';
    $('box').style.transform ='rotate(' + Math.floor(Math.random() * 4) * 90 + 'deg)';
})();

// 代理所有点击事件
var animated = false;
$('btn').onclick = function() {
    var e = arguments[0] || window.event;
    var target = e.target || e.srcElement;

    var left = parseInt($('box').style.left, 10);
    var top = parseInt($('box').style.top, 10);
    var degree = getDegree('box');
    if (degree < 0) {
        degree = degree + 360;
    }

    if (animated) return; // 移动中点击不生效

    if (target.id === 'go') {
        // 前进
        switch (degree) {
            case 0:
                move(-40, top, 'top');
                break;
            case 90:
                move(40, left, 'left');
                break;
            case 180:
                move(40, top, 'top');
                break;
            case 270:
                move(-40, left, 'left');
                break;
            default:
                break;
        }
    }

    switch (target.id) {
        // 转向
        case 'turnRight':
            turn(90);
            break;

        case 'turnBack':
            turn(180);
            break;

        case 'turnLeft':
            turn(-90)
            break;

        // 移动
        case 'up':
            move(-40, top, 'top');
            break;
        case 'left':
            move(-40, left, 'left');
            break;
        case 'down':
            move(40, top, 'top');
            break;
        case 'right':
            move(40, left, 'left');
            break;

        // 移动转向
        case 'moveUp':
            if (degree === 0) { // 正面朝上，直接移动不转动
                move(-40, top, 'top')
            }
            else {
                turn(-degree);
                setTimeout(function() {move(-40, top, 'top')}, 600);
            }
            break;
        case 'moveLeft':
            if (degree === 270) {
                move(-40, left, 'left')
            }
            else {
                turn(270 - degree);
                setTimeout(function() {move(-40, left, 'left')}, 600);
            }
            break;
        case 'moveDown':
            if (degree === 180) {
                move(40, top, 'top')
            }
            else {
                turn(180 - degree);
                setTimeout(function() {move(40, top, 'top')}, 600);
            }
            break;
        case 'moveRight':
            if (degree === 90) {
                move(40, left, 'left')
            }
            else {
                turn(90 - degree);
                setTimeout(function() {move(40, left, 'left')}, 600);
            }
            break;

        default:
            break;
    }
};

// 获取角度
function getDegree(id) {
    var transform = $(id).style.transform;
    var str = /(-)*\d+(\.\d+)*/.exec(transform)[0];
    return parseInt(str, 10) % 360; // 取余
}


/**
 * 转动特效(定时器每次转动一点点直到合格)
 * @param  {number} degree [转动的度数]
 */
function turn(degree) {
    var currentDegree = getDegree('box');

    var interval = 10;
    var time = 500;
    var speed = degree / (time / interval);
    var newDeg = currentDegree + degree;

    animated = true;
    var timer = setInterval(function() {
        if ((speed < 0 && newDeg < currentDegree) || (speed > 0 && newDeg > currentDegree)) {
            currentDegree += speed;
            $('box').style.transform = 'rotate(' + currentDegree + 'deg)';
        }
        else {
            animated = false;
            clearInterval(timer);
            $('box').style.transform = 'rotate(' + newDeg + 'deg)';
        }
    }, interval);
}


/**
 * 移动特效(根据传入的参数移动方向不同)
 * @param  {number} value  移动多少像素
 * @param  {number} boxPos 当前的left或top值
 * @param  {str} xy     设置left或者top
 * @return {[type]}        [description]
 */
function move(value, boxPos, xy){
    animated = true; // 移动中点击不生效
    var time = 500;
    var interval = 10;
    var speed = value / (time / interval);
    var newPos = boxPos + value;

    function go() {
        if (newPos < 40) {
            animated = false;
            $('box').style[xy] = 40 + 'px';
        }
        else if (newPos > 400) {
            animated = false;
            $('box').style[xy] = 400 + 'px';
        }
        else if ((speed < 0 && newPos < boxPos) || (speed > 0 && newPos > boxPos)) {
            boxPos += speed;
            $('box').style[xy] = boxPos + 'px';
            setTimeout(go, interval);
        }
        else {
            animated = false;
            $('box').style[xy] = newPos + 'px';
        }
    }
    go();
}