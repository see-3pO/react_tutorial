import { ChangeEvent, FormEvent, useState } from "react";

// define type for the row
type Row = {
  desc: string;
  amt: number;
  cat: string;
};

const ExpenseForm = () => {
  // declare state variables and functions
  const [desc, setDesc] = useState<string>("");
  const [amt, setAmt] = useState<number | "">("");
  const [cat, setCat] = useState<string>("utilities");
  const [rows, setRows] = useState<Row[]>([]);
  const [filterCat, setFilterCat] = useState<string>("all-categories");

  // function to handle submittion of input data
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (amt === "") return; // prevent submitting if amount is not set
    const newRow = { desc, amt, cat };
    setRows([...rows, newRow]);
    setDesc("");
    setAmt("");
    setCat("utilities");
  };

  // function to handle deletion of rows in the table
  const handleDelete = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterCat(event.target.value);
  };

  const filteredRows =
    filterCat === "all-categories"
      ? rows
      : rows.filter((row) => row.cat === filterCat);

  const total = filteredRows.reduce((acc, row) => acc + row.amt, 0);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Description
        </label>
        <input
          id="description"
          value={desc}
          name="description"
          type="text"
          className="form-control"
          onChange={(event) => setDesc(event.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          value={amt}
          type="number"
          className="form-control"
          onChange={(event) => setAmt(Number(event.target.value))}
          required
        />
      </div>
      <div className="mb-3">
        <div className="">
          <label htmlFor="" className="form-label">
            Category
          </label>
        </div>

        <select
          name="form-select"
          id="form-select"
          value={cat}
          className="category-select"
          onChange={(event) => setCat(event.target.value)}
        >
          <option value="utilities">Utilities</option>
          <option value="groceries">Groceries</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      <button className="btn btn-primary mb-3" type="submit">
        Submit
      </button>
      <div className="mb-3">
        {/* <label htmlFor="" className="form-label"></label> */}
        <select
          name="table-select"
          id="table-select"
          className="form-select"
          value={filterCat}
          onChange={handleFilterChange}
        >
          <option value="all-categories">All Categories</option>
          <option value="utilities">Utilities</option>
          <option value="groceries">Groceries</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      <table border={1} className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index}>
              <td>{row.desc}</td>
              <td>${row.amt.toFixed(2)}</td>
              <td>{row.cat}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td>Total</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default ExpenseForm;
