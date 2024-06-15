const CountryListSheemar = () => {
  let array = new Array(25)
    .fill(1)
    .map((e, index) => (
      <div key={index} className="country-card country-card-height"></div>
    ));

  return <div className="countries-container">{array}</div>;
};

export default CountryListSheemar;
