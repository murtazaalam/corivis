interface MainHeadingProps {
  title: string;
  subTitle?: string;
}

const MainHeading = ({ title, subTitle }: MainHeadingProps) => {
  return (
    <h2 className="main-heading">
      {title}
      {subTitle && (
        <>
          <br />
          {subTitle}
        </>
      )}
    </h2>
  );
};

export default MainHeading;
