// the fileds we are interested in
interface Planet {
    keplerName?: string,
    koi_disposition: string;
    koi_insol: number;
    koi_prad: number;
}

interface PlanetFromCsv {
    kepler_name: string,
    koi_disposition: string;
    koi_insol: number;
    koi_prad: number;
}

export {
    Planet,
    PlanetFromCsv
};