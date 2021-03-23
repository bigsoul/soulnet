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
            ConfigureModelBuilderForDataset(modelBuilder);
            ConfigureModelBuilderForLearning(modelBuilder);
            ConfigureModelBuilderForTesting(modelBuilder);

            modelBuilder.Entity<Dataset>()
                .HasOne(dataset => dataset.Learning)
                .WithOne(learning => learning.Dataset)
                .HasForeignKey<Learning>(learning => learning.DatasetId);

            modelBuilder.Entity<Dataset>()
                .HasOne(dataset => dataset.Testing)
                .WithOne(testing => testing.Dataset)
                .HasForeignKey<Testing>(testing => testing.DatasetId);

            modelBuilder.Entity<Learning>()
                .HasOne(learning => learning.Testing)
                .WithOne(testing => testing.Learning)
                .HasForeignKey<Testing>(testing => testing.LearningId);
        }

        public void ConfigureModelBuilderForUser(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("User");
            modelBuilder.Entity<User>()
                .Property(p => p.Username)
                .HasMaxLength(60)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(p => p.Email)
                .HasMaxLength(60)
                .IsRequired();
        }

        public void ConfigureModelBuilderForDataset(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dataset>()
                .ToTable("Dataset");
            modelBuilder.Entity<Dataset>()
                .Property(p => p.Name)
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<Dataset>()
                .Property(p => p.IsLoaded)
                .HasDefaultValue(false);
        }

        public void ConfigureModelBuilderForLearning(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Learning>()
                .ToTable("Learning");
            modelBuilder.Entity<Learning>()
                .Property(p => p.Name)
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<Learning>()
                .Property(p => p.State)
                .HasDefaultValue(0);
            modelBuilder.Entity<Learning>()
                .Property(p => p.IsArchive)
                .HasDefaultValue(false);
            modelBuilder.Entity<Learning>()
                .Property(p => p.IterationCount)
                .IsRequired();
            modelBuilder.Entity<Learning>()
                .Property(p => p.IterationCurrent)
                .HasDefaultValue(0);   
            modelBuilder.Entity<Learning>()
                .Property(p => p.InputNeuronsCount)
                .IsRequired();   
            modelBuilder.Entity<Learning>()
                .Property(p => p.DeepLayersCount)
                .HasDefaultValue(0);   
        }

        public void ConfigureModelBuilderForTesting(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Testing>()
                .ToTable("Testing");
            modelBuilder.Entity<Testing>()
                .Property(p => p.Name)
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<Testing>()
                .Property(p => p.State)
                .HasDefaultValue(0);
            modelBuilder.Entity<Testing>()
                .Property(p => p.IsArchive)
                .HasDefaultValue(false);
            modelBuilder.Entity<Testing>()
                .Property(p => p.IterationCount)
                .IsRequired();
            modelBuilder.Entity<Testing>()
                .Property(p => p.IterationCurrent)
                .HasDefaultValue(0);
            modelBuilder.Entity<Testing>()
                .Property(p => p.StopLossPercent)
                .IsRequired(); 
            modelBuilder.Entity<Testing>()
                .Property(p => p.StartDeposit)
                .IsRequired(); 
            modelBuilder.Entity<Testing>()
                .Property(p => p.EndDeposit)
                .IsRequired(); 
        }
    }
}
