export default interface Country {
    name : string,
    topLevelDomain : string[],
    alpha3Code : string
    capital : string,
    subregion : string,
    region : string,
    population : number,
    borders : string[],
    nativeName : string,
    flags : {
        svg : string,
        png : string
    },
    currencies : [{
        code : string,
        name : string,
        symbol : string
    }],
    languages : [{
        name : string
    }]
}