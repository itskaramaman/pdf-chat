import RingLoader from "react-spinners/RingLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "56px auto",
};

const Loading = () => {
  return (
    <RingLoader
      color="#0000FF"
      cssOverride={override}
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
