const fakeResponses = {
  all: [],
  exclusive: [],
  "no-deposit": [],
};

export function fetchTopBK(type = "all") {
  return new Promise((resolve) => {
    setTimeout(() => {
      // First fetch the JSON data
      fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
          // Filter based on type
          const filteredData =
            type === "all" ? data : data.filter((item) => item.badge === type);
          resolve(filteredData);
        })
        .catch(() => resolve([])); // Fallback if fetch fails
    }, 500);
  });
}
