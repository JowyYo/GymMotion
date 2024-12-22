namespace GymMotion.Service.Domain.Entities
{
    public class Ejercicio : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public GrupoMuscular Group { get; set; }
    }

    public enum GrupoMuscular
    {
        Espalda,
        Pectoral,
        Hombro,
        Bíceps,
        Tríceps,
        Antebrazo,
        Cuadriceps,
        Femoral,
        Gluteo,
        Gemelo
    }
}
