// unique values of each field
export const getUniqueValuesByKey = (key) => {
  const valueSet = new Set();

  appData.forEach((obj) => {
    if (obj[key]) {
      valueSet.add(obj[key]);
    }
  });

  return Array.from(valueSet);
};
// Insight with most publishes
export const determineTopInsightSource = (appData) => {
  const sourceCounts = {};

  appData.forEach((entry) => {
    const source = entry.source;
    if (source) {
      if (!sourceCounts[source]) {
        sourceCounts[source] = 1;
      } else {
        sourceCounts[source]++;
      }
    }
  });

  let maxCount = 0;
  let topSource = "";
  for (const source in sourceCounts) {
    if (sourceCounts[source] > maxCount) {
      maxCount = sourceCounts[source];
      topSource = source;
    }
  }

  return { topSource, count: maxCount };
};

// topic with the highest intensity
export const calculateMostHotTopic = (appData) => {
  // Group data entries by topic or sector
  const groupedData = {};
  appData.forEach((entry) => {
    const key = entry.topic || entry.sector;
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(entry);
  });

  // Calculate total intensity for each topic or sector
  const intensityMap = {};
  Object.keys(groupedData).forEach((key) => {
    const totalIntensity = groupedData[key].reduce(
      (sum, entry) => sum + (entry.intensity || 0),
      0
    );
    intensityMap[key] = totalIntensity;
  });

  // Find the topic or sector with the highest total intensity
  let mostHotTopic = null;
  let highestIntensity = -Infinity;
  Object.keys(intensityMap).forEach((key) => {
    if (intensityMap[key] > highestIntensity) {
      highestIntensity = intensityMap[key];
      mostHotTopic = key;
    }
  });

  // Find the entry with the highest intensity for the most hot topic
  let highestIntensityEntry = null;
  groupedData[mostHotTopic].forEach((entry) => {
    if (
      !highestIntensityEntry ||
      (entry.intensity || 0) > (highestIntensityEntry.intensity || 0)
    ) {
      highestIntensityEntry = entry;
    }
  });

  // Return an object containing the most hot topic information
  return {
    mostHotTopic: mostHotTopic,
    highestIntensity: highestIntensityEntry
      ? highestIntensityEntry.intensity
      : null,
    sector: highestIntensityEntry ? highestIntensityEntry.sector : null,
    pestle: highestIntensityEntry ? highestIntensityEntry.pestle : null,
  };
};

export const calculateMostRelevantTopic = (appData) => {
  let mostRelevantTopic = null;
  let highestRelevance = -Infinity;
  let impact = null;
  let region = null;

  // Iterate through the data to find the entry with the highest relevance
  appData.forEach((entry) => {
    if (entry.relevance !== undefined && entry.relevance > highestRelevance) {
      highestRelevance = entry.relevance;
      mostRelevantTopic = entry.topic || "";
      impact = entry.impact || "";
      region = entry.region || "";
    }
  });

  // Return an object containing the most relevant topic and its details
  return {
    relevance: highestRelevance,
    topic: mostRelevantTopic,
    impact: impact,
    region: region,
  };
};

export function calculateSectorTopicCounts() {
  const sectorTopicCounts = {};

  // Iterate through the data and count occurrences of each sector and topic
  appData.forEach((entry) => {
    const sector = entry.sector;
    const topic = entry.topic;

    // If the sector is not already in the counts object, initialize it
    if (!sectorTopicCounts[sector]) {
      sectorTopicCounts[sector] = {};
    }

    // If the topic is not already in the sector's counts object, initialize it
    if (!sectorTopicCounts[sector][topic]) {
      sectorTopicCounts[sector][topic] = 1;
    } else {
      sectorTopicCounts[sector][topic]++;
    }
  });

  return sectorTopicCounts;
}

// Top region affected:
export const calculateTopRegions = (data) => {
  // Step 1: Calculate occurrences of each region
  const regionOccurrences = {};
  data.forEach((item) => {
    const region = item.region || "Unknown";
    regionOccurrences[region] = (regionOccurrences[region] || 0) + 1;
  });

  // Step 2: Identify top regions and sort them by occurrence percentage
  const topRegions = Object.keys(regionOccurrences)
    .map((region) => ({
      regionName: region,
      occurrencePercentage: Math.round(
        (regionOccurrences[region] / data.length) * 100
      ),
    }))
    .sort((a, b) => b.occurrencePercentage - a.occurrencePercentage)
    .slice(0, 5);

  // Step 3: Return top 5 regions
  return topRegions;
};
