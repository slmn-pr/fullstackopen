export default function Part({ name = "", exercises = 0 }) {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}
