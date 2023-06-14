using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IUsersRepository
    {
        User AddUser(User user);
        bool DeleteUser(string id);
        User[] GetAllUsers();
        User GetUserById(string id);
        bool UpdateUser(User user);
    }
}