import Header from "./Header";
import Part from "./Part";

export default function Course({ course }) {
  if (!course) return <div>There is no course</div>;

  const { name, parts = [] } = course;
  const totalExercise = parts.reduce((sum, current) => {
    let total = sum + current.exercises;
    return total;
  }, 0);

  return (
    <div>
      <Header> {name} </Header>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}

      <strong>total of {totalExercise} exercises</strong>
    </div>
  );
}
