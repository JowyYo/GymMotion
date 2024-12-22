using GymMotion.Service.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GymMotion.Service.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Ejercicio> Ejercicios { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
