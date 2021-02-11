using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class UserRepository : EntityBaseRepository<User>
    {        
        public UserRepository (SoulnetContext context) : base (context) { }

        public bool IsEmailUniq (string email) 
        {
            var user = this.GetSingle(u => u.Email == email);
            return user == null;
        }

        public bool IsUsernameUniq (string username) 
        {
            var user = this.GetSingle(u => u.Username == username);
            return user == null;
        }
    }
}