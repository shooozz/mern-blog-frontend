import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useUserData = () => {
    return useSelector((state: RootState) => state.auth.data);
};

export default useUserData;
