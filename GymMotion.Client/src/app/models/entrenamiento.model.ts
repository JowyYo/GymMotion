export interface IEntrenamiento {
    id: string,
    name: string,
    description?: string
    creationDate: Date,
    ejercicios: IEntrenamientoEjercicio[]
}

export interface IEntrenamientoEjercicio {
    id: string,
    ejercicioId: string,
    repeticionesObjetivo: number,
    series: ISerie[]
}

export interface ISerie {
    id: string,
    repeticiones: number,
    peso: number
}