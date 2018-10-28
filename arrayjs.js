var Arrays = {
    noms: [],
    arrs: [],
    lengths: [],
    addArray: function(nom, arr) {
        this.noms.push(nom);
        this.arrs.push(arr);
        this.lengths.push(arr.length);
    },
    findArrByNom: function(nom) {
        var posArr = this.noms.indexOf(nom);
        return this.arrs[posArr];
    },
    findPosByNom: function(nom) {
        var posArr = this.noms.indexOf(nom);
        return posArr;
    },
    deleteArry: function(nom) {
        var posArr = this.noms.indexOf(nom);
        this.noms.splice(posArr, 1);
        this.arrs.splice(posArr, 1);
        this.lengths.splice(posArr, 1);
    },
    lengthOfArray: function(nom) {
        var posLength = this.noms.indexOf(nom);
        return this.lengths[posLength];
    },
    info: function() {
        console.log('nom', this.noms);
        console.log('elemets', this.arrs);
        console.log('length', this.lengths);
    }
}


//JQUERY
$(document).ready(function(){
    $('#arguments').attr('readonly', true);
});
$(function () {
    $('[data-toggle="popover"]').popover()
});


function addArr() {
    var nomArr = document.getElementById('nomArr').value;
    var elements = document.getElementById('elementsArr').value;
    var list = document.getElementById('listArrs');

    if (elements.length === 0 || nomArr.length === 0) alert('Introduzca un nombre y uno o más elementos para añadir un array');
    else {
        nomArr = nomArr.trim();      
        var nomsArrs = Arrays.noms;

        if (nomsArrs.indexOf(nomArr) >= 0) {
            alert('No se permiten dos Arrays con el mismo nombre');
            document.getElementById('nomArr').value = '';
        }
        else {
            elements = elements.split(',');
            elements = elements.map(e => e.trim());
            Arrays.addArray(nomArr, elements);
    
            var opt = document.createElement('option');
            opt.value = nomArr;
            opt.text = nomArr;
            list.add(opt);
    
            document.getElementById('nomArr').value = '';
            document.getElementById('elementsArr').value = '';

            list.selectedIndex = Arrays.arrs.length;
            document.getElementById('selectedArray').value = Arrays.arrs[Arrays.arrs.length - 1];
            document.getElementById('lengthArr').value = Arrays.lengths[Arrays.arrs.length - 1];
        }
    }
}


function changeListArr() {
    var nom = document.getElementById('listArrs').value;
    document.getElementById('selectedArray').value = Arrays.findArrByNom(nom);
    document.getElementById('lengthArr').value = Arrays.lengthOfArray(nom);
}


function changeMethod() {
    var selectedMethod = document.getElementById('metodoArray').value;

    switch (selectedMethod) {
        case 'reverse':
        case 'pop':
            $('#arguments').attr('readonly', true);
        break;
        case 'push':
        case 'indexof':
            $('#arguments').attr('readonly', false);
        break;
    }
    
}


function deleteArr() {
    var nom = document.getElementById('listArrs').value;
    var nomsArrs = Arrays.noms;

    if (nomsArrs.indexOf(nom) < 0) alert('Seleccione un array');
    else {
        var list = document.getElementById('listArrs');

        Arrays.deleteArry(nom);

        list.remove(list.selectedIndex);
        document.getElementById('selectedArray').value = '';
        document.getElementById('lengthArr').value = '';
        list.selectedIndex = 0;
    }
}


function metodoArr() {
    var metodo = document.getElementById('metodoArray').value;
    var list = document.getElementById('listArrs').value;
    var nom = document.getElementById('listArrs').value;
    var pos = Arrays.findPosByNom(nom);
    var inputArgumentos = document.getElementById('arguments');
    
    if (metodo == '' || list == '') {
        if (metodo == '') alert('Debe seleccionar un método');
        else alert('Debe seleccionar un array')
    }
    else {
        switch (metodo) {
            case 'reverse':
                var newArr = Arrays.arrs[pos];
                newArr = newArr.reverse();
                document.getElementById('selectedArray').value = newArr;
            break;
            case 'pop':
                var newArr = Arrays.arrs[pos];

                if (Arrays.lengths[pos] == 0) alert('No quedan elementos en el array');
                else {
                    alert('Eliminado el elemento ' + (newArr.length - 1) + ': ' + '"' + newArr[newArr.length - 1] + '"');
                    newArr.pop();
                    Arrays.lengths[pos] = newArr.length;
                    document.getElementById('selectedArray').value = Arrays.arrs[pos];
                    document.getElementById('lengthArr').value = Arrays.lengths[pos];
                }
            break;
            case 'push':
                var argumentos = inputArgumentos.value;
                var newArr = Arrays.arrs[pos];

                if (argumentos.length == 0) alert('No has añadido ningún argumento');
                else {
                    argumentos = argumentos.split(',');
                    argumentos = argumentos.map(e => e.trim());

                    for (let i = 0; i < argumentos.length; i++) {
                        newArr.push(argumentos[i]);
                    }
                    document.getElementById('selectedArray').value = Arrays.arrs[pos];
                    Arrays.lengths[pos] = newArr.length;
                    document.getElementById('lengthArr').value = Arrays.lengths[pos];     
                    document.getElementById('arguments').value = '';           
                }
            break;
                
        }
    }
}


function mutate() {
    metodoArr();
}