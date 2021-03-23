using System;

namespace Soulnet.Model.Entity
{
    public class User : IEntityBase
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}