import { useState } from "react";
import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './App.css';
import { PLANTS } from "./plants";
import LOGO from './logo.png';
import MAP_BLANK from './map-nothing.png';
import MAP_ORANGE from './map-orange.png';
import MAP_PURPLE from './map-purple.png';


function App() {
  const [currentPlants, setCurrentPlants] = useState(PLANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['Wild Greens and Roots', 'Roots', 'Mushrooms', 'Berries', 'Tree Fruits']);
  const [expanded, setExpanded] = useState(false);

  const [mapColor, setMapColor] = useState("blank");

  function filterPlants() {
    let filteredPlants = PLANTS;
    
    if (searchQuery) {
      filteredPlants = filteredPlants.filter(plant =>
        plant.plantName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilters.length > 0) {
      filteredPlants = filteredPlants.filter(plant =>
        selectedFilters.includes(plant.groupName)
      );
    }
    console.log(filteredPlants);
    setCurrentPlants(filteredPlants);
  }

  function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);
    filterPlants();
  }

  function handleFilterChange(filter) {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
    filterPlants();
  }

  function handleAccordionChange(panel) {
    return (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      if (isExpanded) {
        setMapColor(prevColor => prevColor === "orange" ? "purple" : "orange");
      } else {
        setMapColor("blank");
      }
      console.log(mapColor);
    };
  }

  return (
    <>
      <div className="column">
        <div className="right">
          <div className="header">
            <img src={LOGO} alt="Logo" className="logo" />
            <h1>Plants</h1>
            <div className="checkboxContainer">
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Wild Greens and Roots')}
                  onChange={() => handleFilterChange('Wild Greens and Roots')}
                />
                Wild Greens
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Roots')}
                  onChange={() => handleFilterChange('Roots')}
                />
                Roots
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Mushrooms')}
                  onChange={() => handleFilterChange('Mushrooms')}
                />
                Mushrooms
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Berries')}
                  onChange={() => handleFilterChange('Berries')}
                />
                Berries
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Tree Fruits')}
                  onChange={() => handleFilterChange('Tree Fruits')}
                />
                Tree Fruits
              </label>
            </div>
            <div className="searchContainer">
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          </div>
          <div>
            {currentPlants.map((item, index) => (
              <Accordion key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.plantName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>Group: {item.groupName}</div>
                    <div>Season of availability: {item.seasonOfAvailibility}</div>
                    <div>{item.poisonous ? 'Poisonous' : 'Not poisonous'}</div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        <div className="left">
          {mapColor === "blank" && <img src={MAP_BLANK} alt="empty map" className="logo" />}
          {mapColor === "orange" && <img src={MAP_ORANGE} alt="orange marked map" className="logo" />}
          {mapColor === "purple" && <img src={MAP_PURPLE} alt="purple marked map" className="logo" />}
        </div>
      </div>
    </>
  );
}

export default App;