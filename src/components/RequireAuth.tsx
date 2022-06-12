import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import GlobalContext from "../context/GlobalContext";

/** RequireAuth wraps around a child component
 * 
 * renders that child component only if the user is logged in, otherwise re-directs user
 * 
 * <Route path="/recipes" element={<RequireAuth redirectTo="/login"><RecipeList /></RequireAuth>} />
 * 
 * In the above example, RecipeList can only be reached if the user is logged in
 *
 * used in RouteList to protect routes that require users to be logged in*/

interface RequireAuthProps {
    children: JSX.Element;
    redirectTo: string;
}

// const TodoList: React.FC<TodoListProps> = ({ items, deleteTodo }) => {
const RequireAuth: React.FC<RequireAuthProps> = ({ children, redirectTo }) => {
    // const { currentUser } = useContext(GlobalContext)
    const currentUser = true;

    return currentUser ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;