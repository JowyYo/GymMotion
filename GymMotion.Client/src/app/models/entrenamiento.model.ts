export interface IEntrenamiento {
    id: string,
    name: string,
    description?: string
    creationDate: Date,
    ejercicios: IEntrenamientoEjercicio[]
}

export interface IEntrenamientoEjercicio {
    ejercicioId: string,
    repeticionesObjetivo: number,
    series: ISerie[]
}

export interface ISerie {
    repeticiones: number,
    peso: number
}