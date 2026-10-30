import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <>
      <p className="center white f3">{`${name}, your current entry count is...`}</p>
      <p className="center white f1">{entries}</p>
    </>
  );
};

export default Rank;
