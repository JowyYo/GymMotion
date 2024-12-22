using GymMotion.Service.Domain.Entities;
using GymMotion.Service.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GymMotion.Service.Infrastructure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EjerciciosController : ControllerBase
    {
        private readonly IRepository<Ejercicio> _repository;

        public EjerciciosController(IRepository<Ejercicio> repository)
        {
            _repository = repository;
        }

        // GET: api/<EjerciciosController>
        [HttpGet]
        public async Task<IEnumerable<Ejercicio>> Get()
        {
            return await _repository.GetAllAsync();
        }

        // GET api/<EjerciciosController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EjerciciosController>
        [HttpPost]
        public async Task Post([FromBody] Ejercicio ejercicio)
        {
            await _repository.CreateAsync(ejercicio);
        }

        // PUT api/<EjerciciosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EjerciciosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
