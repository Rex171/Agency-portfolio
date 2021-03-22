let arrCar = [
    {
        name: 'Reno Logan',
        number: '235V56D',
        color: 'Black'
    },
    {
        name: 'Lada Pivo',
        number: '65H579Y',
        color: 'White'
    },
    {
        name: 'Mercedes',
        number: '072F54D',
        color: 'Yellow'
    }
];
let auto = document.getElementById('autoContainer');

function addCar(){
    let brand = document.getElementById('addBrand');
    let number = document.getElementById('addNumber');
    let color = document.getElementById('addColor');
    let indexNumber = 0;

    for(let i = 0; i < arrCar.length; i++){
        if(arrCar[i].number == number.value){
            indexNumber = i;
            console.log(i);
            break;
        }
    }

    if(arrCar[indexNumber].number == number.value){
        alert('Машина с таким номером уже есть!');
    }
    else{
        let obj = {
            name:brand.value,
            number:number.value,
            color:color.value
        };
        addElemOnPage(obj);
        addButtonsOnPage(obj.number);
        arrCar.push(obj);
    }
}
function hideButton(){
    divAuto = document.getElementById('autoContainer');
    if(divAuto.style.display == 'none')
    divAuto.style.display = 'block';
    else
    divAuto.style.display = 'none';
}
function deleteCar(event){
    const numberCar = event.target.getAttribute('data-number');
    arrCar = arrCar.filter(item => numberCar !== item.number);
    const autoContainer = document.getElementById('autoContainer');
    autoContainer.removeChild(document.getElementById(numberCar));
}
function editCar(event){
    const numberCar = event.target.getAttribute('data-number');
    let brand = document.getElementById('editBrand');
    let number = document.getElementById('editNumber');
    number.disabled = true;
    let color = document.getElementById('editColor');
    arrCarEdit = arrCar.find(item => numberCar == item.number);
    brand.value = arrCarEdit.name;
    number.value = arrCarEdit.number;
    color.value = arrCarEdit.color;
}
function editCarSave(){
    let brand = document.getElementById('editBrand');
    let number = document.getElementById('editNumber');
    let color = document.getElementById('editColor');
    const obj = {
        name:brand.value,
        number:number.value,
        color:color.value
    };
    arrCarEdit = arrCar.findIndex(item => number.value == item.number);
    arrCar.splice(arrCarEdit,1,obj);
    let divCar = document.getElementsByClassName('auto-content');
    divCar[arrCarEdit].innerHTML = obj.name +" "+ obj.number +" "+ obj.color;
}
function addElemOnPage(data){
    let divAuto = document.createElement('div');
    divAuto.className = 'auto-block';
    let divCar = document.createElement('div');
    divCar.className = 'auto-content';
    divAuto.setAttribute('id',data.number);
    divCar.innerHTML = data.name +" "+ data.number +" "+ data.color;
    auto.append(divAuto);
    divAuto.append(divCar);
}
function addButtonsOnPage(number){
    let divCar = document.getElementById(number);
    let butDelete = document.createElement('button');
    let butEdit = document.createElement('button');
    butDelete.innerHTML= 'Delete';
    butDelete.className = 'btn btn-danger butDelete';
    butDelete.setAttribute('data-number', number);
    butDelete.setAttribute('type','button');
    butDelete.addEventListener('click', (event) => deleteCar(event));
    butEdit.innerHTML = 'Edit';
    butEdit.className = 'btn btn-success butEdit'
    butEdit.setAttribute('data-number', number);
    butEdit.setAttribute('type','button');
    butEdit.setAttribute('data-bs-toggle','modal');
    butEdit.setAttribute('data-bs-target','#editModal');
    butEdit.addEventListener('click', (event) => editCar(event));
    divCar.append(butDelete, butEdit);
};

let carAttribute;
for(let i = 0; i<arrCar.length; i++){
    addElemOnPage(arrCar[i]);
    addButtonsOnPage(arrCar[i].number);
}
