const ErrorInputMessage = ({ message, variant = "message" }) => {
  const styles =
    {
      message: "text-red-500 text-sm mt-1 text-base",
      title: "text-red-500 text-sm mt-1 text-xl mb-5",
    }[variant] ?? "text-red-500 text-sm mt-1 text-base";

  return <p className={styles}>{message}</p>;
};

export default ErrorInputMessage;
