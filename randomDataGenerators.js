/**
 * Random Data Generators for D3.js Visualizations
 * A collection of utility functions to generate mock/sample data
 * for various D3.js chart types.
 */

// ============================================================
// BASIC GENERATORS
// ============================================================

/**
 * Generate array of random numbers
 * @param {number} n - Number of values to generate
 * @param {number} min - Minimum value (default: 0)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number[]} Array of random integers
 */
function generateRandomNumbers(n, min = 0, max = 100) {
  return Array.from({ length: n }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generate random float between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {number} Random float
 */
function randomFloat(min, max, decimals = 2) {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

// ============================================================
// CATEGORICAL DATA (Bar Charts, Pie Charts)
// ============================================================

/**
 * Generate category-value pairs for bar/pie charts
 * @param {string[]} categories - Array of category names
 * @param {number} minVal - Minimum value (default: 10)
 * @param {number} maxVal - Maximum value (default: 100)
 * @returns {Object[]} Array of {category, value} objects
 */
function generateCategoryData(categories, minVal = 10, maxVal = 100) {
  return categories.map(category => ({
    category: category,
    value: Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
  }));
}

/**
 * Generate multi-series categorical data (grouped/stacked bar charts)
 * @param {string[]} categories - Array of category names
 * @param {string[]} series - Array of series names
 * @param {number} minVal - Minimum value
 * @param {number} maxVal - Maximum value
 * @returns {Object[]} Array of objects with category and series values
 */
function generateMultiSeriesData(categories, series, minVal = 10, maxVal = 100) {
  return categories.map(category => {
    const obj = { category };
    series.forEach(s => {
      obj[s] = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    });
    return obj;
  });
}

// ============================================================
// TIME SERIES DATA (Line Charts, Area Charts)
// ============================================================

/**
 * Generate time series data with random walk pattern
 * @param {string|Date} startDate - Start date
 * @param {number} days - Number of days to generate
 * @param {number} startValue - Initial value (default: 100)
 * @param {number} volatility - Daily change magnitude (default: 10)
 * @returns {Object[]} Array of {date, value} objects
 */
function generateTimeSeries(startDate, days, startValue = 100, volatility = 10) {
  const data = [];
  let currentValue = startValue;
  let currentDate = new Date(startDate);

  for (let i = 0; i < days; i++) {
    data.push({
      date: new Date(currentDate),
      value: parseFloat(currentValue.toFixed(2))
    });
    currentValue += (Math.random() - 0.5) * volatility * 2;
    currentValue = Math.max(0, currentValue); // Prevent negative values
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
}

/**
 * Generate multiple time series (for multi-line charts)
 * @param {string|Date} startDate - Start date
 * @param {number} days - Number of days
 * @param {string[]} seriesNames - Names for each series
 * @param {number} baseValue - Starting value for all series
 * @param {number} volatility - Daily change magnitude
 * @returns {Object[]} Array with date and value for each series
 */
function generateMultiTimeSeries(startDate, days, seriesNames, baseValue = 100, volatility = 10) {
  const seriesData = seriesNames.map(name => ({
    name,
    values: generateTimeSeries(startDate, days, baseValue + (Math.random() - 0.5) * 50, volatility)
  }));
  return seriesData;
}

// ============================================================
// SCATTER / BUBBLE CHART DATA
// ============================================================

/**
 * Generate scatter plot data points
 * @param {number} n - Number of points
 * @param {number[]} xRange - [min, max] for x values
 * @param {number[]} yRange - [min, max] for y values
 * @returns {Object[]} Array of {x, y} objects
 */
function generateScatterData(n, xRange = [0, 100], yRange = [0, 100]) {
  return Array.from({ length: n }, () => ({
    x: randomFloat(xRange[0], xRange[1]),
    y: randomFloat(yRange[0], yRange[1])
  }));
}

/**
 * Generate bubble chart data (scatter with size)
 * @param {number} n - Number of bubbles
 * @param {number[]} xRange - [min, max] for x values
 * @param {number[]} yRange - [min, max] for y values
 * @param {number[]} rRange - [min, max] for radius values
 * @returns {Object[]} Array of {x, y, r, label} objects
 */
function generateBubbleData(n, xRange = [0, 100], yRange = [0, 100], rRange = [5, 30]) {
  return Array.from({ length: n }, (_, i) => ({
    x: randomFloat(xRange[0], xRange[1]),
    y: randomFloat(yRange[0], yRange[1]),
    r: randomFloat(rRange[0], rRange[1]),
    label: `Item ${i + 1}`
  }));
}

// ============================================================
// HIERARCHICAL DATA (Treemaps, Sunbursts, Trees)
// ============================================================

/**
 * Generate hierarchical/nested data structure
 * @param {number} depth - Maximum depth of hierarchy (default: 3)
 * @param {number} maxChildren - Max children per node (default: 4)
 * @param {string} rootName - Name for root node
 * @returns {Object} Hierarchical data structure
 */
function generateHierarchy(depth = 3, maxChildren = 4, rootName = 'Root') {
  let nodeCounter = 0;

  function createNode(level, parentName) {
    nodeCounter++;
    const node = {
      name: level === 0 ? rootName : `${parentName}-${nodeCounter}`,
      value: Math.floor(Math.random() * 100) + 1
    };

    if (level < depth) {
      const numChildren = Math.floor(Math.random() * maxChildren) + 1;
      node.children = Array.from({ length: numChildren }, () =>
        createNode(level + 1, node.name)
      );
      delete node.value; // Parent nodes typically don't have values
    }
    return node;
  }
  return createNode(0, '');
}

// ============================================================
// NETWORK / GRAPH DATA (Force Diagrams)
// ============================================================

/**
 * Generate network graph data with nodes and links
 * @param {number} numNodes - Number of nodes
 * @param {number} numLinks - Number of connections
 * @returns {Object} {nodes: [...], links: [...]}
 */
function generateNetworkData(numNodes = 20, numLinks = 30) {
  const nodes = Array.from({ length: numNodes }, (_, i) => ({
    id: `node-${i}`,
    name: `Node ${i}`,
    group: Math.floor(Math.random() * 5) + 1,
    value: Math.floor(Math.random() * 50) + 10
  }));

  const links = [];
  for (let i = 0; i < numLinks; i++) {
    const source = Math.floor(Math.random() * numNodes);
    let target = Math.floor(Math.random() * numNodes);
    // Avoid self-links
    while (target === source) {
      target = Math.floor(Math.random() * numNodes);
    }
    links.push({
      source: `node-${source}`,
      target: `node-${target}`,
      value: Math.floor(Math.random() * 10) + 1
    });
  }

  return { nodes, links };
}

// ============================================================
// GEOGRAPHIC DATA (Maps)
// ============================================================

/**
 * Generate random geographic points within bounds
 * @param {number} n - Number of points
 * @param {Object} bounds - {minLat, maxLat, minLng, maxLng}
 * @returns {Object[]} Array of {lat, lng, value, name} objects
 */
function generateGeoPoints(n, bounds = { minLat: 25, maxLat: 50, minLng: -125, maxLng: -65 }) {
  return Array.from({ length: n }, (_, i) => ({
    lat: randomFloat(bounds.minLat, bounds.maxLat, 4),
    lng: randomFloat(bounds.minLng, bounds.maxLng, 4),
    value: Math.floor(Math.random() * 100) + 1,
    name: `Location ${i + 1}`
  }));
}

// ============================================================
// D3-SPECIFIC RANDOM DISTRIBUTIONS
// ============================================================

/**
 * Generate normally distributed data (requires D3)
 * @param {number} n - Number of values
 * @param {number} mean - Mean of distribution (default: 50)
 * @param {number} stdDev - Standard deviation (default: 15)
 * @returns {number[]} Array of normally distributed values
 */
function generateNormalDistribution(n, mean = 50, stdDev = 15) {
  // Box-Muller transform (no D3 dependency)
  const data = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    data.push(parseFloat((z * stdDev + mean).toFixed(2)));
  }
  return data;
}

// ============================================================
// UTILITY / HELPER FUNCTIONS
// ============================================================

/**
 * Generate random color in hex format
 * @returns {string} Hex color code
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Pick random item from array
 * @param {Array} arr - Source array
 * @returns {*} Random element from array
 */
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate array of random dates between start and end
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @param {number} n - Number of dates to generate
 * @returns {Date[]} Array of random dates
 */
function generateRandomDates(startDate, endDate, n) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return Array.from({ length: n }, () =>
    new Date(start + Math.random() * (end - start))
  ).sort((a, b) => a - b);
}

// ============================================================
// EXPORTS (for ES Modules)
// ============================================================

// Uncomment for ES Module usage:
// export {
//   generateRandomNumbers,
//   randomFloat,
//   generateCategoryData,
//   generateMultiSeriesData,
//   generateTimeSeries,
//   generateMultiTimeSeries,
//   generateScatterData,
//   generateBubbleData,
//   generateHierarchy,
//   generateNetworkData,
//   generateGeoPoints,
//   generateNormalDistribution,
//   randomColor,
//   randomFromArray,
//   generateRandomDates
// };

