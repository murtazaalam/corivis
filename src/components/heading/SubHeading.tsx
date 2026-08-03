interface SubHeadingProps { text: string };

const SubHeading = ({ text }: SubHeadingProps) => {
  return (
    <h3 className="sub-heading">
      {text}
    </h3>
  );
};

export default SubHeading;