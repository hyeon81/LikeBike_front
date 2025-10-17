export interface ICourseCard {
  place: IPlace | null;
  text: string;
  image: File | null;
}

/**
 * {
    "address_name": "서울 영등포구 여의도동 85",
    "category_group_code": "",
    "category_group_name": "",
    "category_name": "여행 > 공원 > 도시근린공원",
    "distance": "",
    "id": "10952963",
    "phone": "02-3780-0561",
    "place_name": "여의도한강공원",
    "place_url": "http://place.map.kakao.com/10952963",
    "road_address_name": "",
    "x": "126.93512931714196",
    "y": "37.52638860108943"
}
 */
export interface IPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string; // longitude
  y: string; // latitude

  category_name?: string;
  category_group_code?: string;
  category_group_name?: string;
  place_url?: string;
  distance?: string;
}
