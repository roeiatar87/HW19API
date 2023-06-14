using WebApplication1.Models;


namespace WebApplication1.Repositories
{
    public class UsersRepository : IUsersRepository
    {

        private List<User> _users;

        public UsersRepository()
        {
            _users = new List<User>();
        }
        public User[] GetAllUsers()
        {
            return _users.ToArray();
        }

        public User GetUserById(string id)
        {
            try
            {
                User? user = _users.SingleOrDefault(x => x.Id == id);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception($"Duplicated Id {id}");
            }

        }

        public User AddUser(User user)
        {
            user.Id = Guid.NewGuid().ToString();
            _users.Add(user);

            return user;
        }

        public bool DeleteUser(string id)
        {

            User user = GetUserById(id);
            if (user != null)
            {
                _users.Remove(user);
                return true;
            }

            return false;
        }

        public bool UpdateUser(User user)
        {

            int userIndex = _users.FindIndex(x => x.Id == user.Id);
            if (userIndex >= 0)
            {
                _users[userIndex] = user;
                return true;
            }

            return false;
        }
    }
}
