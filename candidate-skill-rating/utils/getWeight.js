const getWeight = (difficulty_level) => {
  switch (difficulty_level) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    default:
      return 1;
  }
};

export default getWeight;
