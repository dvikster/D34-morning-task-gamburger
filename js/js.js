//
// var componentsGamburgerAll = {
//     "1": {
//         "price": 4,
//         "cal": 25,
//         "size": "маленький"
//     },
//     "2": {
//         "price": 4,
//         "cal": 25,
//         "size": "большой"
//     },
//     "3": {
//         "price": 4,
//         "cal": 25,
//         "component":"сыр",
//         "required": 1
//     },
//     "4": {
//         "price": 4,
//         "cal": 25,
//         "component":"салат",
//         "required": 1
//     },
//     "5": {
//         "price": 4,
//         "cal": 25,
//         "component":"ветчина",
//         "required": 1
//     },
//     "6": {
//         "price": 5,
//         "cal": 0,
//         "component":"соус",
//         "required": 0
//     },
//     "7": {
//         "price": 4,
//         "cal": 10,
//         "component":"майонез",
//         "required": 0
//     }
// };

var sizeGamburger={
    "маленький": {
        "price": 17,
        "cal": 250
    },
    "большой": {
        "price": 25,
        "cal": 340
    }
};

var componentGamburger={
    "сыр": {
        "price": 4,
        "cal": 25,
        "required": 1
    },
    "салат": {
        "price": 5,
        "cal": 5,
        "required": 1
    },
    "ветчина": {
        "price": 10,
        "cal": 50,
        "required": 1
    },
    "соус": {
        "price": 5,
        "cal": 0,
        "required": 0
    },
    "майонез": {
        "price": 4,
        "cal": 10,
        "required": 0
    }
};


$(document).ready(function () {
    function renderGamburger() {
        var size=[];
        for(key in sizeGamburger) {
            size += '<input type="radio" name="size" data-price="' +sizeGamburger[key].price + '" data-cal="'+sizeGamburger[key].cal +'"  value="' + key + '">'+ key  + ' - ' +sizeGamburger[key].cal + 'кКал, ' +  +sizeGamburger[key].price+'грн </p>';
        }
        $('#sizeGamburger').html(size);

        var component=[];
        var dopComponent=[];
        for(key in componentGamburger) {
            if(componentGamburger[key].required == 1){
            component += '<p><input type="checkbox" name="component" class="required" data-price="' +componentGamburger[key].price + '" data-cal="'+componentGamburger[key].cal +'" value="' + key + '">'+ key + ' - ' +componentGamburger[key].cal + 'кКал, ' +  +componentGamburger[key].price+'грн </p>';
            }
            else if(componentGamburger[key].required == 0 ){
            dopComponent += '<p><input type="checkbox" name="dop-component" data-required="0" data-price="' +componentGamburger[key].price + '" data-cal="'+componentGamburger[key].cal +'" value="' + key + '">'+ key + ' - ' +componentGamburger[key].cal + 'кКал, ' +  +componentGamburger[key].price+'грн </p>';
        }
        }
        $('#component').html(component);
        $('#dop-component').html(dopComponent);
    }
    renderGamburger();



    var order = {"price":0,
        "cal":0,
        "items":[]
    };
    var out = '';
    var orderCounter = 0;

    $('#rezult').on('click', function(event){
        // console.log(event);
        order = {
            "price":0,
            "cal":0,
            "items":[]
        };
        out = '';
        $('#out').empty();
        $('#error-size').empty();
        $('#error-component').empty();

        if($('input[type="radio"]:checked').length > 0 && $('input.required:checked').length > 0) {

            console.log('успех')
            $('input:checked').map( function (index,item) {

            order.price = order.price + Number($(item).attr('data-price'));
            order.cal = order.cal + Number($(item).attr('data-cal'));
            order.items.push($(item).attr('value'));} );
            out +='<p><b>Состав заказа:</b></p><ul>';
                for (var i=0; i<order.items.length; i++) {
                    out+='<li>'+order.items[i]+'</li>';
                }
            out+='</ul>';
            out+='<p><b>Cумма заказа: </b>'+order.price+'</p>';
            out+='<p><b>Всего калорий: </b>'+order.cal+'</p>';
            $('#out').html(out);

            ++orderCounter;
        // console.log(orderCounter);
        localStorage.setItem(orderCounter,order.price);
        }
        else if($('input[type="radio"]:checked').length  ==  0 &&  $('input.required:checked').length  == 0){

            $('#error-size').html("выберите размер<br>");
            $('#error-component').html("выберите начинку<br>");
        }
        else if($('input[type="radio"]:checked').length == 0 ){

            $('#error-size').html("выберите размер<br>");
        }
        else if( $('input.required:checked').length == 0){

            $('#error-component').html("выберите начинку<br>");
        }
    });


    $('#history').on('click', function(){

        var  out2='';
        s = localStorage;
        // console.log('кол-во заказов' + s.length);
        var sum = 0;
        for (var i = 0; i < s.length; i++) { key = s.key(i);
        sum = sum + Number(s.getItem(key));
        }
        // console.log(sum);
        middleOrder = sum /s.length;
        if (s.length > 0){
            // console.log(middleOrder);
            out2 +='<p><b>Кол-во заказов: </b>'+s.length+'</p>';
            out2 +='<p><b>Общая сумма: </b>'+sum+'</p>';
            out2 +='<p><b>Сумма среднего чека: </b>'+middleOrder+'</p>';
        }
        else if(s.length == 0) {
            out2 +='Вы еще ничего не заказывали</p>';
        }
        $('#out2').html(out2);
    });

    $('#clearRezult').on('click', function(event){
        event.preventDefault();
        renderGamburger();
        $('#out').empty();
    });

    $('#clearHistory').on('click', function(event){
        event.preventDefault();
        $('#out2').empty();
    });
});

