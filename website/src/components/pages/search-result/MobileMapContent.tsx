import SvgIcon from "@/components/SvgIcon";
import React, {useEffect, useState} from "react";
import SimpleMap from "@/components/pages/search-result/SearchItemMap";
import MobileFilterContent from "@/components/pages/search-result/MobileFilterContent";
import SearchPageTitlehead from "@/components/pages/search-result/SearchPageTitlehead";
import MapTopSingleItem from "@/components/pages/search-result/MapTopSingleItem";
import {useQuery, useQueryClient} from "react-query";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {removeEmptyKeys} from "@/utils/utils";
import {reactQueryKeys} from "@/services/reactQueryKeys";
import {get} from "@/services/api/api";

export default function MobileMapContent() {
    const [location, setLocation]: any = useState(null);
    const [searchItems, setSearchItems]: any = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [refetch, setRefetch] = useState(false);
    const [queryStr, setQueryStr] = useState("");
    const queryClient = useQueryClient();
    const route = useRouter();
    const userLocation = useSelector((state: any) => state.auth.userLocation);

    useEffect(() => {
        const _ = JSON.parse(JSON.stringify(localStorage.getItem("userLocation")));
        setLocation(_);
        const query = route.query;
        let queryParam = removeEmptyKeys(query);

        // setQueryStr(new URLSearchParams(queryParam).toString());
        setQueryStr(new URLSearchParams(queryParam).toString());
        setRefetch(true);
    }, [route.query]);

    const { data, isLoading } = useQuery({
        queryKey: [reactQueryKeys.SEARCH_CARE_HOMES, page, queryStr],
        queryFn: () => {
            return get(`search/care-home?${queryStr}`);
        },
        // enabled: Object.keys(query).length > 0 & Object.keys(query).some((key) => query[key]) != "" & query[key] ),
        //if any query param is present and not empty
        enabled: refetch,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        onSuccess: (data) => {
            setRefetch(false);
            setSearchItems(data?.data?.data ?? []);
        },
        onError: (error) => {
            setRefetch(true);
        },
    });

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const chooseMessage = (item: any) => {
        // alert(JSON.stringify(item));
        setLat(item.lat);
        setLng(item.lon);
    };

    const setQueryParams = (params: any) => {
        //add params to route
        const query = { ...route.query };

        route.push(
            {
                pathname: route.pathname,
                query: { ...query, ...params },
            },
            undefined,
            { shallow: false }
        );
    };

    const onChangeCheckbox = ({ isChecked, key, value }: any) => {
        const params: any = { ...route.query };

        if (isChecked) {
            if (params[key]) {
                params[key] = `${params[key]},${value}`;
            } else {
                params[key] = value;
            }
        } else {
            if (params[key]) {
                params[key] = params[key]
                    .split(",")
                    .filter((item: any) => {
                        return item != value;
                    })
                    .join(",");
            }
        }

        setQueryParams(params);
    };

    const onChangeRadioButton = ({ key, value, isChecked }: any) => {
        const params: any = { ...route.query };
        if (isChecked) {
            params[key] = value;
        } else {
            delete params[key];
        }
        setQueryParams(params);
    };

    const onClickClear = ({ type }: any) => {
        const params: any = { ...route.query };
        if (type) {
            delete params[type];
            route.push(
                {
                    pathname: route.pathname,
                    query: params,
                },
                undefined,
                { scroll: false }
            );

            return;
        }

        route.push(
            {
                pathname: route.pathname,
                query: {},
            },
            undefined,
            { scroll: false }
        );
    };

    const applyQueryParamToSearch = () => {
        // queryClient.invalidateQueries([reactQueryKeys.SEARCH_CARE_HOMES, page]);
        setRefetch(true);
    };

    const handlePageChange = (page: any) => {
        const params: any = { ...route.query };
        if (page) {
            params["page"] = page;
        }

        setQueryParams(params);
    };

    const search_results = data?.data?.data;
    const meta = data?.data?.meta;


    const [fix, setFix] = useState(false);
    const setMapFixed = () => {
        if (window.scrollY >= 300) {
            setFix(true)
        } else {
            setFix(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", setMapFixed);
    }, []);

    return (
        // <div className={fix ? 'mobile-map-wrapper fix' : 'mobile-map-wrapper'}>
        <div className="mobile-map-wrapper">
            <div className="mobile-map-view">
                {/*<SimpleMap*/}
                {/*    items={searchItems}*/}
                {/*    clickedItem={{ lat: lat, lon: lng }}*/}
                {/*/>*/}
                {(JSON.parse(location)?.lat && JSON.parse(location)?.lng) ||
                searchItems?.length ? (
                    <SimpleMap
                        items={searchItems ?? []}
                        clickedItem={{ lat: lat, lon: lng }}
                        setSearchItems={setSearchItems}
                    />
                ) : null}
                <div className="mobile-map-footer">
                    <MapTopSingleItem  />
                </div>
            </div>
        </div>
  );
}
