const Title = ({ children }: { children: string }) => {
  return (
    <h1 className="text-3xl lg:text-5xl font-bold text-center mb-8 mt-16">
      {children}
    </h1>
  );
};

export default Title;
