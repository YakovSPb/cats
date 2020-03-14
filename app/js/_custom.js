document.addEventListener("DOMContentLoaded", function() {

// FIDEX MENU
if($(window).width() > 1200) {
  jQuery(function($) {
	        $(window).scroll(function(){
	            if($(this).scrollTop()>100){
	                $('.header').addClass('active');
	            }
	            else if ($(this).scrollTop()<100){
	                $('.header').removeClass('active');
	            }
	        });
	    });

} 


// GLOBAL VAR
let cats = CATALOG.sort((a, b)=> b.sortsize - a.sortsize)
const catsUl = document.getElementById('catalog')



// RENDER CATALOG
function renderCatalog(){
	let htmlCatalog = ``
	cats.forEach(({id, image, title, sizes, space, equipment, price}) =>{


	// GENERATE equipmentIcons
	let equipmentIcons = ``
	equipment.forEach(e =>{
		if(e == 0){
			equipmentIcons +=`
			<img src="img/nothing.svg" alt="alt">
			`
		}
		if(e == 1){
			equipmentIcons +=`
			<img src="img/wc.svg" alt="alt">
			`
		}
		if(e == 2){
			equipmentIcons +=`
			<img src="img/scratching.svg" alt="alt">
			`
		}
		if(e == 3){
			equipmentIcons +=`
			<img src="img/circle.svg" alt="alt">
			`
		}
		if(e == 4){
			equipmentIcons +=`
			<img src="img/home.svg" alt="alt">
			`
		}
	})


	htmlCatalog += `
	<li class="cat">
	<div class="cat__img">
	<img src="img/@2x/${image}" alt="alt">
	</div>
	<div class="cat__info">
	<div class="cat__title">${title}</div>
	<div class="cat__sizes">Размеры (ШхГхВ) - ${sizes} см</div>
	<div class="cat__space">Площадь - ${space} м2</div>
	<div class="cat__equipment">
	Оснащение номера
	<span>${equipmentIcons}</span>
	</div>
	<div class="cat__price">Цена за сутки: <span>${price}₽</span></div>
	<div class="cat__btn">Забронировать</div>				
	</div>
	</li>
	`
})
	catsUl.innerHTML = htmlCatalog
}

renderCatalog()



// SELECTIZE
$('select').selectize({
	onChange: function(value){
		catsUl.innerHTML = ``
		if(value == 1){
			cats = cats.sort((a, b)=> b.sortsize - a.sortsize)
		} else if(value == 2) {
			cats = cats.sort((a, b)=> a.sortsize - b.sortsize)
		} else if(value == 3) {
			cats = cats.sort((a, b)=> b.price - a.price)
		} else if(value == 4) {
			cats = cats.sort((a, b)=> a.price - b.price)
		}

		renderCatalog()
	}
});


// FILTER
const submitBtn = document.getElementById('submitBtn')
const arrChecked = document.querySelectorAll('.filter__space input')
const priceStart = document.getElementById('price_start')
const priceEnd = document.getElementById('price_end')
const cancelBtn = document.getElementById('cancleBtn')

submitBtn.addEventListener('click', function(){
	cats = []
	arrCheckVal = []
	arrChecked.forEach(e => {
		if(e.checked){
			arrCheckVal.push(e.value)
		}
	})

	CATALOG.map(function(el){
		arrCheckVal.forEach(e => {
			if(e == el.space){
				cats.push(el)
			}
			el.equipment.forEach(num =>{
				if(e == num){
					cats.push(el)
				}
			})
		})
	})
	cats = cats.filter(function (item, pos) {
		return cats.indexOf(item) == pos;
	});
	cats = cats.filter(function (item) {
		return ((item.price >= priceStart.value) && (item.price <= priceEnd.value))

	});
	renderCatalog()

	cancleBtn.style.display = 'flex'
})


// CANCLE BTN
cancleBtn.addEventListener('click', function(){
	cats = CATALOG.sort((a, b)=> b.sortsize - a.sortsize)
	renderCatalog()
	cancleBtn.style.display = 'none'
	let arrChecked = document.querySelectorAll('input')

	arrChecked.forEach(e =>{
		e.checked = false
	})
	priceStart.value = 100
	priceEnd.value = 600
})

});
