using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Data;
public class HouseRulesDbContext : IdentityDbContext<IdentityUser>
{

    private readonly IConfiguration _configuration;
    public DbSet<Chore> Chores { get; set; }
    public DbSet<ChoreCompletion> ChoreCompletions { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    public HouseRulesDbContext(DbContextOptions<HouseRulesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        // Seed Chore data
        modelBuilder.Entity<Chore>().HasData(
            new Chore { Id = 1, Name = "Wash Dishes", Difficulty = 2, ChoreFrequencyDays = 1 },
            new Chore { Id = 2, Name = "Mow Lawn", Difficulty = 3, ChoreFrequencyDays = 7 },
            new Chore { Id = 3, Name = "Vacuum", Difficulty = 1, ChoreFrequencyDays = 3 },
            new Chore { Id = 4, Name = "Dust", Difficulty = 1, ChoreFrequencyDays = 1 },
            new Chore { Id = 5, Name = "Wash Sheets", Difficulty = 3, ChoreFrequencyDays = 1 }
        );

        // Seed ChoreCompletion data
        modelBuilder.Entity<Chore>()
        .HasMany(c => c.ChoreCompletions)
        .WithOne(cc => cc.Chore)
        .HasForeignKey(cc => cc.ChoreId);

        modelBuilder.Entity<UserProfile>()
        .HasMany(up => up.ChoreCompletions)
        .WithOne(cc => cc.UserProfile)
        .HasForeignKey(cc => cc.UserProfileId);

        modelBuilder.Entity<Chore>()
        .HasMany(c => c.UserProfiles)
        .WithMany(u => u.Chores)
        .UsingEntity(j => j.HasData(
            new { UserProfilesId = 1, ChoresId = 2 },
            new { UserProfilesId = 1, ChoresId = 3 },
            new { UserProfilesId = 1, ChoresId = 1 }
        ));
    }

}