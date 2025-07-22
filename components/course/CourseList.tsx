import { useQuery } from "@tanstack/react-query";
import PrimaryBox from "../common/PrimaryBox";
import WhiteBox from "../common/WhiteBox";
import { getCourse } from "@/apis/course/getCourse";

const CourseList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["courseList"],
    queryFn: getCourse,
  });

  return (
    <div>
      <PrimaryBox>내가 추천한 코스의 인증 완료 내역을 확인하세요</PrimaryBox>
      <WhiteBox>
        ① [인증 검토]가 완료된 내역을 확인할 수 있습니다. <br />② 검토 결과는
        [O, X]로 나타납니다.
        <br /> ③ 인증 기준은 다음과 같습니다. <br />
        * 요구하는 내용을 모두 입력했는지 여부
        <br />* 비속어, 부적절한 내용 존재 여부
      </WhiteBox>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching courses: {error.message}</p>}
        {data && (
          <ul className="mt-4">
            {data?.map((course) => (
              <li key={course.id}>
                {course.title} <br />
                {course.content} <br />
                {course.created_at}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseList;
