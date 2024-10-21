import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className=" md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Hôm Nay Bạn Muốn Ăn Gì?
        </h1>
        <span className="text-xl">
          Bất Kỳ Món Ăn Nào Bạn Muốn - Đặt Món Ngay
        </span>
        <SearchBar
          placeHolder="Tìm kiếm theo Thành phố hoặc Thị trấn"
          onSubmit={handleSearchSubmit}
        />
      </div>
    </div>
  );
};

export default HomePage;
