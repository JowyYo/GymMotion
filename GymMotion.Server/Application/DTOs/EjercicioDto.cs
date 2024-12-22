namespace GymMotion.Service.Api.DTOs
{
    public class EjercicioDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public GrupoMuscular Group { get; set; }
    }

    public enum GrupoMuscular
    {

    }
}
