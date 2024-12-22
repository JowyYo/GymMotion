export interface IEjercicio {
    id: number,
    name: string,
    description?: string,
    group: GrupoMuscular
  }
  
  export enum GrupoMuscular {
    Espalda = "Espalda",
    Pectoral = "Pectoral",
    Hombro = "Hombro",
    Bíceps = "Bíceps",
    Tríceps = "Tríceps",
    Antebrazo = "Antebrazo",
    Cuadriceps = "Cuadriceps",
    Femoral = "Femoral",
    Gluteo = "Gluteo",
    Gemelo = "Gemelo"
  }