import { useGetAllProductsQuery } from "../features/productApi";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return <h2>Home</h2>;
};

export default Home;
