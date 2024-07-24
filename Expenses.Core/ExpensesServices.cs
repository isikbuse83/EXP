using Expenses.Core.DTO;
using Microsoft.AspNetCore.Http;
using System;


namespace Expenses.Core
{
    public class ExpensesServices : IExpensesServices
    {

        private DB.AppDbContext _context;
        private readonly DB.User _user;
        public ExpensesServices(DB.AppDbContext context, IHttpContextAccessor httpContextAccessor)

        {
            _context = context;
            _user = _context.Users
                .First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);
        }

        public Expense CreateExpense(Expense expense)
        {
            

            _context.Add(new DB.Expense
            {
                Amount = expense.Amount,
                Description = expense.Description,
                UserId = _user.Id,
            });
            _context.SaveChanges();

            return (Expense)expense;
        }

        public void DeleteExpense(int expenseId)
        {
            var dbExpense = _context.Expenses.First(e => e.User.Id == _user.Id && e.Id == expenseId);
            _context.Expenses.Remove(dbExpense);
            _context.SaveChanges();
        }

        public Expense EditExpense(Expense expense)
        {
            var dbExpense = _context.Expenses.First(e => e.User.Id == _user.Id && e.Id == expense.Id);
            dbExpense.Description = expense.Description;
            dbExpense.Amount = expense.Amount;
            _context.SaveChanges();

            return expense;
        }

        public Expense GetExpense(int id) =>
            _context.Expenses
            .Where(e => e.User.Id == _user.Id && e.Id == id)
            .Select(e => (Expense)e)
            .First();


        public List<Expense> GetExpenses() =>
         _context.Expenses
            .Where(e => e.User.Id == _user.Id)
            .Select(e => (Expense)e)
            .ToList();
    }

}
