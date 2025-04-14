import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/task1">Task 1</Link>
        </li>
        <li>
          <Link to="/task2">Task 2</Link>
        </li>
        <li>
          <Link to="/task3">Task 3</Link>
        </li>
        <li>
          <Link to="/task4">Task 4</Link>
        </li>
        <li>
          <Link to="/task5">Task 5</Link>
        </li>
      </ul>
    </div>
  );
}
