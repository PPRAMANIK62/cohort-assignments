import { client } from "../index";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("User not found");
    } else if (result.rows.length > 0) {
      const query =
        "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *";
      const values = [userId, title, description];
      const result = await client.query(query, values);
      return result.rows[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  try {
    const query = "UPDATE todos SET done = true WHERE id = $1";
    const values = [todoId];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      throw new Error(`Todo with id ${todoId} not found`);
    }

    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  try {
    const query = "SELECT * FROM todos WHERE user_id = $1";
    const values = [userId];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
