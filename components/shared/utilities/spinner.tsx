import { CgSpinner } from "react-icons/cg";

interface PropsType extends ReactProps {
  icon?: JSX.Element;
}
export function Spinner({
  icon = <CgSpinner />,
  className = "py-32",
  ...props
}: PropsType) {
  return (
    <div className={`w-full flex-center text-white ${className}`}>
      <i className="text-4xl animate-spin">{icon}</i>
    </div>
  );
}
