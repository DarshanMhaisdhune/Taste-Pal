import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
import About from "./src/component/About.js";
import ContactUs from "./src/component/ContactUs.js";
import Error from "./src/component/Error.js";
import Body from "./src/component/Body.js";
import Header from "./src/component/Header.js";
import RestaurantMenu from "./src/component/RestaurantMenu.js";
import { Provider } from "react-redux";
import appstore from "./src/utils/appStore.js";
import Cart from "./src/component/Cart.js";



const App =()=>{
  return(
    <Provider store={appstore}>
        <>
          <Header/>
          <Outlet/>  
        </>
  </Provider>
  )
}


const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
         {
          path:"/",
          element:<Body/>
        },
        {
          path:"/About",
          element:<About/>,
        },
        {
          path:"/ContactUS",
          element:<ContactUs/>
        },
        {
          path:"/restaurants/:resId",
          element:<RestaurantMenu/>
        },
        {
          path:"/Cart",
          element:<Cart/>
        }
      

      ],
      errorElement:<Error/>
    },
    
  ])



const container = document.getElementById("app");
const root = createRoot(container)
root.render(<RouterProvider router={appRouter} />);