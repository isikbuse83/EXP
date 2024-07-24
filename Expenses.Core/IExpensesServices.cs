using Expenses.Core.DTO;
using System.Collections.Generic;

namespace Expenses.Core
{
    public interface IExpensesServices
    {
        List<Expense> GetExpenses();
        Expense GetExpense(int id);
        Expense CreateExpense(Expense expense);
        void DeleteExpense(int expenseId);
        Expense EditExpense(Expense expense);

    }
}
