const viewerToDatabaseMap = {
  "Defense Procurement": "CONTACT",
  "Strategic Partnership": "DEMO_REQUEST",
  "General Information": "QUOTE"
};

const databaseToDisplayMap = {
  "CONTACT": "Defense Procurement",
  "DEMO_REQUEST": "Strategic Partnership",
  "QUOTE": "General Information"
};

module.exports = {
  viewerToDatabaseMap,
  databaseToDisplayMap
};
