import Header from "./Header";
import Part from "./Part";

export default function Course({ course }) {
  if (!course) return <div>There is no course</div>;

  return (
    <div>
      <Header> {course.name} </Header>
      {course.parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  );
}
