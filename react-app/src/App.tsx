import { useState } from "react";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFormTwo from "./expense-tracker/components/ExpenseFormTwo";
import categories from "./expense-tracker/categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "desc1", amount: 10, category: "Groceries" },
    { id: 2, description: "desc2", amount: 10, category: "Groceries" },
    { id: 3, description: "desc3", amount: 10, category: "Groceries" },
    { id: 4, description: "desc4", amount: 10, category: "Groceries" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;
  return (
    <div>
      <div className="mb-5">
        <ExpenseFormTwo onSubmit={expense => setExpenses([...expenses, {...expense, id: expenses.length + 1 }])}/>
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </div>
  );
}

export default App;
