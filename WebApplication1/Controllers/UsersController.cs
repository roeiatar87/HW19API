using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository Repo;
        public UsersController(IUsersRepository usersRepository)
        {
            Repo = usersRepository;
        }


        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Repo.GetAllUsers();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public User Get(string id)
        {
            return Repo.GetUserById(id);
        }

        // POST api/<UsersController>
        [HttpPost]
        public User Post([FromBody] User user)
        {
            return Repo.AddUser(user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public bool Put([FromBody] User userToUpdate)
        {

            return Repo.UpdateUser(userToUpdate);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
            return Repo.DeleteUser(id);
        }
    }
}
