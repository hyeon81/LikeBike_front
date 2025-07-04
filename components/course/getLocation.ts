const getLocation = (input: string): string => {
  const PATH = `https://dapi.kakao.com/v2/local/search/keyword`;

  const res = await axios.get(PATH, {
    params: {
      query: input,
      size: 1,
    },
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}`,
    },
  });
};
