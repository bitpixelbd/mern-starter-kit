import { get } from "@/services/api/api";
import { API_GET_HOME_SETTINGS } from "@/services/api/endpoints";
import { useQuery } from "react-query";

const useGetSetting = () => {
  const {
    isLoading,
    isError,
    error,
    data: settingsData,
  } = useQuery({
    queryKey: ["homesettingsData"],
    queryFn: () => get(API_GET_HOME_SETTINGS),
  });
  return { isLoading, isError, error, settingsData };
};

export default useGetSetting;
