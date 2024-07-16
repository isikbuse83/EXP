using Microsoft.EntityFrameworkCore;

namespace Expenses.DB
{
    public class AppDbContext : DbContext
    {
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<User> Users { get; set; }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=LAPTOP-6PECIQ5E\SQLEXPRESS;Database=ExpensesDb;Trusted_Connection=True;ConnectRetryCount=0;Integrated Security=true;TrustServerCertificate=Yes");
        }
    }
}
