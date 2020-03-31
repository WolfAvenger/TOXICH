const colors = {
    ana: '#718ab3',
    baptiste: '#C99029',
    bastion: '#7c8ab3',
    brigitte:	'#be736e',
    dva:	'#ed93c7',
    doomfist:	'#815049',
    genji: '#97ef43',
    hanzo: '#b9b48a',
    hammond: '#81897A',
    junkrat: '#ecbd53',
    lucio: '#85c952',
    mccree: '#ae595c',
    mei: '#6faced',
    mercy: '#ebe8bb',
    moira: '#803c51',
    orisa: '#468c43',
    pharah: '#3e7dca',
    reaper: '#7d3e51',
    reinhardt: '#929da3',
    roadhog: '#b68c52',
    sigma: '#42AB8D',
    soldier: '#697794',
    sombra: '#7359ba',
    symmetra: '#8ebccc',
    torbjorn: '#c0726e',
    tracer: '#d79342',
    widowmaker: '#9e6aa8',
    winston: '#a2a6bf',
    zarya: '#e77eb6',
    zenyatta: '#ede582'
}

function arrayHeroesColors(heroes){
    var returnable = [];

    for (var elem of heroes){
        returnable.push(colors[elem]);
    }

    return returnable;
}
