using Connectify.Entities;
using Microsoft.EntityFrameworkCore;

namespace Connectify.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<AppPerson> Persons { get; set; }
    }
}