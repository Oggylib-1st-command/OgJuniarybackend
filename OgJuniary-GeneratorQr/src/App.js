import { Routes, Route } from "react-router-dom";

import Main from "./pages/main/Main";
import History from "./pages/history/History";
import Favorites from "./pages/favorites/Favorites";
import Authorization from "./pages/authorization/Auth";
import { AdminAdd } from "./pages/admin/adminAdd/AdminAdd";
import { TakenBook } from "./pages/takenBook/TakenBook";
import { AdminEdit } from "./pages/admin/adminEdit/AdminEdit";
import NotFound from "./pages/notfound/notfound";
import { Layout } from "./components/Layout/Layout";
import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import { Suspense, lazy } from "react";

const Catalog = lazy(() => import("./pages/catalog/Catalog"));
const Book = lazy(() => import("./pages/book/book"));
const CatalogAdmin = lazy(() =>
  import("./pages/admin/adminCatalog/adminCatalog")
);
const AdminBook = lazy(() => import("./pages/admin/adminBook/adminBook"));
const UsersAdmin = lazy(() => import("./pages/admin/adminUsers/adminUsers"));
const AllGenres = lazy(() => import("./pages/admin/adminAllGenres/AllGenres"));

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Main />} />
            <Route
              path="catalog"
              element={
                <Suspense fallback={<p>...Loading</p>}>
                  <Catalog />
                </Suspense>
              }
            />
            <Route
              path="catalog/:id"
              element={
                <Suspense fallback={<p>...Loading</p>}>
                  <Book />
                </Suspense>
              }
            />
            <Route path="history" element={<History />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="takenbook" element={<TakenBook />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route
            path="admin/catalog"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <CatalogAdmin />
              </Suspense>
            }
          />
          <Route
            path="admin/catalog/add"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <AdminAdd />
              </Suspense>
            }
          />
          <Route
            path="admin/catalog/:id"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <AdminBook />
              </Suspense>
            }
          />
          <Route
            path="admin/catalog/allgenres"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <AllGenres />
              </Suspense>
            }
          />
          <Route
            path="admin/catalog/:id/edit"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <AdminEdit />
              </Suspense>
            }
          />
          <Route
            path="admin/catalog/allgenres"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <AllGenres />
              </Suspense>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<p>...Loading</p>}>
                <UsersAdmin />
              </Suspense>
            }
          />
          <Route path="/login" element={<Authorization />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
