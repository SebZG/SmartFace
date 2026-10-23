import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <>
      <div className="center white f3">{`${name}, your current entry count is...`}</div>
      <div className="center white f1">{entries}</div>
    </>
  );
};

export default Rank;
