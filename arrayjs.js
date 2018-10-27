var Arrays = {
    noms: [],
    arrs: [],
    addArray: function(nom, arr) {
        this.noms.push(nom);
        this.arrs.push(arr);
    },
    findArrByNom: function(nom) {
        var posArr = this.noms.indexOf(nom);
        return this.arrs[posArr];
    },
    nomsAllArrs: function() {
        return this.noms;
    }
}

function addArr() {
    var nomArr = document.getElementById('nomArr').value;
    var elements = document.getElementById('elementsArr').value;
    var list = document.getElementById('listArrs');

    if (elements.length === 0 || nomArr.length === 0) alert('Introduzca un nombre y uno o más elementos para añadir un array');
    else {
        nomArr = nomArr.trim();      
        var nomsArrs = Arrays.nomsAllArrs();

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
        }
    }
}

function changeListArr() {
    var nom = document.getElementById('listArrs').value;
    console.log(nom);
    document.getElementById('selectedArray').value = Arrays.findArrByNom(nom);
}