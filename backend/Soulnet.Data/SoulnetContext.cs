using System.Linq;
using Soulnet.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace Soulnet.Data
{
    public class SoulnetContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public SoulnetContext(DbContextOptions<SoulnetContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureModelBuilderForUser(modelBuilder);
        }

        public void ConfigureModelBuilderForUser(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("User");
            modelBuilder.Entity<User>()
                .Property(user => user.Username)
                .HasMaxLength(60)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(user => user.Email)
                .HasMaxLength(60)
                .IsRequired();
        }
    }
}
