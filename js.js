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
// };
//
// var dopComponentGamburger={
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
            console.log(componentGamburger[key].required)

            if(componentGamburger[key].required == 1){
            component += '<p><input type="checkbox" name="component" data-price="' +componentGamburger[key].price + '" data-cal="'+componentGamburger[key].cal +'" value="' + key + '">'+ key + ' - ' +componentGamburger[key].cal + 'кКал, ' +  +componentGamburger[key].price+'грн </p>';
            }
            else if(componentGamburger[key].required == 0 ){
            dopComponent += '<p><input type="checkbox" name="dop-component" data-price="' +componentGamburger[key].price + '" data-cal="'+componentGamburger[key].cal +'" value="' + key + '">'+ key + ' - ' +componentGamburger[key].cal + 'кКал, ' +  +componentGamburger[key].price+'грн </p>';
        }
        }
        $('#component').html(component);
        $('#dop-component').html(dopComponent);
    }
    renderGamburger();




    // function addFood() {
    //     order.out+='';
    //     $('#out').empty();
    //     $('input:checked').map( function (index,el) {
    //         order.sum = order.sum + Number($(el).attr('data-cost'));
    //         order.ccal = order.sum + Number($(el).attr('data-ccal'));
    //         order.items.push($(el).attr('value'));} );
    //     console.log(order);
    //     order.out+='<p><b>Состав заказа:</b></p><ol>';
    //     for (var i=0; i<order.items.length; i++) {
    //         order.out+='<li>'+order.items[i]+'</li>';
    //     }
    //     order.out+='</ol>';
    //     order.out+='<p><b>Cумма заказа: </b>'+order.sum+'</p>';
    //     order.out+='<p><b>Всего калорий: </b>'+order.ccal+'</p>';
    //     $('#out').append(order.out);
    // };
    //
    // function delOrder() {
    //     order.sum = 0;
    //     order.ccal = 0;
    //     order.items = [];
    //     order.out = '';
    //     $('#out').empty();
    //     $('input').attr('checked',false);
    // }
    //
    // $('#addFood').on('click',addFood);
    // $('#delOrder').on('click',delOrder);

    // var order={
    //     "price":0,
    //     "cal":0,
    //     "items":[]
    // };

    var order = {"price":0,
        "cal":0,
        "items":[]
    };
    var out = '';

    $('#rezult').on('click', function(){
        order = {
            "price":0,
            "cal":0,
            "items":[]
        };
        out = '';

        $('#out').empty();

        $('input:checked').map( function (index,el) {
            order.price = order.price + Number($(el).attr('data-price'));
            order.cal = order.cal + Number($(el).attr('data-cal'));
            order.items.push($(el).attr('value'));} );
        console.log(order);
        out +='<p><b>Состав заказа:</b></p><ol>';
        for (var i=0; i<order.items.length; i++) {
            out+='<li>'+order.items[i]+'</li>';
        }
        out+='</ol>';
        out+='<p><b>Cумма заказа: </b>'+order.price+'</p>';
        out+='<p><b>Всего калорий: </b>'+order.cal+'</p>';
        $('#out').append(out);
    });

    $('#clear').on('click', function(e){
        // e.preventionDefault();
        renderGamburger();
        $('#out').empty();
        order = {
            "price":0,
            "cal":0,
            "items":[]
        };
        out = '';
        $('input').attr('checked',false);
    });




});


        //
        // order
        //
        //
        //
        // order = $('input:checked').val();
        //
        // for(key in order){
        //     orderItem += $(this).val() + ' ';
        // }
        //
        // $('.price').html(orderItem);
        //
        // // $("input[type='checkbox']").is(':checked');
        // // $("input[type='radio']").is(':checked');
        // // var sizeItem = $(this).val();
        // // var componentItem = $(this).val();
        // // var dopComponentItem = $(this).val();
        // console.log(orderItem);
        // console.log(order);
        // console.log($(this.checked).val());
        // console.log($("input[type='radio']").is(':checked').val);


        // console.log(size);
        // console.log(component);
        // console.log(dopComponent);

